# Smart-url-shortener
A scalable Node.js API for shortening URLs with Google Sign-In, Redis caching, and advanced analytics (click trends, OS, and devices). Supports topic-based grouping, rate limiting, and is fully Dockerized for cloud deployment with Swagger documentation and tests.

## to create docker image use the following command
``` sudo docker build -t urlshortner . ```

## tag the docker image
sudo docker tag urlshortner monika24docker/my-url-shortener
``` push the images to aws or docker hub ```

## to run container use the following command

### TO RUN PROJECT ON YOUR MACHINE USING DOCKER FOLLOW BELOW INSTRUCTIONS
``` sudo docker pull monika24docker/my-url-shortener ----------pull image ```
``` sudo docker tag monika24docker/my-url-shortener urlshortner  -------- to rename your image as urlshortner```
``` sudo docker run -d --name urlshortner --net=host -p 5000:5000 urlshortner    ---- to run the docker images and convert it into container ```
