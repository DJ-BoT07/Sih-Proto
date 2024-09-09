import numpy as np
from datetime import datetime, timedelta

class LoadForecastModel:
    def __init__(self):
        pass

    def _predict(self, inputs):
        # Simple prediction function
        return np.sum(inputs) * 1000

    def generate_current_load_data(self, date, area):
        area_factors = {
            "BSES Rajdhani Power Limited": 1.1,
            "BSES Yamuna Power Limited": 1.0,
            "Tata Power Delhi Distribution Limited": 1.2,
            "New Delhi Municipal Council": 0.9
        }
        area_factor = area_factors.get(area, 1.0)
        
        hours = range(24)
        data = []
        for hour in hours:
            dayProgress = hour / 24
            temperature = 20 + 10 * np.sin((hour - 5) * np.pi / 12)
            population = 1000 + date.weekday() * 10
            weekdayFactor = 1.1 if date.weekday() < 5 else 0.9
            
            input_data = np.array([hour, dayProgress, temperature, population, weekdayFactor * area_factor])
            load = self._predict(input_data)
            
            solar_generation = max(0, 2000 * np.sin((hour - 6) * np.pi / 12))
            
            data.append({
                'time': f'{hour:02d}:00',
                'load': max(0, round(load)),
                'solarGeneration': round(solar_generation),
                'netLoad': max(0, round(load - solar_generation))
            })
        
        return data

    def generate_short_term_forecast(self, date, area):
        area_factors = {
            "BSES Rajdhani Power Limited": 1.1,
            "BSES Yamuna Power Limited": 1.0,
            "Tata Power Delhi Distribution Limited": 1.2,
            "New Delhi Municipal Council": 0.9
        }
        area_factor = area_factors.get(area, 1.0)
        
        days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data = []
        for i in range(7):
            current_date = date + timedelta(days=i)
            weekdayFactor = 1.1 if current_date.weekday() < 5 else 0.9
            temperature = 20 + 10 * np.sin((i - 2) * np.pi / 3.5)
            population = 1000 + i * 5
            
            input_data = np.array([i, weekdayFactor, temperature, population, area_factor])
            forecast = self._predict(input_data)
            actual = forecast * (1 + (np.sin(i) * 0.05))
            
            data.append({
                'day': days[current_date.weekday()],
                'forecast': round(forecast),
                'actual': round(actual),
                'temperature': round(temperature)
            })
        
        return data

    def generate_long_term_forecast(self, date, area):
        area_factors = {
            "BSES Rajdhani Power Limited": 1.1,
            "BSES Yamuna Power Limited": 1.0,
            "Tata Power Delhi Distribution Limited": 1.2,
            "New Delhi Municipal Council": 0.9
        }
        area_factor = area_factors.get(area, 1.0)
        
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        data = []
        for i in range(12):
            current_date = date.replace(month=((date.month - 1 + i) % 12) + 1)
            seasonalFactor = 1 + 0.2 * np.sin((i - 3) * np.pi / 6)
            yearlyGrowthFactor = 1 + (0.03 * (i / 12))
            temperature = 20 + 15 * np.sin((i - 5) * np.pi / 6)
            population = 1000 + i * 10
            
            input_data = np.array([i, seasonalFactor, temperature, population, area_factor])
            forecast = self._predict(input_data) * yearlyGrowthFactor
            areaDevelopment = (2 + i * 0.1) * (1 + (0.05 * np.sin(i * np.pi / 6)))
            
            data.append({
                'month': months[current_date.month - 1],
                'forecast': round(forecast),
                'areaDevelopment': round(areaDevelopment, 2)
            })
        
        return data