#!/bin/bash
# SkillForge - Project setup script
set -e

echo "== SkillForge setup =="

echo "Creating required directories..."
mkdir -p logs uploads

echo "Installing frontend dependencies..."
npm install

echo "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
  echo "Docker not found. Please install Docker first."
  exit 1
fi

echo "Building and starting services..."
docker compose up --build -d

echo "Waiting for services to become healthy..."
sleep 5

echo "Project status:"
docker compose ps

echo "== Setup complete. Frontend running at http://localhost:3000 =="
