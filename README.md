# Car Wash Booking System
## Live URL
[Click here](https://lvl-2-assignment-3-nine.vercel.app/)

## Important Information
1. adminEmail: noor@gmail.com
2. password: admin123

## Technologies

* **Programming Language:** TypeScript
* **Web Framework:** Express.js
* **Database** MongoDB
* **ODM Library:**  Mongoose
* **Validation:** Zod Validation
* **Others NPM Package:** bcryptjs, cors, dotenv, http-status, jsonwebtoken

## Features

* **Authentication & Authorization:** By using jwt access token we make sure to secure authentication and authorization. We have two different roll in our system. We make sure that each role accesses only their authorized route.
* **Service:** We can create, get, update and delete services. but only accessible by the admin.
* **Slot** Only the admin can create slots. Admin and users can both get all available slots
* **Booking:**  Only user can create booking. admin can get all the bookings and user can only get their booking.


## How to run this application locally.


 **Step-1:** Clone the following github repository into the local folder.
 

```   
https://github.com/miavai649/lvl-2-assignment-2.git
```
 **Step-2:** We need to install the node_modules and also the others essential packages .
 ```   
npm i
```
 **Step-3:** Then we need to set our environment variables, for this we need to create a file `.env` in the root directory.

 ```   
DB_URL=your_db_url
PORT=5000
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_TOKEN=your_jwt_access_token
JWT_ACCESS_TOKEN_EXPIRES_IN=7d
```

 **Step-4:** We are ready to run this application locally, just run the below command and the application will start running.
 ```   
npm run start:dev
```
