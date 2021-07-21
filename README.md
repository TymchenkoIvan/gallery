# to run on local machine
mvn clean package -Pprod
docker run -d --name docker_db 
    -e MYSQL_ROOT_PASSWORD=ThePassword 
    -e MYSQL_DATABASE=gallery 
    -e MYSQL_USER=spring 
    -e MYSQL_PASSWORD=ThePassword 
    -d mysql:8.0
docker build -t gallery .
docker run --name spring -d -p 8080:8080 --link docker_db:docker_db gallery



# usefull
docker container logs spring
docker ps
docker ps -a
docker rm spring
docker build -t client .
docker system prune --all
docker exec -it <container_id> powershell
docker exec -it <container_id> sh

mvn clean package -P production
docker-compose up --build -d

