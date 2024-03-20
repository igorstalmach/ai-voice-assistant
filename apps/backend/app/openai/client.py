from openai import OpenAI
import os


if not os.environ.get("POETRY_OPENAI_API_KEY"):
    raise EnvironmentError("POETRY_OPENAI_API_KEY not set")

client = OpenAI(api_key=os.environ.get("POETRY_OPENAI_API_KEY"))
