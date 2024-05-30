import json
import logging
import tempfile
from io import BytesIO

from aiofiles.os import remove
from fastapi import FastAPI, File, HTTPException, UploadFile, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment

from .clarin.llm_query import llm_query
from .clarin.transcription import transcribe_audio
from .sound_processing.remove_silence import remove_silence

app = FastAPI()

origins = [
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    """
    Endpoint for transcribing audio files.

    :param file: Received audio file.
    :return: Transcription of the audio file.
    """

    file_bytes = await file.read()
    file_buffer = BytesIO(file_bytes)
    file_buffer.seek(0)

    try:
        audio = AudioSegment.from_file(file_buffer)
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=500, detail="Internal server error. Please try again later."
        )

    trimmed_audio = remove_silence(audio)

    trimmed_audio_buffer = BytesIO()
    trimmed_audio.export(trimmed_audio_buffer, format="wav")
    trimmed_audio_buffer.seek(0)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        temp_filename = temp_file.name
        trimmed_audio.export(temp_file, format="wav")

    try:
        transcription = await transcribe_audio(temp_filename)
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=500, detail="Internal server error. Please try again later."
        )

    try:
        await remove(temp_filename)
    except Exception as e:
        logger.error(e)
        return

    return {"transcription": transcription}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Websocket endpoint for querying the LLM model.

    :param websocket:
    :return:
    """

    await websocket.accept()

    try:
        while True:
            try:
                request = await websocket.receive_text()
                request = json.loads(request)

                transcription = request.get("transcription")
                model = request.get("model")

                if not transcription or not model:
                    raise HTTPException(
                        status_code=400, detail="Invalid request format"
                    )

                response = await llm_query(transcription, model)

                for token in response:
                    token = token[5:]
                    parsed_token = json.loads(token)

                    if (
                        content := parsed_token.get("choices")[0]
                        .get("delta")
                        .get("content")
                    ):
                        await websocket.send_text(content)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=500,
                    detail="Internal server error. Please try again later.",
                )
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=500, detail="Internal server error. Please try again later."
        )
    finally:
        await websocket.close()
