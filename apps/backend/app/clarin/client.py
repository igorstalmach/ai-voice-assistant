import os

from lpmn_client_biz import Connection

api_token = os.environ.get("CLARIN_API_KEY")

if not api_token:
    raise EnvironmentError("CLARIN_API_KEY is missing")

connection = Connection(api_token=api_token)
