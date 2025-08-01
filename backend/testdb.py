import mysql.connector

try:
    connection = mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='root',  # WAMP default is empty password
        database='quiz'  # We'll create this database
    )
    print("Connected to MySQL successfully!")
    connection.close()
except mysql.connector.Error as e:
    print(f"Error: {e}")