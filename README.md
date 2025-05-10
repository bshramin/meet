# Meet

This is my pet project to practice receiving Ethereum payments using a smart contract. It involves developing the frontend, backend, infrastructure, and the smart contract itself. The project is fully deployed with automated pipelines for:
- Planning, creating, and destroying infrastructure using Terraform.
- Deploying the Next.js frontend, which utilizes Next.js server APIs.
- Deploying the Express.js backend and applying migrations on the RDS instance.
- Deploying the smart contract on the Ethereum network.
- Using LLMs to generate dynamic onboarding documents tailored to the user's situation.
- Sending transactional emails using nodemailer.


## Project Structure

The project is organized into several key components:

### Backend

- **Language/Framework**: Express, Sequelize, HuggingFace inference client, nodemailer, etc.
- **Key Files**:
  - `app.js`: The main application file.
  - `Dockerfile`: Used for containerizing the backend application.
  - `package.json`: Lists dependencies and scripts for the backend.
- **Directories**:
  - `models/`: Contains database models.
  - `routes/`: Defines API routes.
  - `config/`: Configuration files for the application.
  - `migrations/` and `seeders/`: For database migrations and seeding.
- **Usage of LLMs**:
  - The HuggingFace inference client generates tutorials for users in different countries, considering the availability of different exchanges.

### Frontend

- **Language/Framework**: Next.js
- **Key Files**:
  - `Dockerfile`: Used for containerizing the frontend application.
  - `package.json`: Lists dependencies and scripts for the frontend.
  - `next.config.ts`: Configuration for Next.js.
- **Directories**:
  - `app/`: Main application source code.
  - `public/`: Static files.

### Infrastructure

- **Tools**: Terraform for infrastructure as code, Docker, AWS EC2, and RDS.
- **Key Files**:
  - `ec2.tf`, `rds.tf`: Terraform configuration for AWS resources.
  - `ec2setup.sh`: Script for setting up EC2 instances.
  - `provider.tf`: Specifies the provider configuration.

### Smart Contract

- **Tools**: Solidity, Foundry, Etherscan for verification.
- **Key Files**:
  - `src/`: Contains smart contract source files.
  - `test/`: Contract test files.


### GitHub Actions, Secrets, Env vars
- **Workflows**:
  - `deploy-infra.yml`: Terraform workflow for infrastructure deployment.
  - `deploy-backend.yml`: Backend deployment workflow.
  - `deploy-frontend.yml`: Frontend deployment workflow.
  - `deploy-contract.yml`: Smart contract deployment workflow.

### Domain and DNS
- **Domain Registration**: NameCheap for domain registration and management.
- **DNS and SSL**: CloudFlare for DNS management and SSL certificates.
- **Key Features**:
  - Free SSL certificates through CloudFlare.
  - DDoS protection.
