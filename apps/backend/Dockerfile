#
FROM python:3.12-slim-bullseye as python-base
RUN mkdir code
WORKDIR  /code
COPY /pyproject.toml /code
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
