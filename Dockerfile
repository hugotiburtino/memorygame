FROM nginx

RUN rm /usr/share/nginx/html/index.html

COPY index.html /usr/share/nginx/html
COPY css/ /usr/share/nginx/html/css
COPY img/ /usr/share/nginx/html/img
COPY js/ /usr/share/nginx/html/js

EXPOSE 80
