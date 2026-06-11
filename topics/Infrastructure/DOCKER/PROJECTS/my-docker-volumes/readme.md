create an index.html file in data - to demonstrate docker volumes



podman run -d -p 8080:80 -v %cd$\data:/usr/share/nginx/html nginx [ to create and start container in detached mode - in the background , -v for mounting a volume ]

docker ps

docker exec -it 80d23dsdnj2 ls /usr/share/nginx/html
[it should show index.html]



[ we copied data to docker container

we can do opposite too - bind mount]


docker volume ls

docker volume rm my-volume

docker volume ls