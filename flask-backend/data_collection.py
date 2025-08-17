import requests
import pandas as pd
import redis
import pickle
import os
from dotenv import load_dotenv

load_dotenv()
CACHE_KEY = os.getenv("REDIS_CACHE_KEY")
CACHE_TTL = 60 # seconds


def get_most_recent_file_url():
  payload1_display_url = "https://sg-webserver.phys.lsu.edu/payload-integration-data/?pname=pyld01"
  webpage_response = requests.get(payload1_display_url)
  most_recent_datetime = ""
  tokenized_response = webpage_response.text.splitlines()
  for line in tokenized_response:
    if "pyld01" in line:
      most_recent_file_url = line.strip()[13:-34] # TODO: fix this hardcoded index
  return most_recent_file_url


def get_log_file(file_url):
  logfile = requests.get(file_url)
  return logfile.text


def parse_all_256_readings(line):
  """
  Returns a list of all 256 readings from a line of text. Lines may or may not contain text at the end.
  """
  readings = line.split(" ")
  numbers = []
  # Filter out non-numeric tokens and stop at the first non-numeric token
  for token in readings: 
    if token.isnumeric():
      numbers.append(int(token))
    else:
      break # stop at the first non-numeric token (e.g. "Cell" or "Modules")

  if len(numbers) != 256:
    raise ValueError(f"Expected 256 readings, got {len(numbers)}")
  return numbers


def create_dictionary_from_text(packet_text):
  return {
  "muxcount": int(packet_text[0].split(" ")[1]),
  "status_byte": int(packet_text[1].split(":")[1]),
  "sample_time": int(packet_text[2].split(":")[1]),
  "curve_duration": int(packet_text[3].split(":")[1]),
  "sun_sensor_1": { # TODO: find out what these are
    "a": packet_text[6],
    "b": packet_text[7],
    "c": packet_text[8],
    "d": packet_text[9],
    "e": packet_text[10],
  },
  "sun_sensor_2": {
    "a": packet_text[13],
    "b": packet_text[14],
    "c": packet_text[15],
    "d": packet_text[16],
    "e": packet_text[17],
  },
  "imu": {
    "accel_x": float(packet_text[20].split(" ")[0]), # G's
    "accel_y": float(packet_text[21].split(" ")[0]),
    "accel_z": float(packet_text[22].split(" ")[0]),
    "gyro_x": float(packet_text[23].split(" ")[0]), # degrees per second
    "gyro_y": float(packet_text[24].split(" ")[0]),
    "gyro_z": float(packet_text[25].split(" ")[0]),
    "mag_x": float(packet_text[26].split(" ")[0]), # microteslas
    "mag_y": float(packet_text[27].split(" ")[0]),
    "mag_z": float(packet_text[28].split(" ")[0]),
    "temperature": float(packet_text[29].split(" ")[0]), # degrees Celsius
  },
  "temperature": {
    "sensor_1": float(packet_text[32]), # degrees Celsius
    "sensor_2": float(packet_text[33]),
    "sensor_3": float(packet_text[34]),
    "sensor_4": float(packet_text[35]),
    "sensor_5": float(packet_text[36]),
    "sensor_6": float(packet_text[37]),
  },
  "cell_1": {
    "voltage": parse_all_256_readings(packet_text[39]),
    "current": parse_all_256_readings(packet_text[40]),
  },
  "cell_2": {
    "voltage": parse_all_256_readings(packet_text[41]),
    "current": parse_all_256_readings(packet_text[42]),
  },
  "cell_3": {
    "voltage": parse_all_256_readings(packet_text[43]),
    "current": parse_all_256_readings(packet_text[44]),
  },
  "modules": {
    "voltage": parse_all_256_readings(packet_text[45]),
    "current": parse_all_256_readings(packet_text[46]), 
  },
}


def create_dataframe_from_log(logfile_text):
  PACKET_LENGTH = 47
  LENGTH_OF_JUNK_AT_START_OF_FILE = 1
  lines = logfile_text.splitlines()
  data = []
  for i in range(LENGTH_OF_JUNK_AT_START_OF_FILE, len(lines), PACKET_LENGTH): # starts at 1 since the first line is NULL, then goes in steps of 47 (lines between each new muxcount)
    packet_text = lines[i:i+PACKET_LENGTH]
    if len(packet_text) < PACKET_LENGTH:
      continue  # Skip incomplete packets
    packet_text = [line.strip() for line in packet_text]
    packet = create_dictionary_from_text(packet_text)
    data.append(packet)
  return pd.DataFrame(data)


def fetch_hasp_data(file_url=None):
  """
  Fetches the most recent HASP data, parses it, and returns a DataFrame.
  If no file_url is provided, it fetches the most recent file URL.
  """
  if file_url is None:
    file_url = get_most_recent_file_url()
  logfile_text = get_log_file(file_url)
  return create_dataframe_from_log(logfile_text)


def get_cached_data(redis_store, alternative_url=None):
  cached = redis_store.get(CACHE_KEY)
  if cached:
    print("Using cached DataFrame from Redis")
    df = pickle.loads(cached) # maybe store it here as json instead
  else:
    print("Expired. Fetching dataframe from HASP")
    df = fetch_hasp_data(alternative_url)
    redis_store.setex(CACHE_KEY, CACHE_TTL, pickle.dumps(df)) # expires oly value and sets new one.
  return df