FROM node AS build
WORKDIR web

COPY . .

RUN npm install
RUN npm run build

FROM nginx
COPY --from=build web/dist/front/browser /usr/share/nginx/html
COPY --from=build web/nginx.conf /etc/nginx/conf.d/default.conf
