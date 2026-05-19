FROM python:3-alpine
WORKDIR /app
COPY index.html style.css script.js conspects.js integrals_data.js server.py ./
EXPOSE 80
CMD ["python3", "-u", "server.py"]
