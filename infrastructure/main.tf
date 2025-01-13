
# Use default VPC and its subnets
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

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

# Security group for RDS
resource "aws_security_group" "rds" {
  name        = "rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web_server.id]
  }

  tags = {
    Name = "rds-sg"
  }
}

# EC2 instance for Express.js
resource "aws_instance" "expressjs" {
  ami           = "ami-0f403e3180720dd7e" # Amazon Linux 2023 AMI ID
  instance_type = "t2.micro"              # Free tier eligible

  subnet_id                   = data.aws_subnets.default.ids[0]
  vpc_security_group_ids      = [aws_security_group.web_server.id]
  associate_public_ip_address = true

  tags = {
    Name = "meet-expressjs-server"
  }
}

# EC2 instance for Next.js
resource "aws_instance" "nextjs" {
  ami           = "ami-0f403e3180720dd7e" # Amazon Linux 2023 AMI ID
  instance_type = "t2.micro"              # Free tier eligible

  subnet_id                   = data.aws_subnets.default.ids[0]
  vpc_security_group_ids      = [aws_security_group.web_server.id]
  associate_public_ip_address = true

  tags = {
    Name = "meet-nextjs-server"
  }
}

# RDS instance
resource "aws_db_instance" "postgres" {
  identifier        = "my-postgres-db"
  engine            = "postgres"
  engine_version    = "17.2"
  instance_class    = "db.t3.micro" # Free tier eligible
  allocated_storage = 5             # Free tier eligible up to 20GB
  storage_type      = "gp2"

  db_name  = "meetdb"
  username = "dbadmin"
  password = random_password.db_password.result

  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  skip_final_snapshot    = true

  # Free tier settings
  multi_az          = false
  storage_encrypted = false

  tags = {
    Name = "meetdb"
  }
}

