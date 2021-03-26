FROM python:3
RUN apt-get update && apt-get install -y binutils libproj-dev gdal-bin
ENV PYTHONUNBUFFERED=1
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt