from typing import Annotated
from fastapi import File
from . import client


def speech_to_text(file: Annotated[bytes, File()]):
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=("speech.m4a", file, "audio/m4a"),
        language="pl",  # TODO: recognize lang and send from fe
        # prompt="Add custom prompt here if needed",
        timeout=10,
    )

    return transcription.text


# currently we use expo-speech for this, but dr Walkowiak may want this instead
def text_to_speech(text: str):
    return client.audio.speech.create(model="tts-1", voice="alloy", input=text)
