#!/bin/sh

# Replace ${PORT} with the actual port from environment variable
sed -i 's/${PORT}/'"$PORT"'/g' /etc/nginx/conf.d/default.conf

# Start nginx normally after configuration update
exec nginx -g 'daemon off;'