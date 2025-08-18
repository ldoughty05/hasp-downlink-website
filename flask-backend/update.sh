echo "💠 Starting deployment to HASP Downlink Website backend..."
set -e
pushd ~/Git/hasp-downlink-website/flask-backend
source venv/bin/activate

echo "💠 Pulling latest changes from main branch..."
git pull origin main

echo "💠 Installing dependencies..."
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet

echo "💠 Checking if services are running..."
bash run.sh

echo "💠 $(date "+%Y-%m-%d %H:%M:%S.%3N") HASP Downlink Website backend updated" >> hasp-downlink-website-backend_update.log
popd
echo "✅ HASP Downlink Website backend updated and restarted successfully."
