# Stock Price Web App

## Adding API credentials

Before building, add a file named `.env` to the root directory containing Coinbase API credentials structured like the following:

```bash
API_KEY=""
API_SECRET=""
API_PASSPHRASE=""
```

## Build

Ensure you have Node.js then run `npm install` in the root directory to install all dependencies. Run `npm run build` to build the application then `npm run start` to start the Node.js server.

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Testing Plan

The application should be tested with unit tests and integration tests. The unit tests should test each component (ensuring they render correctly with all expected options) as well as every API call (ensuring they return valid responses with correct data). The integration tests should make sure the components render together correctly and that they update correctly after API calls. For these tests manually selected mock data can be used so the output is predictable and easily comparable.

These tests should be scripts which can be executed before pushing to the main/production branch.