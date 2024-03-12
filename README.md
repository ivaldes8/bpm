# 1. node
- node: 20.11.1

# 2. Create a .env file and provide them with those vars:
- NODE_ENV
- PORT
- MOGO_URI
- JWT_SECRET
- VERSION

# 3. For run the app in diferent node version using pm2:
- pm2 start backend/server.js --name promote --interpreter=/home/ivan/.nvm/versions/node/v16.14.2/bin/node

# 4. Happy coding :smile: :alien: :star: :boom: :fire: