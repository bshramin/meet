output "db_password" {
  value     = random_password.db_password.result
  sensitive = true # Ensures the password doesn't appear in logs
}

# output "expressjs_public_ip" {
#   value = aws_instance.expressjs.public_ip
# }

# output "nextjs_public_ip" {
#   value = aws_instance.nextjs.public_ip
# }

output "joint_pubic_ip" {
  value = aws_instance.meet_joint.public_ip
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "rds_username" {
  value = aws_db_instance.postgres.username
}

output "rds_db_name" {
  value = aws_db_instance.postgres.db_name
}
