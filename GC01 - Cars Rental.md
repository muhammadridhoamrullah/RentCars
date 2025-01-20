# Car Rental System Documentation

## Models :

_User_
- email : string, unique (required)
- password : string (required)
- role : string (required)

_Car_
- name : string (required) // example: "Toyota Avanza"
- brand : string (required) // example: "Toyota"
- price : integer (required) // daily rental price
- description : string (required)
- year : integer (required)
- transmission : string (required) // "Manual" or "Automatic"
- imageUrl : string (required)
- available : boolean (required)
- TypeId : integer (required)
- UserId : integer (required)

_Type_
- name : string (required) // example: "SUV", "MPV", "Sedan", "Sports"

## Relationship :

>### **One-to-Many**
Pay attention to the relationship between `User` and `Car`, and between `Type` and `Car`. Use the appropriate relationship definition in sequelize relation.

## Endpoints :

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /add-user`

And routes below need authentication
- `GET /cars`
- `POST /cars`
- `GET /types`
- `POST /types`

And routes below need authorization
- `PUT /cars/:id`
- `DELETE /cars/:id`
- `PATCH /cars/:id/image`

Public routes (no auth needed):
- `GET /pub/cars`
- `GET /pub/cars/:id`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
​
```json
{
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /add-user

Description: Create new staff account (Admin only)

Request:
- headers: 
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not authorized"
}
```

&nbsp;

## 4. GET /cars

Description: Get all cars belonging to logged in user

Request:
- headers: 
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Toyota Alphard",
    "brand": "Toyota",
    "price": 1500000,
    "description": "Luxury MPV with premium features",
    "year": 2023,
    "transmission": "Automatic",
    "imageUrl": "https://example.com/images/alphard.jpg",
    "available": true,
    "TypeId": 1,
    "User": {
      "id": 1,
      "email": "rental@mail.com"
    },
    "Type": {
      "id": 1,
      "name": "MPV"
    }
  },
  {
    "id": 2,
    "name": "Honda Civic Type R",
    "brand": "Honda",
    "price": 2000000,
    "description": "Sports car with racing DNA",
    "year": 2023,
    "transmission": "Manual",
    "imageUrl": "https://example.com/images/civic.jpg",
    "available": true,
    "TypeId": 2,
    "User": {
      "id": 1,
      "email": "rental@mail.com"
    },
    "Type": {
      "id": 2,
      "name": "Sports"
    }
  }
]
```

&nbsp;

## 5. POST /cars

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "name": "string",
  "brand": "string",
  "price": "integer",
  "description": "string",
  "year": "integer",
  "transmission": "string",
  "imageUrl": "string",
  "available": "boolean",
  "TypeId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "brand": "string",
  "price": "integer",
  "description": "string",
  "year": "integer",
  "transmission": "string",
  "imageUrl": "string",
  "available": "boolean",
  "TypeId": "integer",
  "UserId": "integer"
}
```

&nbsp;

## 6. PUT /cars/:id

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body:
```json
{
  "name": "string",
  "brand": "string",
  "price": "integer",
  "description": "string",
  "year": "integer",
  "transmission": "string",
  "imageUrl": "string",
  "available": "boolean",
  "TypeId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Car has been updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not authorized"
}
```

&nbsp;

## 7. DELETE /cars/:id

Description: Delete car by ID (owner only)

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Car has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not authorized"
}
```

&nbsp;

## 8. PATCH /cars/:id/image

Description: Update car image

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body (multipart/form-data):
```json
{
  "image": "<file>"
}
```

_Response (200 - OK)_

```json
{
  "message": "Image car success to update"
}
```

&nbsp;

## 9. GET /types

Description: Get all car types

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "SUV"
  },
  {
    "id": 2,
    "name": "MPV"
  },
  {
    "id": 3,
    "name": "Sedan"
  },
  {
    "id": 4,
    "name": "Sports"
  }
]
```

&nbsp;

## 10. POST /types

Description: Create new car type (Admin only)

Request:
- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string"
}
```

&nbsp;

## 11. GET /pub/cars

Description: Get public car list with optional filters

Query Parameters:
- search: string (optional, search by car name or brand)
- typeId: integer (optional, filter by type)
- transmission: string (optional, filter by transmission type)
- sort: string (optional, "newest" or "oldest")
- page: integer (optional, default = 1)

_Response (200 - OK)_

```json
{
  "totalItems": "integer",
  "items": [
    {
      "id": 1,
      "name": "Toyota Alphard",
      "brand": "Toyota",
      "price": 1500000,
      "description": "Luxury MPV with premium features",
      "year": 2023,
      "transmission": "Automatic",
      "imageUrl": "https://example.com/images/alphard.jpg",
      "available": true,
      "TypeId": 1,
      "Type": {
        "id": 1,
        "name": "MPV"
      }
    }
  ],
  "currentPage": "integer",
  "totalPages": "integer"
}
```

&nbsp;

## 12. GET /pub/cars/:id

Description: Get public car detail

Request:
- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Toyota Alphard",
  "brand": "Toyota",
  "price": 1500000,
  "description": "Luxury MPV with premium features",
  "year": 2023,
  "transmission": "Automatic",
  "imageUrl": "https://example.com/images/alphard.jpg",
  "available": true,
  "TypeId": 1,
  "Type": {
    "id": 1,
    "name": "MPV"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```