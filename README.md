### README for Feedback Application 

## Project Overview:

This project is a feedback application that allows users to submit feedback, view feedback, and filter feedback based on ratings. It consists of a **backend** built with Python and Flask and a **frontend** built with React. The backend uses SQLite as the database to store feedback data, while the frontend provides a user-friendly interface for interacting with the application.

### Features
1. **Submit Feedback**: Users can submit feedback with a message and a rating.
2. **View Feedback**: Users can view all feedback stored in the database.
3. **Filter Feedback**: Users can filter feedback based on ratings.
4. **Responsive UI**: A clean and modern user interface styled with CSS.

---

## Project Structure

- **`backend/`**: Contains the Flask backend code.
  - `app.py`: Main Flask application file.
  - `database.py`: Handles database initialization and schema creation.
  - `requirements.txt`: Lists Python dependencies.

- **`frontend/`**: Contains the React frontend code.
  - `src/`: Source code for React components.
  - `index.css`: Styles for the frontend.
  - `package.json`: Lists Node.js dependencies and scripts.
  - `public/`: index.html.

- **`Dockerfile`**: Multi-stage Dockerfile to build and run both the backend and frontend.

---

## Prerequisites

- **Docker**: Ensure Docker is installed on your system.
- **Docker Compose** (optional): For managing multi-container applications.

---

## Steps to Run the Application Using Docker

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Build the Docker Image**:
   Run the following command to build the Docker image:
   ```bash
   docker build -t feedback-app .
   ```

3. **Run the Docker Container**:
   Start the container using the following command:
   ```bash
   docker run -p 5000:5000 -p 3000:3000 feedback-app
   ```

4. **Access the Application**:
   - **Frontend**: Open your browser and navigate to `http://localhost:3000`.
   - **Backend**: The backend API is available at `http://localhost:5000`.

---

## Notes

- The backend initializes the SQLite database with sample feedback data on the first run.
- The frontend and backend are served from separate ports (3000 for the frontend and 5000 for the backend).
- You can modify the `Dockerfile` or environment variables as needed for deployment.

---

## Technologies Used

- **Backend**: Python, Flask, SQLite
- **Frontend**: React, JavaScript, CSS
- **Containerization**: Docker

This README provides a clear understanding of the project and the steps to run it using Docker.