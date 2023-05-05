`npm start` starts the server

It runs a local sqlite db in `./temp` by default.

If you want to connect it to a postgres db, set `DB_REMOTE=TRUE` in your `.env` file and add the DB credentials like this:

```
#DB
DB_REMOTE=TRUE
DB_USERNAME=
DB_PASSWORD=
DB_URL=
DB_DBNAME=
DB_PORT=
```

For the basic authentication/authorization to work, add this to your `.env` as well (this is the user you will log in with):

```
#dummy user
USER_USERNAME=
USER_PASSWORD=

JWT_SECRET= # genarate using: "openssl rand -hex 32"
```
