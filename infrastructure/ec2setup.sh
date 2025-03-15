#!/bin/bash

# Update system
yum update -y

# Install Git
yum install -y git

# Install Docker
yum install -y docker

# Start and enable Docker service
systemctl start docker
systemctl enable docker

# Add ec2-user to docker group to run docker without sudo
usermod -aG docker ec2-user

# Install PostgreSQL client only
yum install -y postgresql15

# Verify installations
echo "Checking installed versions:"
docker --version
psql --version
git --version
