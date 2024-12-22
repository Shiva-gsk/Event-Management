Live at :- https://event-management-to01.onrender.com

# Api Endpoints:-

1. POST /events/create
   - Creates event by passing all details in request body and returns eventId

2. POST /register/:eventId
   - Registers a student for a particular event
    
3. PUT /events/:eventId
   - Updates eventId attributes based on data passed through request body

4. DELETE /events/:eventId
   - Deletes events and resgistrations with the given eventId

5. GET /events/:eventId
   - Gets event with the given eventId
  
6. GET /events/all
   - Gets  all events

# Setup Guide

- Clone the repository in our local computer
- Open terminal and use command `npm install` to install all the required packages
- Create a folder .env and a variable `MONGODB_URL` and give it your mongodb connection string
- After installing packages run command `node server.js` and your server will be started
