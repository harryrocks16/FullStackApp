import sqlite3

def init_db():
    conn = sqlite3.connect('feedback.db')
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT NOT NULL,
            rating INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Sample data to insert
    sample_data = [
        ("Great service!", 5),
        ("Average experience.", 3),
        ("Poor response time.", 2)
    ]

    # Insert data into the feedback table
    cursor.executemany("INSERT INTO feedback (message, rating) VALUES (?, ?)", sample_data)

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized.")
