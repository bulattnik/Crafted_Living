import sqlite3
from datetime import datetime

def init_db():
    """Initialize the database and create necessary tables"""
    conn = sqlite3.connect('applications.db')
    cursor = conn.cursor()
    
    # Create applications table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        project_type TEXT NOT NULL,
        message TEXT,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

def save_application(name, email, phone, project_type, message):
    """Save a new application to the database"""
    conn = sqlite3.connect('applications.db')
    cursor = conn.cursor()
    
    cursor.execute('''
    INSERT INTO applications (name, email, phone, project_type, message)
    VALUES (?, ?, ?, ?, ?)
    ''', (name, email, phone, project_type, message))
    
    application_id = cursor.lastrowid
    
    conn.commit()
    conn.close()
    
    return application_id

def get_all_applications():
    """Retrieve all applications from the database"""
    conn = sqlite3.connect('applications.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM applications ORDER BY created_at DESC')
    applications = cursor.fetchall()
    
    conn.close()
    
    return applications

def update_application_status(application_id, status):
    """Update the status of an application"""
    conn = sqlite3.connect('applications.db')
    cursor = conn.cursor()
    
    cursor.execute('''
    UPDATE applications 
    SET status = ? 
    WHERE id = ?
    ''', (status, application_id))
    
    conn.commit()
    conn.close()

# Initialize the database when the module is imported
init_db() 