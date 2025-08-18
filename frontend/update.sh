echo "💠 Starting deployment for hasp-downlink-website React frontend..."
set -e
pushd ~/Git/hasp-downlink-website/frontend

echo "💠 Pulling latest changes from main branch..."
git pull origin main

echo "💠 Installing dependencies..."
npm install

echo "💠 Creating build..."
npm run build

if [ ! -d dist ] || [ ! -f dist/index.html ]; then
  echo "❌ Build failed — dist folder missing or incomplete"
  exit 1
fi

sudo cp -r dist/* /var/www/hasp-downlink-website/

echo "💠 Checking if frontend is live..."
if curl -sSf http://hasp.lukedoughty.me | grep -q "<title>"; then
  echo "✅ Frontend is up!"
else
  echo "❌ Frontend may be down!"
fi

echo "💠 $(date "+%Y-%m-%d %H:%M:%S.%3N") hasp-downlink-website React frontend updated" >> hasp-downlink-website-frontend_update.log
popd
echo "✅ hasp-downlink-website frontend updated and restarted successfully."
