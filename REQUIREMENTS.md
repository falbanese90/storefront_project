# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (check)
- Show (check)
- Create [token required] (check)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] (check)
- Show [token required] (check)
- Create N[token required] (check)

#### Orders
- Current Order by user (args: user id)[token required] **
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 

## Data Shapes
#### Product (products)
- id : SERIAL PRIMARY KEY
- name : VARCHAR(64) NOT NULL
- price : integer NOT NULL


#### User (users)
- id : SERIAL PRIMARY KEY
- firstName : VARCHAR(50)
- lastName : VARCHAR(50)
- password : VARCHAR

#### Orders (orders)
- id : SERIAL PRIMARY KEY
- status : VARCHAR(64)
- user_id : bigint REFERENCES users(id)

#### Order Products Table (order_products_table)
- id: SERIAL PRIMARY KEY
- quantity : integer
- order_id : bigint REFERENCES orders(id)
- product_id : bigint REFERENCES products(id)

