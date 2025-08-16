from flask import Flask, jsonify, render_template
from datetime import datetime, timedelta
from data_collection import fetch_hasp_data, get_most_recent_file_url, get_log_file
import pandas as pd
import random



app = Flask(__name__)

def get_data_frame():
  df = fetch_hasp_data("https://sg-webserver.phys.lsu.edu/HASP_data/2025/INT/pyld01_250730_125301.log")
  if df.empty:
    return jsonify({"error": "No data available"}), 404
  return df.sort_values(by='sample_time')

@app.route("/")
def home():
  LAUNCH_TIME = datetime(2025, 9, 5, 8, 45, 54) # September 5, 2025, 8:45:54 AM UTC # TODO: update this to the actual launch time
  time_since_launch = datetime.now() - LAUNCH_TIME
  human_readable_time_delta = str(time_since_launch)

  return render_template("home.html", time_since_launch=human_readable_time_delta)


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

@app.route("/graph/<int:graph_id>")
def graph_data(graph_id):
  # Example: Multi-series random data
  x = list(range(10))
  y1 = [random.randint(0,10) for _ in x]
  y2 = [random.randint(0,10) for _ in x]

  data = {
      "traces": [
          {"x": x, "y": y1, "mode": "lines", "name": "Series 1"},
          {"x": x, "y": y2, "mode": "lines", "name": "Series 2"}
      ],
      "layout": {"title": f"Graph {graph_id}"}
  }
  return jsonify(data)


@app.route("/recent-log-url")
def recent_log_url():
  return get_most_recent_file_url()

@app.route("/recent-log-file")
def recent_log_file(): # TODO: this should be from in my own server, not the hasp webserver
  return get_log_file(get_most_recent_file_url())

