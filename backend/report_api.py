from flask import Blueprint, request, jsonify
import os
import json
from datetime import datetime

report_api = Blueprint('report_api', __name__)

@report_api.route('/api/report', methods=['POST'])
def report_issue():
    data = {
        "issue_type": request.form.get('issue_type'),
        "location": request.form.get('location'),
        "description": request.form.get('description'),
        "user_email": request.form.get('user_email'),
        "user_phone": request.form.get('user_phone'),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    file = request.files.get('photo')
    if file:
        file_path = os.path.join('../static/uploads', file.filename)
        file.save(file_path)
        data['file_path'] = file_path

    # Save the form data to a JSON file
    report_file = os.path.join('../backend/storage', 'reports.json')
    if not os.path.exists('../backend/storage'):
        os.makedirs('../backend/storage')

    with open(report_file, 'a') as f:
        json.dump(data, f)
        f.write('\n')

    return jsonify({'status': 'success', 'data': data}), 201
