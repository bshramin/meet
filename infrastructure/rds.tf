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
