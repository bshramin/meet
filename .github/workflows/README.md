## Frontend
#### Github secrets needed
- `SSH_PRIVATE_KEY`
#### Github variables needed
- `EC2_FRONTEND_HOST`

## Backend
#### Github secrets needed
- `SSH_PRIVATE_KEY`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
#### Github variables needed
- `EC2_BACKEND_HOST`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_NAME`
- `AWS_REGION`
- `SOURCE_EMAIL`


## Terraform
#### Github secrets needed
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
#### Github variables needed
- `AWS_REGION`


## Contracts
#### Github secrets needed
- `TESTNET_RPC_URL` -> I just grabbed one from here https://chainlist.org/?chain=1&testnets=false&search=ethereum, can probably do better
- `TESTNET_PRIVATE_KEY` MetaMask -> Account details -> Show Private Key
- `TESTNET_ETHERSCAN_API_KEY`
- `MAINNET_RPC_URL`
- `MAINNET_PRIVATE_KEY`
- `ETHERSCAN_API_KEY`
