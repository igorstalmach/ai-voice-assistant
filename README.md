# PL TTS GPT wrapper

## Description

## Installation

The project is composed of two primary components: a cross-platform frontend service and a backend service.

In order to run both services execute the following commands in the project directory:

```bash
docker-compose up --build
```

Please keep in mind that a running instance of [Docker Engine 20.10+](https://docs.docker.com/) is required.

After the services are up and running, you can access the frontend service by navigating to `localhost:8081` in your web browser of choice. Additionally, it can be accessed from a mobile device by navigating to `{ip}:8081`, where `ip` stands for the local IP address of the machine running the services.

### Backend 

> [!NOTE]
> In order to start the backend service, you need to set the `POETRY_OPENAI_API_KEY` environment variable with your OpenAI key. Please refer to provided `.env.example` file for more details. A valid environment file should be named `.env` and placed in the root directory of the project.

- Built with [FastAPI](https://fastapi.tiangolo.com/) and Python 3.12.
- The service is available on port `8000`.

### Frontend 
> [!NOTE]
> In order to start the frontend service, you need to set the `EXPO_PUBLIC_API_URL` environment variable with the address of your running backend service instance. Please refer to provided `.env.example` file for more details. A valid environment file should be named `.env` and placed in the root directory of the project.


- Built with [Expo](https://docs.expo.dev/) and TypeScript.
- The service is available on port `8081`.

Available polish voices in the [expo-speech](https://docs.expo.dev/versions/latest/sdk/localization/) package:

- pl-pl-x-oda-local,
- pl-pl-x-bmg-local,
- pl-pl-x-oda-network,
- pl-pl-x-afb-network,
- pl-pl-x-zfg-network,
- pl-pl-x-jmk-network,
- pl-pl-x-bmg-network,
- pl-pl-x-zfg-local,
- pl-pl-x-jmk-local,
- pl-pl-x-afb-local,
- pl-PL-language'

