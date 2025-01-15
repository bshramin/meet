terraform {
  backend "s3" {
    bucket         = "amin-meet-app-state-bucket"
    key            = "state/terraform.tfstate" # Replace with your desired path
    region         = "us-east-1"               # Match the region of your bucket
    encrypt        = true
    dynamodb_table = "terraform-lock-table"
  }
}


resource "aws_s3_bucket" "terraform_state" {
  bucket = "amin-meet-app-state-bucket"

  tags = {
    Name = "Terraform State Bucket"
  }
}

resource "aws_s3_bucket_versioning" "terraform_state_bucket_versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "example" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_lock" {
  name         = "terraform-lock-table"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "Terraform Lock Table"
  }
}
