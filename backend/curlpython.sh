#!/bin/sh
# this thing just sends a request to a clore server running on localhost:3000 which runs python and responds with stdout
curl -X POST -H "Content-Type: application/json" -d "{\"source_b64\": \"$(cat $1 | base64 --wrap=0)\"}" 127.0.0.1:3000/run_python/
