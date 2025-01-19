
# Run with refresh on file change
```
npm run dev
```

# Run
```
npm start
```

# Database Migrations
Knex is used for database migrations.
https://knexjs.org/guide/migrations.html

### Run migrations
```
npx knex migrate:latest
```
### Run seed files
Running the seed files will create some sample data in the database for development and testing.
```
npx knex seed:run
```
