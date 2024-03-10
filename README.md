# PL TTS GPT wrapper

## Description

## Installation

The app consists of two parts: the backend and the frontend.

WIP

### Backend (FastAPI)

You must have [docker](https://docs.docker.com/get-docker/) installed to run the backend.

`docker-compose build` to build the backend image.
then
`docker-compose up` to run the backend.

The project is set to run on port `8000`.

## Frontend (Expo)

We use [pnpm](https://pnpm.io/) for simplicity and speed in working with monorepos. Refer to [pnpm docs](https://pnpm.io/installation) for installation instructions.

since the app is mobile you have to set your local ip address in `EXPO_PUBLIC_API_URL` in `.env.local` file for development.

available pl voices in [expo-speech](https://docs.expo.dev/versions/latest/sdk/localization/) package

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

### Docs (?)

We may want to deploy the docs to github pages or smth.

## WIP
