#!/usr/bin/env bash
docker system prune
cd concierge-server
mvn clean package -DskipTests
cd ..
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up

