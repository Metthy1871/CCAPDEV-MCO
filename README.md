# The Phantom Forum

## How to Run the Project

### 1. Install Node.js
1. Download the LTS Version from nodejs.org (https://nodejs.org/).
2. Run the installer and click "Next" through everything.

### 2. Clone the Repository
1. Open github desktop
2. Go to "File" then select "Clone Repository"
3. Clone this repository
4. Open the repository in VS Code

### 3. Backend Setup
1. Open the terminal (ctr + `)
2. Change to backend folder (cd backend)
3. Install dependencies (npm install)
4. Environmental Variables
   - Create a new file names .env in the backend folder.
   - Copy the keys from .env.example into your new .env file
   - Add a secret string for JWT_SECRET
5. Start the server: npm run dev

### 4. Frontend Setup
1. Open a second terminal window
2. Go to the frontend folder: cd frontend
3. Install dependencies: npm install
   (Note: if routing issues occur, run npm install react-routed-dom)
4. Start the app: npm run dev
5. Follow the local link

