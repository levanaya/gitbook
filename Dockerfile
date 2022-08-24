FROM node:10 as builder
MAINTAINER "mohaijiang<mohaijiang110@163.com>"
RUN npm install gitbook-cli -g

ADD . /doc

WORKDIR /doc
RUN gitbook install
RUN gitbook build


FROM nginx:1.21
COPY --from=builder /doc/_book /usr/share/nginx/html
EXPOSE 80