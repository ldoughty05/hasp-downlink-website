from flask import Flask, jsonify, render_template
from datetime import datetime, timedelta
from data_collection import fetch_hasp_data, get_most_recent_file_url, get_log_file
import pandas as pd


app = Flask(__name__)

def get_data_frame():
  df = fetch_hasp_data("https://sg-webserver.phys.lsu.edu/HASP_data/2025/INT/pyld01_250730_125301.log")
  if df.empty:
    return jsonify({"error": "No data available"}), 404
  return df.sort_values(by='sample_time')

@app.route("/")
def index():
  LAUNCH_TIME = datetime(2025, 9, 5, 8, 45, 54) # September 5, 2025, 8:45:54 AM UTC # TODO: update this to the actual launch time
  time_since_launch = datetime.now() - LAUNCH_TIME

  return render_template("index.html")


@app.route("/data")
def data():
  df = get_data_frame()
  data = df.to_dict(orient='records') # Convert DataFrame to list of dictionaries for JSON serialization
  
  return jsonify(data)


@app.route("/data/vs-time/<dependent_variable>")
def get_json(dependent_variable):
  df = get_data_frame()
  if dependent_variable not in df.columns:
    return jsonify({"error": "Invalid dependent variable."}), 400

  data = df[['sample_time', dependent_variable]].to_dict(orient='records')
  
  return jsonify(data)


@app.route("/recent-log-url")
def recent_log_url():
  return get_most_recent_file_url()

@app.route("/recent-log-file")
def recent_log_file(): # TODO: this should be from in my own server, not the hasp webserver
  return get_log_file(get_most_recent_file_url())

