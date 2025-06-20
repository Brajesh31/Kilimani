from flask import Flask, render_template
from flask_cors import CORS
from contact_api import contact_api
from report_api import report_api  # Import the new report API blueprint

app = Flask(__name__, template_folder='../templates', static_folder='../static')
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

# Register the contact form API blueprint
app.register_blueprint(contact_api)

# Register the report form API blueprint
app.register_blueprint(report_api)

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)
