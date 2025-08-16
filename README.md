# hasp-downlink-website
Simple flask website to view the data being recorded by UNL's HASP 2025 payload interpreted and graphed in real time.

# Installation
Clone the repository
```{bash}
git clone git@github.com:ldoughty05/hasp-downlink-website.git
cd hasp-downlink-website
```

Setup Flask Backend
```{bash}
cd flask-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask --app app run
```

Setup React Frontend
```{bash}
cd frontend
npm install
npm run dev
```
