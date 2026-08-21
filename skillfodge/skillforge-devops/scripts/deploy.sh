#!/bin/bash
# SkillForge - Deployment script (Kubernetes)
set -e

echo "== Deploying SkillForge to Kubernetes =="

kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/python-service-deployment.yaml

echo "Deployment status:"
kubectl get deployments
kubectl get services

echo "== Deploy complete =="
