#!/bin/bash
set -e

echo "Downloading assets..."

# Create directories
mkdir -p vendor/bpmn-js/dist/assets/bpmn-font/css
mkdir -p vendor/bpmn-js/dist/assets/bpmn-font/font
mkdir -p vendor/font-awesome/css
mkdir -p vendor/font-awesome/fonts

# BPMN JS
curl -L -o vendor/bpmn-js/dist/bpmn-modeler.development.js https://unpkg.com/bpmn-js@18.12.0/dist/bpmn-modeler.development.js
curl -L -o vendor/bpmn-js/dist/assets/bpmn-js.css https://unpkg.com/bpmn-js@18.12.0/dist/assets/bpmn-js.css
curl -L -o vendor/bpmn-js/dist/assets/diagram-js.css https://unpkg.com/bpmn-js@18.12.0/dist/assets/diagram-js.css
curl -L -o vendor/bpmn-js/dist/assets/bpmn-font/css/bpmn.css https://unpkg.com/bpmn-js@18.12.0/dist/assets/bpmn-font/css/bpmn.css
curl -L -o vendor/bpmn-js/dist/assets/bpmn-font/font/bpmn.woff https://unpkg.com/bpmn-js@18.12.0/dist/assets/bpmn-font/font/bpmn.woff

# Font Awesome
curl -L -o vendor/font-awesome/css/font-awesome.min.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
curl -L -o vendor/font-awesome/fonts/fontawesome-webfont.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2

echo "Download complete."
