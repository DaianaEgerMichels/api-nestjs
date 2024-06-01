# NestJS - API

## Description

This is one API with authetication for create, read, delete or updated notes.
Built with Nest - Typescript.

## For local use: first step

```bash
$ npm install
```

## Running the app: second step

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test: for running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Dependencies used

* Prisma:

```
To configure the prism in the application, it is necessary to install the following dependencies:

Development dependency:
npm i -D prisma 

For started prisma:
npx prisma init --datasource-provider sqlite

For generate tables
npx prisma migrate dev

Client prisma:
npm i @prisma/client
```

* Passport:

```
To configure auth module:
npm i @nestjs/passport @nestjs/jwt passport passport-jwt passport-local

For add types, with development dependency:
npm i -D @types/passport-jwt @types/passport-local
```
* Fields validator:

```
To use validator nestjs:
npm i --save class-validator class-transformer
```

* Swagger:

```
To use swagger in nestjs:
npm install --save @nestjs/swagger
```


## Exceptions

* Pattern:

```
{
  message: string
  fields?: {
    [key: string]: string
  }
}

```
