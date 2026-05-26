FROM python:3-alpine
WORKDIR /app
COPY ./ ./
EXPOSE 80

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:80/').close()"

CMD ["python3", "-u", "server.py"]
