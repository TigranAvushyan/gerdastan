FROM node:18.12.1 AS builder

WORKDIR /frontend

COPY ./ ./

RUN npm install

RUN npm run build

FROM nginx:1.25.2

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /frontend/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
