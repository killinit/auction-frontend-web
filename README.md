# Angular 2 Demo App
An angular 2 demo app that integrates with the django backend in repository 
[auction-backend](https://github.com/luissalgadofreire/auction-backend.git).
Integration is done using two protocols: HTTP for common request-responses and WebSockets for push notifications.

* HTTP integration was accomplished through a RESTful web api developed with 
  [django-rest-framework](http://www.django-rest-framework.org/). 
* WebSockets integration was accomplished using the recent 
  [django-channels](https://github.com/andrewgodwin/channels.git)
  package.

Installing [auction-backend](https://github.com/luissalgadofreire/auction-backend.git) is therefore required for
this angular 2 demo app to work properly.

This angular 2 demo app is closely based on instructions from the book 
[*Angular 2 Development with Typescript*](https://www.manning.com/books/angular-2-development-with-typescript)
but was adjusted to integrate with the above mentioned Django backend instead (that book uses a node.js backend).


## Running locally
Setup instructions to run this app straight from your computer below (note: you still require 
[auction-backend](https://github.com/luissalgadofreire/auction-backend.git) to make it work):

1. Install [node.js](https://nodejs.org/en/), which comes with npm, node's package installer.
2. Clone this repository: ``git clone https://github.com/luissalgadofreire/auction-frontend-web.git``
3. Navigate to project root: ``cd auction-frontend-web/angular``
4. Install angular packages: ``npm install``
5. Start dev server: ``npm start``
6. Your angular app should now open in your default browser.


## Running in Docker
Alternatively, the whole environment can be installed in a docker-machine following the below instructions.
This is appropriate for testing in an environment similar to production or as baseline for production deployment 
using docker containers: it includes an nginx web server serving the angular demo app so no longer makes use of
``npm start``.

**Note 1**: the below instructions are for Windows. You might need to adjust them for Linux or Mac.  
**Note 2**: if you want to test this docker environment in [Amazon Web Services](https://aws.amazon.com/free/?sc_channel=PS&sc_campaign=acquisition_PT&sc_publisher=google&sc_medium=english_cloud_computing_hv_b&sc_content=aws_core_e&sc_detail=aws&sc_category=cloud_computing_hv&sc_segment=118649773164&sc_matchtype=e&sc_country=PT&s_kwcid=AL!4422!3!118649773164!e!!g!!aws&ef_id=VyHV1QAABcBDs8G9:20160823141601:s) 
  or [DigitalOcean](https://www.digitalocean.com/?refcode=bc4d24968943&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=CopyPaste) 
  cloud-computing providers, create an account, and use steps 4 or 5 to create the app remotely.

1. Download and install [docker-toolbox](https://www.docker.com/products/docker-toolbox)
2. Open the docker quickstart terminal (that somewhat emulates a linux command terminal)
3. Start new docker-machine (locally): ``docker-machine create auction-frontend-web-dev -d virtualbox``
4. (optional) Start new docker-machine (aws): ``docker-machine create -d amazonec2 --amazonec2-access-key XZXZXZXZXZXZXZXXZ --amazonec2-secret-key XZXZXZXZXZXZXZXXZ --amazonec2-region eu-west-1 --amazonec2-vpc-id vpc-f0836595 auction-frontend-web-dev``
5. (optional) Start new docker-machine (digitalocean): ``docker-machine create -d digitalocean --digitalocean-access-token=XZXZXZXZXZXZXZXXZ auction-frontend-web-dev``
6. Activate docker-machine: ``eval $(docker-machine env auction-frontend-web-dev)``
7. Build images: ``docker-compose build``
8. Start services (locally): ``docker-compose up -d``
9. Start services (remotely): ``docker-compose -f production.yml up -d``
10. Get docker-machine ip: ``docker-machine ip auction-frontend-web-dev``
11. Open app in browser: open your browser and navigate to the IP retrieved with the previous command, adding 
    port 8080 to it (e.g. 192.168.99.100:8080)


10. Open web container's terminal: ``docker exec -i -t auctionfrontendweb_web_1 /bin/bash``