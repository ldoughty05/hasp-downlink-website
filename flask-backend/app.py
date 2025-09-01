from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import redis
import pickle
from data_collection import get_cached_data, get_log_file_url_list, get_log_file

load_dotenv()
app = Flask(__name__)
CORS(app) # Allows all domains by default

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = int(os.getenv("REDIS_PORT"))
REDIS_DB = int(os.getenv("REDIS_DB"))

redis_store = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

def get_data_frame():
  df = get_cached_data(redis_store, None) # Gets most recent data file if nothing cached
  if df.empty or len(df) == 0:
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
  return get_log_file_url_list()[0]


@app.route("/recent-log-file")
def recent_log_file():
  return get_log_file(get_log_file_url_list()[0])

