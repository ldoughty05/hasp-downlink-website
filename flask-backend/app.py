from flask import Flask, jsonify
from flask_cors import CORS

from data_collection import fetch_hasp_data, get_most_recent_file_url, get_log_file


app = Flask(__name__)
CORS(app) # Allows all domains by default

def get_data_frame():
  df = fetch_hasp_data("https://sg-webserver.phys.lsu.edu/HASP_data/2025/INT/pyld01_250730_125301.log")
  if df.empty:
    return jsonify({"error": "No data available"}), 404
  return df.sort_values(by='sample_time')

@app.route("/")
def home():
  return "This is the UNL HASP downlink API. (That's a lot of acronyms!)"


@app.route("/data")
def data():
  df = get_data_frame()
  data = df.to_dict(orient='records') # Convert DataFrame to list of dictionaries for JSON serialization
  
  return jsonify(data)

@app.route("/recent-log-url")
def recent_log_url():
  return get_most_recent_file_url()

@app.route("/recent-log-file")
def recent_log_file(): # TODO: this should be from in my own server, not the hasp webserver
  return get_log_file(get_most_recent_file_url())

