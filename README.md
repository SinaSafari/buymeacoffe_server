# Server of Persian version of buy me a coffee

## todos

- [x] database connection
- [x] environment variable
- [x] sqlite for development and postgres for production
- [ ] migration system
- [ ] models and entity declaration
- [x] interface for repository pattern
- [ ] interface for controllers
- [ ] thinking of a way to make routes class based or following a specific rule
- [ ] changing naming convention for files in MVC pattern

---

## Description:

this app uses sqlite in development and postgres in production phase. we use [typeorm](https://typeorm.io) as our orm and typescript for development. all the configs are in the root of repo.

also we use swagger for documenting the api. it's available in `localhost:8000/docs` after running the app.

models after declaration should register in `/src/config/database.ts` in entities array. that is needed for auto migrating to database by typeorm.

scripts are listed in `package.json` but the most useful one is:

```sh
npm run dev
# or
yarn dev
```

which is running the app in watch mode.

**_TO BE CONTINUED..._**
