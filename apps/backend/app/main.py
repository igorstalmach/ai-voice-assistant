from typing import Annotated
from fastapi import FastAPI, WebSocket, UploadFile, File
import logging
from fastapi.middleware.cors import CORSMiddleware

from pydub import AudioSegment
from pydub.silence import split_on_silence
from io import BytesIO


# from .openai.whisper import speech_to_text
# from .openai.gpt import prompt

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
    # Read the uploaded file into a BytesIO buffer
    file_bytes = await file.read()
    file_buffer = BytesIO(file_bytes)
    file_buffer.seek(0)

    # Load the audio file into pydub
    try:
        audio = AudioSegment.from_file(file_buffer)
    except Exception as e:
        logger.error(e)
        return

    # Remove silence from the audio data
    trimmed_audio = remove_silence(audio)

    # Create a BytesIO buffer for the modified audio
    trimmed_audio_buffer = BytesIO()
    trimmed_audio.export(trimmed_audio_buffer, format="wav")
    trimmed_audio_buffer.seek(0)

    transcription = "Hello, how can I help you today?"

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
