from lpmn_client_biz import Task

from .client import connection


async def llm_query(query: str, model: str) -> list:
    task = Task(lpmn=[model], connection=connection)

    return task.run_llm_completions(
        **{
            "stream": True,
            "messages": [
                {"role": "user", "content": query},
            ],
        }
    )
