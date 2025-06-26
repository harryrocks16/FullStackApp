### Overview of Fixes

1. **Sanitized SQL Queries**  
   - Used parameterized queries to prevent SQL injection in GET /feedback route.

2. **JSON Serialization Issue**  
   - Used `sqlite3.Row` to return field-aware dictionaries instead of tuples.

3. **Input Validation**  
   - POST /feedback now checks for required keys. Frontend form has `required` fields and resets after success.

4. **Componentization**  
   - Split React UI into `FeedbackList`, `RatingFilter`, `FeedbackForm`. Improves readability, scalability.

5. **UX Enhancements**  
   - Added error and loading states in UI for clarity and user trust.

6. **Error Handling**
   - There was no error handling for database operations. Adding try-except blocks can help handle unexpected issues gracefully.

7. **Styling**
   - Created a very simple CSS to make the UI more user friendly

App now runs without console errors, handles edge cases, and has meaningful UX touchpoints.





























# Full-Stack Debug & Feature Test

Welcome! This is a full-stack take-home test. The app is partially functional and contains a few bugs. Your task:

1. Debug and fix the application so it runs correctly.
2. Implement filtering and sorting of feedback by rating and date.
3. Refactor any part of the code you find necessary.
4. Add appropriate test coverage.

## How to Run

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Submission
Push your changes to GitHub and send us the link. Include notes in a PR or README on:
- Bugs you fixed
- Design decisions you made
- Any improvements/refactors
