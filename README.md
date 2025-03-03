## Getting Started
Create DB with executing product-db.sql in PostgreSql

Add a `.env` file with the following keys:
1. `CONNECTION_STRING` - Connection to the database
2. `TOKEN_SECRET_KEY` - Secret key for JSON Web Token - Execute this in your terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

To start the development server, run:
`npm run dev`


## Description
An e-commerce backend using Node.js, TypeORM, and Express.js, seamlessly integrating with PostgreSQL. This project includes structured data models for core entities like Product, Cart, User, and Product_Cart, ensuring efficient handling of product listings, user information, and cart management. The application leverages TypeORM for ORM capabilities, allowing smooth database interactions and flexible query building.

## Author
[Saman Kefayatpour](https://www.linkedin.com/in/samankefayatpour/)
