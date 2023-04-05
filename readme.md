`npm start` starts the server

It runs a local sqlite db in `./temp` by default.

If you want to connect it to a postgres db, create a `.env` file like this:

```
DB_URL=000.0.0.0
DB_PORT=port
DB_USERNAME=username
DB_PASSWORD=password
DB_DBNAME=dbname
```

and set `local` to `false` in `./utils/database.js`
