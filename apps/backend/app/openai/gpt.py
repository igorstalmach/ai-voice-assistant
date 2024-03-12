from . import client


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
