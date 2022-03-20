FROM node:12.22.11-bullseye-slim

COPY ./docker/entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# Copy or mount node app here
WORKDIR /data/

EXPOSE 8080

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD ["npm", "run", "serve"]