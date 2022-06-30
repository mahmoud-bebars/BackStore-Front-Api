# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

|  #  | Method |              Endpoint              |     Route     | Authorization |      Located      |
| :-: | :----: | :--------------------------------: | :-----------: | :-----------: | :---------------: |
|  1  |  GET   |      Index(GET All Products)       |   /products   | not required  | productController |
|  2  |  GET   |      Show(GET Product by ID)       | /products/:id | not required  | productController |
|  3  |  POST  |     Create(Create product row)     |   /products   |   required    | productController |
|  4  |  PUT   | Index(Update a product row by ID)  | /products/:id |   required    | productController |
|  5  | DELETE | Remove(Delete a product row by ID) | /products/:id | not required  | productController |

#### Users

|  #  | Method |            Endpoint            |      Route      | Authorization |    Located     |
| :-: | :----: | :----------------------------: | :-------------: | :-----------: | :------------: |
|  1  |  GET   |      Index(GET All Users)      |     /users      |   required    | userController |
|  2  |  GET   |      Show(GET user by ID)      |   /users/:id    |   required    | userController |
|  3  |  POST  |     Create(User Register)      | /users/register | not required  | userController |
|  4  |  GET   |        Read(User Login)        |  /users/login   | not required  | userController |
|  5  |  GET   | Auth(User Check Authorization) |   /users/auth   | not required  | userController |

#### Orders

|  #  | Method |             Endpoint             |    Route    | Authorization |       Located       |
| :-: | :----: | :------------------------------: | :---------: | :-----------: | :-----------------: |
|  1  |  GET   |      Index(GET All orders)       |   /orders   |   required    |   orderController   |
|  2  |  GET   |      Show(GET order by ID)       | /orders/:id |   required    |   orderController   |
|  2  |  POST  |          create(order)           |   /orders   |   required    |   orderController   |
|  3  |  PUT   |  Update(Update order row by ID)  | /orders/:id |   required    |   orderController   |
|  4  | DELETE |  Remove(Delete order row by ID)  | /orders/:id |   required    |   orderController   |
|  5  |  GET   | UserOrder(GET All User's Orders) | /userOrder  |   required    | dashboardController |

#### Dashboard

|  #  | Method |             Endpoint             |       Route        | Authorization |       Located       |
| :-: | :----: | :------------------------------: | :----------------: | :-----------: | :-----------------: |
|  1  |  GET   | UserOrder(GET All User's Orders) |     /userOrder     |   required    | dashboardController |
|  2  |  GET   |        Expensive Products        | /expinsiveProducts | not required  |  productController  |

## Data Shapes

#### Product

|  #  | Column Name |         Type         |       Description        |
| :-: | :---------: | :------------------: | :----------------------: |
|  1  |     id      |  SERIAL PRIMARY KEY  |         indexing         |
|  2  |  productid  |     VARCHAR(50)      | Uniqe Id for the product |
|  3  |    name     | VARCHAR(60) NOT NULL |   name of the product    |
|  4  |    price    |   integer NOT NULL   |   price of the product   |

#### User

|  #  | Column Name |        Type        |        Description         |
| :-: | :---------: | :----------------: | :------------------------: |
|  1  |     id      | SERIAL PRIMARY KEY |          indexing          |
|  2  |   userid    |    VARCHAR(50)     |   Uniqe Id for the user    |
|  3  |  firstName  |    VARCHAR(30)     |     first of the user      |
|  4  |  lastName   |    VARCHAR(30)     |      last of the user      |
|  5  |    email    |    VARCHAR(100)    |     Email of the user      |
|  6  |  username   |    VARCHAR(50)     | for selecting information  |
|  7  |  password   |        text        | hash pass for user account |

#### Orders

|  #  | Column Name |             Type             |       Description        | Forgien_KY |
| :-: | :---------: | :--------------------------: | :----------------------: | :--------: |
|  1  |     id      |      SERIAL PRIMARY KEY      |         indexing         |
|  2  |   userid    |  bigint refrence users(id)   |  user id for the order   |    YES     |
|  3  |  productid  | bigint refrence products(id) |        product id        |    YES     |
|  4  |  quantity   |           Integer            | no. of products in order |
|  5  |   status    |         VARCHER(10)          |      orders status       |
