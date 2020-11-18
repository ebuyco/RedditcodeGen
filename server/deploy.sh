#!/bin/bash

echo What should the version be?
read VERSION

docker build -t ernie/lireddit:$VERSION .
docker push ernie/lireddit:$VERSION
ssh root@64.227.13.208 "docker pull ernie/lireddit:$VERSION && docker tag ernie/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"