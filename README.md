# Wanderlust

Minimal Airbnb-like listing app built with Express, EJS, MongoDB and Passport (local auth).

## Prerequisites
- Node.js (v16+ recommended)  
- MongoDB running locally or accessible via connection string

## Install
```bash
npm install
```

## Run
```bash
node app.js
# or for auto-restart during development
npx nodemon app.js
```
Server listens on http://localhost:8080 by default.
Deployed Link:- https://wanderlust2-3b24.onrender.com/

## Configuration
- Default MongoDB URL is set in app.js as `mongodb://127.0.0.1:27017/wanderlust`. Change it to your DB or switch to an environment variable for production.
- Replace the hard-coded session secret in app.js with a secure value or use an environment variable.
- If you add environment variables, consider using a .env file and a loader like dotenv.

## Project entry
- Server entry: app.js

## Key files and folders
- package.json: project manifest and dependencies  
- app.js: main Express application and configuration  
- routes/: route handlers (listing.js, review.js, user.js)  
- models/: Mongoose models (listing.js, review.js, user.js)  
- views/: EJS templates and layouts  
- public/: static assets (css, js)  
- utils/: helper utilities (ExpressError, wrapAsync)  
- init/: optional seed or initialization scripts

## Routes overview
- GET / — root  
- Listings: /listings (index, new, create, show, edit, update, delete)  
- Reviews: nested under listings at /listings/:id/reviews  
- Auth: signup/login/logout handled in user.js via Passport Local

## Development tips
- Use nodemon for faster iteration: `npx nodemon app.js`  
- Add a `start` script to package.json if you prefer `npm start`  
- Create a seed script in init/ to populate sample data for testing

## Tests
- None included (package.json contains default placeholder test script)

## Contributing
- Fork, branch, and open PRs. Do not commit secrets; prefer environment variables.

## License
- ISC (as declared in package.json) — update as needed

Would you like me to create a README.md file in the repo with this content?
