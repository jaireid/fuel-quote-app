# Fuel Quote

A full stack single page fuel request application with quote history, location-based discounts, and state management.

![Screenshot preview for quote form](./frontend/public/quote.PNG)
![Screenshot preview for quote history](./frontend/public/history.PNG)

### Built with:

- JavaScript
- Tailwind CSS
- React using Vite
- Redux
- Node.js
- Express.js
- MongoDB

### It includes the following:

- Backend API with Express & MongoDB
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware
- MongoDB database to store users and quotes
- Backend unit tests with Jest

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Install Dependencies
```
npm install
cd frontend
npm install
```

### Env Variables
```
NODE_ENV = development
PORT = 3001
MONGO_URI = your mongodb uri
JWT_SECRET = 'yourJwtSecrect'
```

### Run
```
# Run backend
npm run server

# Run frontend
cd frontend
npm run dev
```

## Build & Deploy
```
# Create frontend prod build
cd frontend
npm run build
```
