from lpmn_client_biz import Task

from .client import connection


async def llm_query(query: str, model: str) -> list:
    """
    Query the LLM model with a given string.

    :param query: A question for the LLM.
    :param model: A name of the desired LLM model.
    :return: A stream of LLM completions.
    """

    task = Task(lpmn=[model], connection=connection)

    return task.run_llm_completions(
        **{
            "stream": True,
            "messages": [
                {"role": "user", "content": query},
            ],
        }
    )
