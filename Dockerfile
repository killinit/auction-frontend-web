FROM luissalgadofreire/nginx-node:4.4.7-onbuild
MAINTAINER Luis Freire

CMD ["nginx", "-g", "daemon off;"]
