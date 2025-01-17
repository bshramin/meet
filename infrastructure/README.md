### Create `keys/github-deploy.pub`
```
cd keys
ssh-keygen -t rsa -b 4096 -f github-deploy -C "github-actions"
```
Copy the content of `keys/github-deploy` to GitHub secrets.


### SSH tunnel to connect to RDS from your local machine through an EC2 instance
```
ssh -N -L 5432:meet-postgres-db.xxxxxxxxxxxx.region.rds.amazonaws.com:5432 ec2-user@your-ec2-ip
```
