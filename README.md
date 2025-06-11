# Tokenized Landscaping Maintenance Scheduling System

A blockchain-based system for managing landscaping services using Clarity smart contracts on the Stacks blockchain.

## Overview

This system provides a comprehensive solution for landscaping businesses and their clients, enabling:

- Verification of landscaping service providers
- Scheduling and tracking of maintenance services
- Resource allocation and management
- Quality monitoring and assessment
- Customer satisfaction tracking

The system uses non-fungible tokens (NFTs) to represent service agreements and leverages the security and transparency of blockchain technology.

## Smart Contracts

### 1. Landscaping Verification Contract

**File:** `contracts/landscaping-verification.clar`

This contract handles the verification of landscaping service providers:

- Registers and verifies landscaping companies
- Stores company details including name, license number
- Allows verification status to be checked and revoked
- Managed by an admin who can transfer admin rights

### 2. Maintenance Scheduling Contract

**File:** `contracts/maintenance-scheduling.clar`

This contract manages the scheduling of landscaping services:

- Creates maintenance schedules as NFTs owned by clients
- Tracks schedule details including property address, dates, and frequency
- Allows schedules to be canceled by clients
- Allows schedules to be marked as completed by providers
- Provides functions to query schedules by client or provider

### 3. Resource Allocation Contract

**File:** `contracts/resource-allocation.clar`

This contract handles the allocation of resources for landscaping services:

- Registers different types of resources
- Tracks resource inventory for each company
- Allocates resources to specific maintenance schedules
- Releases resources when no longer needed
- Provides functions to query resource availability

### 4. Quality Monitoring Contract

**File:** `contracts/quality-monitoring.clar`

This contract monitors the quality of landscaping services:

- Registers quality inspectors
- Records quality assessments for completed services
- Verifies assessments by admin
- Calculates provider ratings based on assessments
- Provides functions to query assessments and ratings

### 5. Customer Satisfaction Contract

**File:** `contracts/customer-satisfaction.clar`

This contract tracks customer satisfaction with landscaping services:

- Records customer feedback for completed services
- Calculates satisfaction scores for providers
- Provides functions to query feedback and satisfaction metrics
- Identifies top-rated providers

## Usage

### Prerequisites

- Clarity CLI or Clarinet for local development
- Stacks wallet for deployment and interaction

### Deployment

1. Deploy the contracts in the following order:
    - `landscaping-verification.clar`
    - `maintenance-scheduling.clar`
    - `resource-allocation.clar`
    - `quality-monitoring.clar`
    - `customer-satisfaction.clar`

2. Initialize the system by:
    - Setting up admin accounts
    - Registering initial resource types
    - Registering quality inspectors

### Workflow

1. **Company Verification**
    - Admin verifies landscaping companies
    - Companies can check their verification status

2. **Service Scheduling**
    - Clients create maintenance schedules with verified providers
    - Schedules are represented as NFTs owned by clients

3. **Resource Management**
    - Companies register their available resources
    - Resources are allocated to scheduled services

4. **Service Completion**
    - Providers mark services as completed
    - Resources are released back to the company's inventory

5. **Quality Assessment**
    - Inspectors assess the quality of completed services
    - Admin verifies the assessments

6. **Customer Feedback**
    - Clients provide feedback on completed services
    - System calculates satisfaction scores for providers

## Testing

Tests are written using Vitest and can be run with:

\`\`\`bash
npm test
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
