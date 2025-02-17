# Security group for EC2 instances
resource "aws_security_group" "web_server" {
  name        = "web-server-sg"
  description = "Security group for web servers"
  vpc_id      = data.aws_vpc.default.id
  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Egress, allow all traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "web-server-sg"
  }
}

# Create SSH key pair
resource "aws_key_pair" "deploy_key" {
  key_name   = "github-actions-deploy-key"
  public_key = file("${path.module}/keys/github-deploy.pub")
}

# Elastic IP for Express.js instance
resource "aws_eip" "expressjs" {
  instance = aws_instance.expressjs.id
  domain   = "vpc"
  tags = {
    Name = "meet-expressjs-eip"
  }
}

# Elastic IP for Next.js instance
resource "aws_eip" "nextjs" {
  instance = aws_instance.nextjs.id
  domain   = "vpc"
  tags = {
    Name = "meet-nextjs-eip"
  }
}

# EC2 instance for Express.js
resource "aws_instance" "expressjs" {
  ami                    = "ami-0f403e3180720dd7e" # Amazon Linux 2023 AMI ID
  instance_type          = "t2.micro"              # Free tier eligible
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.web_server.id]
  key_name               = aws_key_pair.deploy_key.key_name
  tags = {
    Name = "meet-expressjs-server"
  }
  user_data = templatefile("${path.module}/ec2setup.sh", {
    # app_name     = "express-app"
    # node_version = "18"
  })
}

// TODO: For better scalability and SSL, consider:
// Using Elastic Load Balancer to manage traffic.
# EC2 instance for Next.js
resource "aws_instance" "nextjs" {
  ami                    = "ami-0f403e3180720dd7e" # Amazon Linux 2023 AMI ID
  instance_type          = "t2.micro"              # Free tier eligible
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.web_server.id]
  key_name               = aws_key_pair.deploy_key.key_name
  tags = {
    Name = "meet-nextjs-server"
  }
  user_data = templatefile("${path.module}/ec2setup.sh", {
    # app_name     = "express-app"
    # node_version = "18"
  })
}
