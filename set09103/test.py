from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/settings")
def settings():
    return render_template("settings.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/faq")
def faq():
    return render_template("faq.html")

@app.route("/form")
def form():
    return render_template("form.html")

@app.route('/submit', methods=['POST'])
def submit_form():
    # Get form data
    email = request.form.get('email')
    subject = request.form.get('subject')
    description = request.form.get('description')
    affected = request.form.get('affected')
    improvements = request.form.get('improvements')
    information = request.form.get('information')

    # TODO could save to a database, send email, etc.
    # For now just redirect to the success page

    return redirect(url_for('post_success'))

@app.route('/post_success')
def post_success():
    return render_template('post_success.html')

@app.route('/login')
def login_page():
    return render_template('login.html')  # your login page

@app.route('/login_submit', methods=['POST'])
def login_submit():
    # Get form data
    username = request.form.get('username')
    password = request.form.get('password')

    # Here you could validate credentials
    # For now, we just redirect to the success page

    return redirect(url_for('login_success'))

@app.route('/login_success')
def login_success():
    return render_template('login_success.html')

@app.route("/game_listings")
def game_listings():
    q = request.args.get("q", "").lower()
    return render_template("game_listings.html", query=q)

@app.route("/categories")
def categories():
    return render_template("categories.html")

@app.route("/game1")
def game1():
    return render_template("game1.html")
    
@app.route("/game2")
def game2():
    return render_template("game2.html")
    
@app.route("/game3")
def game3():
    return render_template("game3.html")
    
@app.route("/game4")
def game4():
    return render_template("game4.html")

if __name__ == "__main__":
    app.run(debug=True)
