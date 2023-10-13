FROM redis:latest
EXPOSE 6379
CMD ["redis-server"]
FROM python:3.9.4
ENV http_proxy=
ENV https_proxy=
RUN apt-get update && apt-get install -y vim && rm -rf /var/lib/apt/lists/*
COPY . /app
WORKDIR /app
COPY . .
RUN pip  install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5050
ENTRYPOINT ["python"]
CMD ["app.py"]
