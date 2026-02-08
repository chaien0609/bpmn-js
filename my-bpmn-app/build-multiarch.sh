#!/bin/bash
# Build and push multi-arch image
docker buildx build --platform linux/amd64,linux/arm64 -t chaien/my-bpmn:latest --push .
