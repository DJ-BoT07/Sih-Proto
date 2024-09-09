from flask import Flask, request, jsonify
from flask_cors import CORS
from models.load_forecast_model import LoadForecastModel
from datetime import datetime

app = Flask(__name__)
CORS(app)

model = LoadForecastModel()

@app.route('/api/forecast', methods=['POST'])
def forecast():
    data = request.json
    forecast_type = data['type']
    date = datetime.strptime(data['date'], '%Y-%m-%d')
    area = data['area']
    
    if forecast_type == 'current':
        result = model.generate_current_load_data(date, area)
    elif forecast_type == 'short_term':
        result = model.generate_short_term_forecast(date, area)
    elif forecast_type == 'long_term':
        result = model.generate_long_term_forecast(date, area)
    else:
        return jsonify({'error': 'Invalid forecast type'}), 400

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)