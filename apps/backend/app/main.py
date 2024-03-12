from typing import Annotated
from fastapi import FastAPI, WebSocket, File
import logging

from .openai.whisper import speech_to_text
from .openai.gpt import prompt

app = FastAPI()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


@app.post("/speech")
async def speech(file: Annotated[bytes, File()]):
    transcription = speech_to_text(file)

    return {"transcription": transcription}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        try:
            text = await websocket.receive_text()
            for token in prompt(text):
                if content := token.choices[0].delta.content:
                    await websocket.send_text(content)
        except Exception as e:
            logger.error(e)
            await websocket.send_text("Error")
            break
