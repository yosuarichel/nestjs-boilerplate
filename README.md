## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
$ yarn start:dev

# production
$ npm run start:prod
$ yarn start:prod

# build
$ npm run build
$ yarn build
```

## Test

```bash
# unit tests
$ npm run test
$ yarn test

# e2e tests
$ npm run test:e2e
$ yarn test:e2e

# test coverage
$ npm run test:cov
$ yarn test:cov
```

## Sequelize

```bash
# create db
$ NODE_ENV=development sequelize db:create

# drop db
$ NODE_ENV=development sequelize db:drop

# migrate db
$ NODE_ENV=development sequelize db:migrate

# undo migrate db
$ NODE_ENV=development sequelize db:migrate:undo:all

# seed db
$ NODE_ENV=development sequelize db:seed:all
```
Check Sequelize website for more info