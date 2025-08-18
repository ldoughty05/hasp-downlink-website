echo "💠 Starting HASP Downlink Website backend..."
if systemctl is-active --quiet nginx; then
	echo "✅ nginx is running"
else 
	echo "nginx needs to restart"
	sudo systemctl restart nginx
	if systemctl is-active --quiet nginx; then
		echo "✅ nginx restarted successfully and is running"
    	else
        	echo "❌ Failed to restart nginx"
    	fi
fi

sudo systemctl restart hasp-downlink-website-backend
if systemctl is-active --quiet hasp-downlink-website-backend; then
	echo "✅ hasp-downlink-website-backend restarted successfully and is running"
   	else
       	echo "❌ Failed to restart hasp-downlink-website-backend"
   	fi