# 1. node

- node: 20.11.1

# 2. Create a .env file and provide them with those vars:

- NODE_ENV
- PORT
- DATABASE_URL
- JWT_SECRET
- VERSION

# 3. Setup the dev enviroment:

- yarn install
- cd frontend && yarn install
- cd ..
- npx prisma generate
- npx prisma migrate deploy
- npx prisma db seed (if needed)
- npx prisma studio (If want to open the db manager only)
- yarn backend
- yarn frontend

# 4. Happy coding :smile: :alien: :star: :boom: :fire:
