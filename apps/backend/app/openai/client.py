from openai import OpenAI
import os


client = OpenAI(api_key=os.environ.get("POETRY_OPENAI_API_KEY"))
