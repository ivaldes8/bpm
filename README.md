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
- yarn backend
- yarn frontend

# 4. Happy coding :smile: :alien: :star: :boom: :fire: