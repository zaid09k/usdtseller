# USDT Seller Demo

A simple frontend-only React application built with Vite. It simulates a USDT selling platform with login, order flow, and account/order history stored in `localStorage`. There is no backend—everything runs in the browser.

## Features

- **Login page** (fake authentication)
- **Dashboard** showing live USDT rate (`₹116.73`) and sell button
- **Sell flow** with quantity, UPI ID, and hash transaction steps
- **Order confirmation** with success message and back button
- **Order history** persisted in localStorage
- **Account page** showing user ID and join date
- Simple responsive **navbar** with navigation links

The UI is designed to look clean and professional with good UX.

## Setup & Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown by Vite (e.g. `http://localhost:5176`) in your browser.

## Notes

- All data is local. Clearing browser storage or signing out resets the app.
- No actual rate updates or backend calls; the rate is fixed at ₹116.73 for demonstration.
