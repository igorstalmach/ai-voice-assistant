import json

from lpmn_client_biz import IOType, Task, download, upload

from .client import connection


async def transcribe_audio(audio_path: str) -> str:
    task_setup = [{"whisper": {"lang": "pl"}}]
    task = Task(task_setup, connection)

    file_id = upload(connection, audio_path)
    output_file_id = task.run(file_id, IOType.FILE)

    result = download(connection, output_file_id, IOType.TEXT)
    parsed_result = json.loads(result)["0"]["text"]

    return parsed_result
