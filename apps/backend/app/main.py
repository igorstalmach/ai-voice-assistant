from typing import  Annotated
from fastapi import FastAPI, WebSocket, File
app = FastAPI()

@app.post("/speech")
async def speech(file: Annotated[bytes, File()]):
  return {"file_size": len(file)}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
  await websocket.accept()
  while True:
    data = await websocket.receive_text()
    await websocket.send_text(f"Message text was: {data}")
