# cloud-developer
Udagram Image Filtering Microservice

It is a simple cloud application with multiple microservices:
1. feed (Node-Express)
2. user (Node-Express)
3. frontend (Ionic client web app)

The feed and user microservices allows user to register and log in, post feed and view all the feeds. Frontend microservice is the web client.
To run each backend microservice locally: npm i -> npm run dev

All the required docker files and deployment files are attached in the deployment folder.
To create docker images, Dockerfile has been used.
You can use docker build -t <docker-hub username>/imageName to cretae respective images. (Make sure you are in the correct directory)
To see the images created:
docker images

To push images to docker registry:
docker push <dockerhub username>/<image name>

Instead of creating docker images one by one, you can use docker-compose-build.yaml file too.
docker-compose -f docker-compose-build.yaml build --parallel

When different backend services are running on the same port, then a reverse proxy server directs client requests to the appropriate backend server and retrieves resources on behalf of the client. We have created reverseproxy.
The reverse proxy would direct the incoming request to the appropriate service, even if multiple services are running on the same port. In our case, the "feed" and "user" services are running on the same port 8080. The Dockerfile and Configuration file for Nginx is attached.

You will have four images in total. feed, user, frontend and reverseproxy.

To start the system, run a container for each of our defined services, in the attached mode:
docker-compose up

The deployment files for each microservice has been created. You can use:
kubectl apply -f <deployment name>

To check the pods: kubectl get deployments
To check the services: kubectl get services
To check config: kubectl get configmaps (Used to store env variables)
To check Secrets: kubectl get secrets (Similar to configMap, values stored as base64 for more security)

After the pods are up, do not forget to port forward the local port to container port
kubectl port-forward service/<service-name> 8080:8080 (We have used service instead of single pod, advantage of using services)
