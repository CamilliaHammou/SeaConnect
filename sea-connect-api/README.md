WELCOME TO SEA BACKEND

First we need to install docker in our machine

Open terminal and go to the project directory.

Build the image using “docker compose build”

Once the build is generated run the docker using “docker-compose up”

As we are using replica set, so we need to initiate the replica set, for this, open a new tab in terminal and connect mongo shell using “mongosh”

Once mongosh shell is connected, initiate the replica set using “rs.initiate()”, we can check the replica set status using “rs.status()” Connect MongoDB compass

To connect mongoDb use the following connection string: “mongodb://localhost:27017/?replicaSet=rs0&directConnection=true”


if issues
docker-compose down -v
docker image prune -a
docker compose build
docker-compose up 


