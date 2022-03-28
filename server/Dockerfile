FROM node:12.22.10-bullseye-slim

COPY ./docker/entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

RUN npm install -g nodemon

# Copy or mount node app here
WORKDIR /data/

EXPOSE 3000

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD ["npm", "start"]