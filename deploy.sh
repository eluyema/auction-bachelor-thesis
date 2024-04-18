#!/bin/bash

# Define variables
USER="frontend"
DOMAIN="online-auction.com.ua"
EMAIL="elluyema@gmail.com" # Used for Let's Encrypt registration, replace with your email
LETSENCRYPT_DIR="/home/$USER/letsencrypt" # New directory for Let's Encrypt data
CERT_PATH="$LETSENCRYPT_DIR/live/$DOMAIN/fullchain.pem"
KEY_PATH="$LETSENCRYPT_DIR/live/$DOMAIN/privkey.pem"

echo "Stop existing container..."
docker stop frontend
docker rm frontend

echo "Checking for SSL certificates for $DOMAIN..."

# Check if the SSL certificate already exists
if [ ! -f "$CERT_PATH" ]; then
    echo "Certificates not found, obtaining them..."
    docker run -it --rm \
        --privileged \
        -v "$LETSENCRYPT_DIR:/etc/letsencrypt" \
        -v "$LETSENCRYPT_DIR/lib:/var/lib/letsencrypt" \
        -p 80:80 \
        certbot/certbot certonly \
        --standalone \
        --preferred-challenges http \
        -d $DOMAIN \
        --agree-tos \
        -m $EMAIL \
        --non-interactive
else
    echo "Certificates found, proceeding..."
fi

docker image rm hdanylo/auction-frontend

echo "Pulling the latest image..."
docker pull hdanylo/auction-frontend

echo "Starting the frontend container with SSL support..."
docker run -p 80:80 -p 443:443 --name frontend \
    -v "$LETSENCRYPT_DIR:/etc/letsencrypt:ro" \
    -d hdanylo/auction-frontend

echo "Deployment finished!"
