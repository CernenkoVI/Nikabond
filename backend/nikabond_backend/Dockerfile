FROM python:3.12-slim

WORKDIR /usr/src/nikabond_backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install build dependencies for psycopg2-binary
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    build-essential \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install Python dependencies
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

#Not installed through requirements.txt for some reason
RUN pip install python-dotenv
RUN pip install dj-rest-auth
RUN pip install django-allauth
RUN pip install django-cors-headers
RUN pip install djangorestframework
RUN pip install djangorestframework-simplejwt


COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/nikabond_backend/entrypoint.sh
RUN chmod +x /usr/src/nikabond_backend/entrypoint.sh

COPY . .

ENTRYPOINT [ "/usr/src/nikabond_backend/entrypoint.sh" ]