FROM node:12.20.0

ENV APP_HOME=/var/app/current
ENV PORT=3000
WORKDIR $APP_HOME

COPY ./package.json  $APP_HOME/package.json
COPY ./yarn.lock  $APP_HOME/yarn.lock
COPY ./src $APP_HOME/src/
RUN chown -R www-data:www-data $APP_HOME
USER www-data
RUN yarn install --production

EXPOSE $PORT

CMD echo "Initiating YT-Scrapper. Git-revision: $SOURCE_COMMIT" && yarn start