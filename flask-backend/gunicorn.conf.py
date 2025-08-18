bind = "unix:/home/pi/Git/hasp-downlink-website/flask-backend/hasp-downlink-website-backend.sock"

workers = 2
threads = 1
timeout = 120
proc_name = "haspdownlinkwebsitebackend"

# Access log - records incoming HTTP requests
accesslog = "/home/pi/Git/hasp-downlink-website/flask-backend/logs/gunicorn-haspdownlinkbackend.access.log"
# Error log - records Gunicorn server goings-on
errorlog = "/home/pi/Git/hasp-downlink-website/flask-backend/logs/gunicorn-haspdownlinkbackend.error.log"
capture_output = True
# How verbose the Gunicorn error logs should be
loglevel = "info"

pidfile = "gunicorn.pid"
