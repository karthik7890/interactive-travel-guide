from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import google.generativeai as palm
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load the environment variables
load_dotenv()
palm_api_key = os.environ.get("PALM_API_KEY")

# print(palm_api_key)
# Configure the generative AI service
palm.configure(api_key=palm_api_key)
model = palm.GenerativeModel(model_name="gemini-1.0-pro-latest")

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary():
    data = request.json
    print("data from the post call", data)
    source = data.get('source')
    destination = data.get('destination')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    no_of_day = data.get('numberOfDays')

    prompt = f"Generate a personalized trip itinerary for a {no_of_day}-day trip {source} to {destination} from {start_date} to {end_date}, with an optimum budget (Currency:INR)."
    response = model.generate_content(prompt)

    return({'itinerary': response.text})

if __name__ == '__main__':
    app.run(debug=True)