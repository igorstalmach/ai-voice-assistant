FROM python:3.12-slim-bullseye as python-base

RUN apt-get update && apt-get install -y ffmpeg

RUN mkdir api
WORKDIR  /api

COPY /pyproject.toml .
COPY /poetry.lock .

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
