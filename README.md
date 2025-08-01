# Feature Voting System

A feature voting system built with a **Python backend** (using `aiohttp` and `aiosqlite`) and a **React Native frontend** (using Expo). This application allows users to post new feature ideas and upvote existing ones.

---

## Project Structure

```
project-root/
│
├── backend/                   # Backend API and database logic
│   ├── database.py            # SQLite connection and setup
│   ├── api.py                 # REST API endpoints
│   ├── main.py                # Backend server entry point
│   └── tests/                 # Unit tests (Pytest)
│
└── frontend/
    └── my-feature-voting-app/ # React Native (Expo) project
        ├── app/               # Main UI pages
        └── components/        # Reusable components
```

---

## How to Run the Application

### 1. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install dependencies (preferably inside a virtual environment):

```bash
pip install aiohttp aiosqlite aiohttp-cors pytest pytest-asyncio pytest-aiohttp
```

Run the backend server:

```bash
python main.py
```

This will create a `features.db` file automatically and start the server at:

```
http://0.0.0.0:8080
```

---

### 2. Frontend Setup

Open a new terminal and go to the frontend project directory:

```bash
cd frontend/my-feature-voting-app
```

Install dependencies:

```bash
npm install
```

Update the API base URL in `app/index.jsx`:

```javascript
const API_BASE_URL = 'http://YOUR_LOCAL_IP_ADDRESS:8080';
```

Start the Expo development server:

```bash
npx expo start
```

You can now run the app:
- On a physical device via QR code (Expo Go)
- On an emulator
- In the web browser

---

## Running Tests

### Backend Tests

From the `backend` directory:

```bash
python -m pytest
```

### Frontend Tests

Ensure test dependencies are installed:

```bash
npm install --save-dev jest-expo react-test-renderer @testing-library/react-native
```

Then run tests:

```bash
npm test
```

---

## Features

- Submit new feature ideas
- View a list of feature requests
- Upvote features in real-time
- Persistent SQLite database
- Cross-platform UI with React Native

---

## Tech Stack

- **Backend**: Python, aiohttp, aiosqlite, aiohttp-cors
- **Frontend**: React Native, Expo, Axios
- **Testing**: Pytest and Jest
