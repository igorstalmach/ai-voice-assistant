from typing import Annotated
from fastapi import FastAPI, WebSocket, File
import logging
from fastapi.middleware.cors import CORSMiddleware

# from .openai.whisper import speech_to_text
# from .openai.gpt import prompt

app = FastAPI()

origins = [
  'http://localhost:8081',
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
async def speech(file: Annotated[bytes, File()]):
    # transcription = speech_to_text(file)

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
