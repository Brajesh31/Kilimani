from flask import Blueprint, request, jsonify
import os
import json

contact_api = Blueprint('contact_api', __name__)

@contact_api.route('/submit-contact', methods=['POST'])
def submit_contact():
    try:
        data = request.form.to_dict()
        contact_data_path = 'backend/storage/contact_data.json'
        
        # Ensure the file exists
        if not os.path.exists(contact_data_path):
            with open(contact_data_path, 'w') as f:
                json.dump([], f)
        
        # Read existing data
        with open(contact_data_path, 'r') as f:
            contact_data = json.load(f)
        
        # Generate new ID
        new_id = len(contact_data) + 1
        
        # Add new contact entry
        new_contact = {
            'id': new_id,
            'received': True,
            'being_reviewed': False,
            'reviewed': False,
            'message': data.get('message')  # Save the message
        }
        contact_data.append(new_contact)
        
        # Save updated data
        with open(contact_data_path, 'w') as f:
            json.dump(contact_data, f)
        
        # Return the submission ID in the response
        return jsonify({'message': f'Contact form submitted successfully! Your submission ID is {new_id}', 'submissionId': new_id})
    except Exception as e:
        print(f"Error in submit_contact: {e}")
        return jsonify({'message': 'Failed to submit contact form.'}), 500

@contact_api.route('/contact-data', methods=['GET'])
def get_contact_data():
    try:
        contact_data_path = 'backend/storage/contact_data.json'
        if not os.path.exists(contact_data_path):
            return jsonify([])
        
        with open(contact_data_path, 'r') as f:
            contact_data = json.load(f)
        
        return jsonify(contact_data)
    except Exception as e:
        print(f"Error in get_contact_data: {e}")
        return jsonify([]), 500


