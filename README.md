# Password Manager

## About

Password Manager is a secure and user-friendly application developed with Nest.js and Prisma using Postgres, designed to help you manage and safeguard your sensitive information such as login credentials, secure notes, and credit card details. This application ensures the security and privacy of your data by encrypting sensitive information and providing user authentication.

## Technologies

<p align='center'>
<img style='margin: 2px;' src='https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white' alt='nestjs'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' alt='node.js'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' alt='typescript'>
<img style='margin: 2px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB' alt='express.js'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white' alt='prisma'>
<img style='margin: 2px;' src='https://img.shields.io/badge/postgres-%234ea94b.svg?style=for-the-badge&logo=postgresql&logoColor=white' alt='postgres'>
<img style='margin: 2px; width:70px' src='https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white/' alt='npm'>
</p>

## Routes

#### <span style='font-weight:bold;'>GET</span> /health

A route to check if the application is running. Returns "I'm okay!" with status code 200.

#### <span style='font-weight:bold;'>POST</span> /users/sign-in

A route that creates a new user. If there's a users with this email already registered, it returns a 409 status code error. The password should be a safe password: containing at least 10 char, 1 lower letter, 1 upper letter, 1 number and 1 symbol. If anything is invalid it'll return a 400 status code error. If its sucessfull it returns a 201 status code. The request body should contain:

```
{
    {
    "email": "thatsmyemail@gmail.com",
    "password": "S@f3pass"
    }
}
```

#### <span style='font-weight:bold;'>POST</span> /users/sign-up

A route that creates a new user. If anything is invalid it'll return a 401 status code error. If its sucessfull it returns a 200 status code and a token. The request body should contain:

```
{
    {
    "email": "thatsmyemail@gmail.com",
    "password": "S@f3pass"
    }
}
```

### Credentials:
Credentials refer to login information for websites and services. Each user can store multiple credentials (e.g., "Facebook" ⇒ username: john, password: jhnF@ceb00k).

#### <span style='font-weight:bold;'>POST</span> /credentials

A route that will create a new credentials, it needs a token as it is a secure route. If any of the required data is missing, return 400 Bad Request. Each credential must have a unique title. If a user attempts to create two credentials with the same name, prevent it with 409 Conflict. The password is encrypted using cryptr library. The body should be:

```
{
    {
    "title": "My example credential",
    "url": "https://example.com/",
    "username": "My nice username",
    "password": "mypassword",
    }
}
```

#### <span style='font-weight:bold;'>GET</span> /credentials

The application provides a way to retrieve all user's credentials. It requires a token. All retrieved credentials should include the decrypted password, it'll return a 200 status code.

```
[
    {
    "id": 1
    "userId": 1
    "title": "My example credential",
    "url": "https://example.com/",
    "username": "My nice username",
    "password": "mypassword",
    }
        {
    "id": 2
    "userId": 1
    "title": "My example credential 2",
    "url": "https://example.com/",
    "username": "My nice username",
    "password": "mypassword"
    }
]
```

#### <span style='font-weight:bold;'>DELETE</span> /credentials/:id

A route that deletes an existing credential based on the provided ID. It'll give you a 200 status code in case of sucess. In case that there's no credential with this id, it'll give a 404 status code error, if it belongs to another user it'll give a 403 status code error.

### Secure Notes:
Secure Notes refer to free-form text information.. Each user can store multiple notes.

#### <span style='font-weight:bold;'>POST</span> /notes

A route that will create a new note, it needs a token as it is a secure route. If any of the required data is missing, return 400 Bad Request. Each note must have a unique title. If a user attempts to create two notes with the same title, it returns a 409 Conflict status code. The body should be:

```
{
    {
    "title": "My example note",
    "text": "My example text!!",
    }
}
```

#### <span style='font-weight:bold;'>GET</span> /note

The application provides a way to retrieve all user's notes. It requires a token. It'll return a 200 status code.

```
[
    {
    "id": 1
    "userId": 1
    "title": "My example note",
    "text": "My example text!!",
    }
        {
    "id": 2
    "userId": 1
    "title": "My example notes 2",
    "text": "My example text!!",
    }
]
```

#### <span style='font-weight:bold;'>DELETE</span> /notes/:id

A route that deletes an existing note based on the provided ID. It'll give you a 200 status code in case of sucess. In case that there's no note with this id, it'll give a 404 status code error, if it belongs to another user it'll give a 403 status code error.

### Cards:
Cards represent credit and/or debit cards. Each user can store multiple cards.

#### <span style='font-weight:bold;'>POST</span> /cards

A route that will create a new card, it needs a token as it is a secure route. If any of the required data is missing, return 400 Bad Request. Each card  must have a unique title. If a user attempts to create two cards with the same title, it returns a 409 Conflict status code. The body should be:

```
{
    {
    "title": "My example card title",
    "name": "My example name!!",
    "code": "325",
    "expDate": "12/2029"
    "password": "mypassword"
    "virtual": true,
    "type": "both",
    }
}
```

#### <span style='font-weight:bold;'>GET</span> /cards

The application provides a way to retrieve all user's cards. It requires a token. It'll return a 200 status code.

```
[
    {
    "id": 1
    "userId": 1
    "title": "My example card title",
    "name": "My example name!!",
    "code": "325",
    "expDate": "12/2029"
    "password": "mypassword"
    "virtual": true,
    "type": "both",
    }
        {
    "id": 2
    "userId": 1
    "title": "My example card title 2",
    "name": "My example name!!",
    "code": "325",
    "expDate": "12/2029"
    "password": "mypassword"
    "virtual": true,
    "type": "both",
    }
]
```

#### <span style='font-weight:bold;'>DELETE</span> /cards/:id

A route that deletes an existing card based on the provided ID. It'll give you a 200 status code in case of sucess. In case that there's no card with this id, it'll give a 404 status code error, if it belongs to another user it'll give a 403 status code error.

## How to run

1. Clone this repository
2. Install the dependencies

```
npm i
```
3. Run prisma
   
```
npx run prisma migrate dev
```
4. Run the back-end with

```
npm run start
```

5. Access http://localhost:3000 on your browser to run the API.
