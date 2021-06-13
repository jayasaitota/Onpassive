## JAYA SAI GANESH

## Prerequisite Technologies

* [MongoDB 4.x](https://www.mongodb.org/downloads)
* [Node 10.15.x](https://nodejs.org/en/download/)
* npm 6.x

> If you have an older version of Node.js and NPM, you can use Node Version Manager [NVM](https://github.com/creationix/nvm) to use multiple node versions on your system.

## Installation

Following the steps below will guide you to install and run application.
```
git clone 
cd Onpassive/server
npm install  
npm start  
```
If all the packages and modules installed successfully, Then the server will be up and running on `http://localhost:4001`. This is the default port unless you change that manually.The server will establish a connection with mongoddb with db name onPassive (This can be changed in index.js file).

This server has 
USER
* create User 
  POST -> api/users 
  payload = {
    first_name:"Jaya",
    last_name:"Sai",
    email:"jayasai@yopmail.com",
    password:"Qwert@123"
  }

* Update User 
  PATCH = > api/users/:id
  payload = {
    last_name:"Sai1",
    email:"jayasai1@yopmail.com",
  }
  Headers = {
    authorization:'Barear d797e2ec-563d-5822-91a7-4cfbf2e2097b'
  }

* Get User Details 
  GET = > api/users/:id
  Headers = {
    authorization:'Barear d797e2ec-563d-5822-91a7-4cfbf2e2097b'
  }

* Detele User 
  DELETE = > api/users/:id
  Headers = {
    authorization:'Barear d797e2ec-563d-5822-91a7-4cfbf2e2097b'
  }

* Get List of Users 
  GET = > api/users
  Headers = {
    authorization:'Barear d797e2ec-563d-5822-91a7-4cfbf2e2097b'
  }

AUTH
* Login 
  POST = > api/auth/login
  payload = {
    email:"jayasai1@yopmail.com",
    password:"Qwert@123"
  }

* Forgot Password
  GET => api/auth/forgotPassword
  query = {
    email:"jayasai1@yopmail.com"
  }

* Email links Validation
  GET => api/auth/emailValidate
  query = {
    type:1, // for forgotpassword
    token:'kpurduyvso6q8124kj'
  }

