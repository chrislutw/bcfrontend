#!/bin/bash

sudo docker login -u _json_key -p "$(cat /home/h5user/CAM_Block/keyfile-Block.json)" https://gcr.io
sudo docker build -t gcr.io/winbet-blockchain/bc-frontend:$1 .
sudo docker push gcr.io/winbet-blockchain/bc-frontend:$1
