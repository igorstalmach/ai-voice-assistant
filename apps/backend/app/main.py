import logging
import tempfile
from io import BytesIO

from aiofiles.os import remove
from fastapi import FastAPI, File, UploadFile, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment

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
    file_bytes = await file.read()
    file_buffer = BytesIO(file_bytes)
    file_buffer.seek(0)

    try:
        audio = AudioSegment.from_file(file_buffer)
    except Exception as e:
        logger.error(e)
        return

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
        return

    try:
        await remove(temp_filename)
    except Exception as e:
        logger.error(e)
        return

    return {"transcription": transcription}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    await websocket.send_text("It works")

    # while True:
    #     try:
    #         text = await websocket.receive_text()
    #         for token in prompt(text):
    #             if content := token.choices[0].delta.content:
    #                 await websocket.send_text(content)
    #     except Exception as e:
    #         logger.error(e)
    #         await websocket.send_text("Unable to process request. Please try again later.")
    #         break
