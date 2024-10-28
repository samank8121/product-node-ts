## Getting Started
Create DB with executing product-db.sql in PostgreSql

Add a `.env` file with the following keys:
1. `CONNECTION_STRING` - Connection to the database
2. `TOKEN_SECRET_KEY` - Secret key for JSON Web Token - Execute this in your terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

To start the development server, run:
`npm run dev`


## Description
This project is node.js sample, this is a express backend which connect to postgresql I used typeorm

