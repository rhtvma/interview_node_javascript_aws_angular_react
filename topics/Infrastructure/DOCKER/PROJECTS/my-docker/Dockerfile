# use an official Python runtime as a base image.
FROM python:3.9-slim

# Copy the python script into the container
COPY app.py /app/app.py

# Set the working directory
WORKDIR /app

# define the command to run the Python Script
CMD ["python", "app.py"]