# latest official node image
FROM node:carbon

MAINTAINER Nicolas Ledesma <nledesma@gmail.com>
RUN mkdir -p /usr/src

WORKDIR /usr/src

EXPOSE 3005
EXPOSE 9229 

CMD [ "npm","run", "start-dock-dev" ]