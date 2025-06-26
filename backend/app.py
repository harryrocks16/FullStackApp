from flask import Flask, request, jsonify
import sqlite3
from database import init_db
from flask import send_from_directory
import os

# Initialize the database
init_db()

# Create a Flask application instance
app = Flask(__name__)

def get_db_connection():
    """
    Helper function to establish a connection to the SQLite database.
    Returns:
        sqlite3.Connection: A connection object to the database.
    """
    return sqlite3.connect('feedback.db')

@app.route("/feedback", methods=["GET"])
def get_feedback():
    """
    Endpoint to retrieve feedback from the database.
    Query Parameters:
        - rating (optional): Filter feedback by rating.
        - sort (optional): Sort feedback by creation date ('asc' or 'desc'). Default is 'desc'.
    Returns:
        JSON response containing a list of feedback or an error message.
    """
    # Get the rating filter from query parameters
    rating = request.args.get("rating")
    # Get the sort order, default to 'desc'
    sort = request.args.get("sort", "desc").lower()

    # Validate the sort parameter
    if sort not in ["asc", "desc"]:
        sort = "desc"

    # Base query to fetch feedback
    query = "SELECT id, message, rating, created_at FROM feedback"
    params = []

    # Add a WHERE clause if a rating filter is provided
    if rating:
        query += " WHERE rating = ?"
        params.append(rating)

    # Add ORDER BY clause for sorting
    query += f" ORDER BY created_at {sort}"

    try:
        # Execute the query and fetch results
        with get_db_connection() as conn:
            # Return rows as dictionaries
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            feedback = cursor.execute(query, params).fetchall()
            feedback_list = [dict(row) for row in feedback]  # Convert rows to dictionaries
        return jsonify(feedback_list)  # Return the feedback as JSON
    except Exception as e:
        # Handle any database errors
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET", "POST"])
def root():
    """
    Handle requests to the root URL.
    For GET: Redirect to the /feedback endpoint or return a custom message.
    For POST: Return a message indicating the correct endpoint for submissions.
    """
    if request.method == "GET":
        return jsonify({"message": "Welcome! Please use the /feedback endpoint."}), 200
    elif request.method == "POST":
        return jsonify({"error": "Please use the /feedback endpoint for submissions."}), 400

@app.errorhandler(404)
def page_not_found(e):
    """
    Handle undefined routes and return a custom 404 error message.
    """
    return jsonify({"error": "Endpoint not found. Please check the URL."}), 404


@app.route("/feedback", methods=["POST"])
def post_feedback():
    """
    Endpoint to submit new feedback to the database.
    Request Body (JSON):
        - message (str): The feedback message.
        - rating (int): The rating associated with the feedback.
    Returns:
        JSON response indicating success or an error message.
    """
    # Parse the JSON request body
    data = request.get_json()

    # Validate the input data
    if not data or "message" not in data or "rating" not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        # Insert the feedback into the database
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO feedback (message, rating) VALUES (?, ?)",
                (data["message"], data["rating"]),
            )
            # Commit the transaction
            conn.commit()
        # Return success response
        return jsonify({"status": "ok"}), 201
    except Exception as e:
        # Handle any database errors
        return jsonify({"error": str(e)}), 500

# Run the Flask application
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)