Using JVM Based Apache Kafka Docker Image
Get the Docker image:

$ docker pull apache/kafka:4.3.0
Start the Kafka Docker container:

$ docker run -p 9092:9092 apache/kafka:4.3.0


$ docker ps

$ docker exec -it <kafka-container-name> bash

$ docker exec -it kafka /opt/kafka/bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092