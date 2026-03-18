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

### 3. MongoDB Atlas Setup
1. Go to https://www.mongodb.com/atlas and create a free account.
2. Create a free cluster (M0).
3. Under **Database Access**, create a database user with a username and password.
4. Under **Network Access**, add your IP address (or `0.0.0.0/0` to allow all IPs during development).
5. Click **Connect → Drivers**, copy the connection string, and keep it for the next step.

### 4. Backend Setup
1. Open the terminal (ctrl + `)
2. Change to backend folder: `cd backend`
3. Install dependencies: `npm install`
4. Environmental Variables
   - Create a new file named `.env` in the backend folder.
   - Copy the keys from `.env.example` into your new `.env` file.
   - Set `MONGO_URI` to your Atlas connection string (replace `<username>` and `<password>` with your database user credentials).
   - Add a secret string for `JWT_SECRET`.
5. Seed the database: `npm run seed`
6. Start the server: `npm run dev`

### 5. Frontend Setup
1. Open a second terminal window
2. Go to the frontend folder: cd frontend
3. Install dependencies: npm install
   (Note: if routing issues occur, run npm install react-routed-dom)
4. Go to the src folder: cd frontend/src
5. Start the app: npm run dev
6. Follow the local link

