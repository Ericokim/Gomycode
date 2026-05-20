# Mongoose & NodeJS VS MongoDB Checkpoint

This project demonstrates basic MongoDB operations with Node.js and Mongoose using a simple `Person` model.

## Requirements

- Node.js
- MongoDB Atlas database URI

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your MongoDB Atlas URI to the private `.env` file:

   ```env
   MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/database-name"
   ```

   Keep no spaces around `=` and keep the URI inside quotes.

3. Check the code:

   ```bash
   npm run check
   ```

4. Test the database connection:

   ```bash
   npm start
   ```

## Project Files

- `index.js`: connects to MongoDB and exports all checkpoint operations.
- `models/person.js`: defines the `Person` Mongoose model.
- `.env`: private MongoDB URI file, ignored by Git.
- `.env.example`: safe example for the required environment variable.

## Implemented Operations

- Create and save one person.
- Create many people with `Model.create()`.
- Find people by name.
- Find one person by favorite food.
- Find one person by `_id`.
- Find, edit, and save a person.
- Update one person with `findOneAndUpdate()`.
- Delete one person by id.
- Delete all people named `Mary`.
- Chain query helpers for people who like burritos.
