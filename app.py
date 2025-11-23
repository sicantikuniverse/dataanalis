from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

def db():
    conn = sqlite3.connect("database.db")
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
