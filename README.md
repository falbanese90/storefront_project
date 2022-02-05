### Setting up your Postgres Database

1.The Database will be run from the following;
Host: ‘0.0.0.0’
Port: ‘5434’
2. Will need to enter the following in psql:
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
CREATE USER ‘developer’ WITH PASSWORD ‘password123’;
GRANT ALL PRIVILEGES ON storefront TO ‘developer’;
GRANT ALL PRIVELEGES ON storefront_test TO ‘developer’;
3. Be sure to include a database.json file with the correct parameters.
 
### Database Migrations

1. Once databases and user are created and granted privileges you can proceed to migrate via ‘db-migrate’:
npx db-migrate up
2. Now all tests should work properly. To test run:
npm run test
 
### User Endpoint
1. Once the database is set up you can proceed to the create user endpoint to create your user via:
<http://0.0.0.0:3000/users/create> [POST]
Make sure you include user credentials as so:
{
    "firstName": "firstName",
    "lastName": "lastName",
    "password": "password"
}

2. This will return JWT that will be needed for other endpoints.

To authenticate your user and receive JWT:

<http://0.0.0.0:3000/users/authenticate> [POST]

To list all users *JWT Required*

<http://0.0.0.0:3000/users> [GET]

### Products Endpoint
To create Products *JWT Required*

<http://0.0.0.0:3000/products/create> [POST]
> Body
{
    "name": "productName",
    "price": price of product as integer
}

To list all available Products

<http://0.0.0.0:3000/products> [GET]


### Orders Endpoint
 To create an order:

<http://0.0.0.0:3000/orders/create> [POST]

To list all orders:

<http://0.0.0.0:3000/orders> [GET]

To add Product to an order:

*http://0.0.0.0:3000/orders/[orderid]/products*
- Where the order id is the order you are looking to add to. The below example will add 15 untits of a product with an id of 1 to order 1.
<http://0.0.0.0:3000/orders/1/products> [POST]
With the following body:
{
    productId: "1",
    quantity: 15
}

### Dashboard Queries

TO get a list of all users that have orders you can use the dashboard query via:
<http://0.0.0.0:3000/users-with-orders> [GET]