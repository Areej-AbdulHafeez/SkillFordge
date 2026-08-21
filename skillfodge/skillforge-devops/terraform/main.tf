# SkillForge - Basic Terraform configuration (prototype infra)
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_network" "skillforge_net" {
  name = "skillforge-network"
}

resource "docker_image" "mongo" {
  name = "mongo:7"
}

resource "docker_container" "mongo" {
  name  = "skillforge-mongo"
  image = docker_image.mongo.image_id
  networks_advanced {
    name = docker_network.skillforge_net.name
  }
  ports {
    internal = 27017
    external = 27017
  }
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "development"
}

output "network_name" {
  value = docker_network.skillforge_net.name
}
