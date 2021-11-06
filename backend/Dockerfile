FROM python:3.9.7

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code/backend

COPY Pipfile Pipfile.lock /code/backend/
RUN pip install pipenv && pipenv install --system

COPY . /code/backend/