### Nest MyDiary Server

Simple server built with for learning / teaching purpose

### Tech used

- NodeJs
- Nest
- Prisma
- Passport JS
- Docker
- Postgres
- Jest
- Pactum
- Dotenv

### Future plan

- Add GraphQL
- Add Integration tests

### In order to run the app:
- Make sure you have docker installed then run `docker compose up` to have the postgres db running
- Create two `.env` and `.env.test` files containing the postgres database url key : `DATABASE_URL=` and the jwt secret : `JWT_SECRET`
- Install the npm dependencies then run `npm run start:dev`.
- You can then use any API testing client app to test the APIs 
- Or, run the e2e tests available, 

Enjoy !