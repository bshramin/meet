terraform {
  backend "s3" {
    bucket  = "amin-meet-app--terraform-state-bucket"
    key     = "state/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
    # dynamodb_table = "terraform-lock-table"
  }
}

