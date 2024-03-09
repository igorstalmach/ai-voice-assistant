from openai import OpenAI
import os


client = OpenAI(api_key=os.environ.get("POETRY_OPENAI_API_KEY"))


def prompt(prompt: str):
    stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            # {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        stream=True,
    )

    return stream
