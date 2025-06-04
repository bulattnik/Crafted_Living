from flask import Flask, request, jsonify, render_template
from database import save_application
import os

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/submit_application', methods=['POST'])
def submit_application():
    try:
        data = request.form
        
        # Extract form data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        project_type = data.get('project_type')
        message = data.get('message')
        
        # Validate required fields
        if not all([name, email, phone, project_type]):
            return jsonify({
                'success': False,
                'message': 'Пожалуйста, заполните все обязательные поля'
            }), 400
        
        # Save to database
        application_id = save_application(name, email, phone, project_type, message)
        
        return jsonify({
            'success': True,
            'message': 'Заявка успешно отправлена!',
            'application_id': application_id
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Произошла ошибка при отправке заявки'
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 