docker-compose up  [ run this separete tab, for below commands use diff tab]

podman images

podman exec -it 80da3242e2x mysql -uroot -pexample

podman restart web

podman restart db

docker-compose up --scale web=3

podman ps -a

docker-compose stop

docker-compose down    [ to remove everything ]


docker-compose down  --volumes
