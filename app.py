from flask import Flask, render_template, request, redirect
import sqlite3
import os

app = Flask(__name__)

# Path database (disimpan di folder yang sama dengan app.py)
DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")

def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def index():
    conn = db()
    rows = conn.execute("SELECT * FROM items").fetchall()
    conn.close()
    return render_template("index.html", rows=rows)

@app.route("/add", methods=["POST"])
def add():
    text = request.form["text"]
    conn = db()
    conn.execute("INSERT INTO items(text) VALUES (?)", (text,))
    conn.commit()
    conn.close()
    return redirect("/")

# Untuk Vercel: handler WSGI
def handler(request, response):
    return app
