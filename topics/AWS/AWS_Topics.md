# AWS Topics - Detailed Guide

A comprehensive guide covering key AWS services and concepts for interview preparation.

---

## Table of Contents

1. [AWS Step Functions](#aws-step-functions)
2. [AWS Lambda](#aws-lambda)
3. [Amazon S3 (Simple Storage Service)](#amazon-s3-simple-storage-service)
4. [Amazon VPC (Virtual Private Cloud)](#amazon-vpc-virtual-private-cloud)
5. [Amazon Route 53](#amazon-route-53)
6. [Amazon CloudWatch](#amazon-cloudwatch)
7. [AWS IAM (Identity and Access Management)](#aws-iam-identity-and-access-management)

---

## AWS Step Functions

### What is Step Functions?

AWS Step Functions allows you to create workflows, also called **State machines**, to build distributed applications, automate processes, orchestrate microservices, and create data and machine learning pipelines.

### Key Concepts

**State Machines (Workflows)**
- Series of event-driven steps
- Each step is called a **state**
- Instances of running workflows are called **executions**

**Task State**
- Represents a unit of work
- Can call another AWS service or API
- Can use Activities (workers outside Step Functions)

### Features

- **Visual Workflow Editor**: Visualize, edit, and debug workflows in the console
- **State Inspection**: Examine each step to ensure proper execution
- **Service Integration**: Call AWS services like Lambda, Glue, etc.
- **Human Interaction**: Create long-running workflows requiring human input

### Use Cases

1. **Data Processing Pipelines**: ETL workflows with AWS Glue
2. **Microservices Orchestration**: Coordinate multiple services
3. **Machine Learning Pipelines**: Automate ML workflows
4. **IT Automation**: Automated operational tasks
5. **Human Approval Workflows**: Processes requiring manual intervention

### Example State Machine

```json
{
  "Comment": "A simple AWS Step Functions state machine",
  "StartAt": "ProcessData",
  "States": {
    "ProcessData": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:ProcessData",
      "Next": "ValidateData"
    },
    "ValidateData": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:ValidateData",
      "Next": "SaveData"
    },
    "SaveData": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:SaveData",
      "End": true
    }
  }
}
```

---

## AWS Lambda

### What is AWS Lambda?

AWS Lambda is a **serverless computing service** that runs code in response to events without requiring server management. It's a Function as a Service (FaaS) offering.

### Key Features

✔ **No Server Management**
- Run code without provisioning or managing servers
- No workload-aware cluster scaling logic needed
- No maintenance of event integrations or runtimes

✔ **Automatic Scaling**
- Automatically allocates compute execution power
- Runs code based on incoming requests or events
- Scales for any level of traffic

✔ **Flexible Deployment**
- Upload code as ZIP file or container image
- Supports multiple programming languages
- Pay only for compute time used

### AWS Lambda Integrations

Lambda can be integrated with various AWS services:

| Service | Use Case |
|---------|----------|
| **API Gateway** | Build RESTful APIs |
| **DynamoDB** | Process database events |
| **S3** | Process file uploads |
| **Step Functions** | Orchestrate workflows |
| **SNS** | Process notifications |
| **SQS** | Process queue messages |
| **CloudWatch Events** | Scheduled tasks |
| **Kinesis** | Process streaming data |

### Example Lambda Function

```javascript
// Node.js Lambda Function
exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  
  // Process the event
  const result = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Processing complete',
      input: event
    })
  };
  
  return result;
};
```

### Lambda Pricing

- **Free Tier**: 1 million requests per month
- **Compute Time**: Pay per 100ms of execution
- **Memory**: Pay based on allocated memory

---

## Amazon S3 (Simple Storage Service)

### What is Amazon S3?

Amazon S3 is a fundamental storage container feature that provides a secure and scalable repository for storing objects such as text data, images, audio, and video files over AWS Cloud.

### Key Components

#### Amazon S3 Bucket

**Definition**: Containers where data is stored in S3.

**Characteristics**:
- Each bucket has its own policies and configurations
- Bucket names must be **globally unique**
- Can be thought of as a parent folder
- Limit of 100 buckets per AWS account (can be increased)
- Must be configured with ACL (Access Control List)

#### Amazon S3 Objects

**Definition**: Fundamental entity type stored in AWS S3.

**Characteristics**:
- Store unlimited number of objects
- Maximum object size: **5TB**
- Each object consists of:
  - ✔ **Key**: Object name/path
  - ✔ **Version ID**: For versioning
  - ✔ **Value**: The actual data
  - ✔ **Metadata**: Additional information
  - ✔ **Sub resources**: ACLs, torrents
  - ✔ **Access control information**: Permissions
  - ✔ **Tags**: Key-value pairs for organization

### S3 Storage Classes

| Class | Use Case | Retrieval Time |
|-------|----------|----------------|
| S3 Standard | Frequently accessed | Immediate |
| S3 Intelligent-Tiering | Unknown access patterns | Immediate |
| S3 Standard-IA | Infrequent access | Immediate |
| S3 One Zone-IA | Infrequent, non-critical | Immediate |
| S3 Glacier | Archive, rarely accessed | Minutes to hours |
| S3 Glacier Deep Archive | Long-term archive | 12 hours |

### Example S3 Operations

```bash
# Create bucket
aws s3 mb s3://my-unique-bucket-name

# Upload file
aws s3 cp myfile.txt s3://my-unique-bucket-name/

# List objects
aws s3 ls s3://my-unique-bucket-name/

# Download file
aws s3 cp s3://my-unique-bucket-name/myfile.txt ./

# Sync directory
aws s3 sync ./local-folder s3://my-unique-bucket-name/remote-folder/
```

### S3 Security

- **Bucket Policies**: JSON-based access policies
- **ACLs**: Access Control Lists
- **Encryption**: Server-side and client-side
- **Versioning**: Keep multiple versions of objects
- **MFA Delete**: Require MFA for deletion

---

## Amazon VPC (Virtual Private Cloud)

### What is VPC?

Amazon VPC can be referred to as the **"private cloud inside the cloud"**. It is a logical grouping of servers in a specified network.

### Key Features

**Complete Isolation**
- Servers deployed in VPC are completely isolated from other AWS servers
- Full control over IP addresses
- Control over route tables and gateways
- Enhanced security with security groups and NACLs

**Network Control**
- Define IP address ranges
- Create subnets
- Configure route tables
- Set up internet gateways
- Configure NAT gateways

### VPC Components

| Component | Purpose |
|-----------|---------|
| **Subnets** | Divide VPC into smaller networks |
| **Route Tables** | Control traffic routing |
| **Internet Gateway** | Connect VPC to internet |
| **NAT Gateway** | Allow private subnet internet access |
| **Security Groups** | Instance-level firewall |
| **Network ACLs** | Subnet-level firewall |
| **VPC Peering** | Connect VPCs together |
| **VPN Connection** | Connect to on-premises network |

### Security Features

**Security Groups**
- Virtual firewalls for EC2 instances
- Control inbound and outbound traffic
- Stateful (return traffic automatically allowed)

**Network Access Control Lists (NACLs)**
- Subnet-level security
- Control traffic in and out of subnets
- Stateless (must explicitly allow return traffic)

### Example VPC Configuration

```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create public subnet
aws ec2 create-subnet \
  --vpc-id vpc-0123456789abcdef0 \
  --cidr-block 10.0.1.0/24 \
  --availability-zone us-east-1a

# Create private subnet
aws ec2 create-subnet \
  --vpc-id vpc-0123456789abcdef0 \
  --cidr-block 10.0.2.0/24 \
  --availability-zone us-east-1a

# Create internet gateway
aws ec2 create-internet-gateway

# Attach internet gateway to VPC
aws ec2 attach-internet-gateway \
  --vpc-id vpc-0123456789abcdef0 \
  --internet-gateway-id igw-0123456789abcdef0
```

---

## Amazon Route 53

### What is Amazon Route 53?

Amazon Route 53 is a highly available and scalable cloud **Domain Name System (DNS)** web service designed to route end users to internet applications.

### Key Features

**DNS Service**
- Translates human-readable names (www.google.com) into IP addresses (192.0.1.1)
- Highly available and scalable
- Low latency DNS resolution

**Important Note**: You **cannot** use Amazon Route 53 to connect your on-premises network with AWS Cloud (use VPN or Direct Connect instead).

### How Route 53 Works

#### 1. Domain Registration and Management

**Features**:
- Register new domain names
- Transfer existing domains to Route 53
- User-friendly interface for domain management
- Configure DNS settings:
  - Mail server setups (MX records)
  - Domain name aliases (CNAME records)
  - A records, AAAA records, etc.

#### 2. Global DNS Resolution

**Architecture**:
- Worldwide network of DNS servers
- Strategically placed around the globe
- Low latency DNS resolution
- High-performance routing

**Process**:
1. User enters domain name in browser
2. Request sent to Route 53 DNS servers
3. Route 53 returns matching IP address
4. User's browser connects to the IP address

#### 3. Traffic Routing and Load Balancing

**Routing Policies**:
- **Simple Routing**: Single resource
- **Weighted Routing**: Distribute traffic by percentages
- **Latency-Based Routing**: Route to lowest latency endpoint
- **Failover Routing**: Active-passive failover
- **Geolocation Routing**: Route based on user location
- **Geoproximity Routing**: Route based on resource location
- **Multi-Value Answer**: Return multiple IP addresses

**Load Balancing Capabilities**:
- Distribute traffic among multiple endpoints
- Support for EC2 instances
- Support for Elastic Load Balancers
- Support for external resources

### Example Route 53 Configuration

```bash
# Create hosted zone
aws route53 create-hosted-zone \
  --name example.com \
  --caller-reference 2024-01-01-001

# Create A record
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "www.example.com",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [{"Value": "192.0.2.1"}]
      }
    }]
  }'
```

---

## Amazon CloudWatch

### What is Amazon CloudWatch?

Amazon CloudWatch is a **monitoring and observability service** that enables users to collect and track metrics, monitor log files, set alarms, and automatically react to changes in AWS resources.

### Key Features

**Monitoring Capabilities**:
- Collect and track metrics
- Monitor log files
- Set alarms
- Automatically react to changes
- Gain operational insights

**What CloudWatch Monitors**:
- ✔ **Performance**: CPU, memory, disk I/O
- ✔ **Health**: Application and resource health
- ✔ **Resource Utilization**: Usage patterns and trends
- ✔ **Custom Metrics**: Application-specific metrics

### CloudWatch Components

#### 1. Metrics
- Data points about your resources
- Time-ordered set of data points
- Default and custom metrics

#### 2. Alarms
- Watch metrics and trigger actions
- Send notifications
- Auto-scale resources
- Stop/terminate instances

#### 3. Logs
- Collect and monitor log files
- Real-time monitoring
- Log retention and archival

#### 4. Dashboards
- Customizable views
- Visualize metrics
- Monitor multiple resources

#### 5. Events
- Respond to state changes
- Schedule automated actions
- Trigger Lambda functions

### Use Cases

1. **Application Monitoring**: Track application performance
2. **Resource Optimization**: Identify underutilized resources
3. **Troubleshooting**: Debug issues with detailed logs
4. **Automated Responses**: Auto-scale based on metrics
5. **Compliance**: Meet regulatory requirements

### Example CloudWatch Configuration

```bash
# Put custom metric
aws cloudwatch put-metric-data \
  --namespace MyApp \
  --metric-name PageViews \
  --value 100 \
  --timestamp 2024-01-01T12:00:00Z

# Create alarm
aws cloudwatch put-metric-alarm \
  --alarm-name HighCPUAlarm \
  --alarm-description "Alarm when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

---

## AWS IAM (Identity and Access Management)

### What is IAM?

AWS Identity and Access Management (IAM) manages AWS users and their access to AWS accounts and services. It controls the level of access users have over AWS accounts.

### Key Components

#### 1. Users
- Individual identities with credentials
- Can be assigned to groups
- Can have policies attached directly

#### 2. Groups
- Collections of users
- Simplify permission management
- Users inherit group permissions

#### 3. Roles
- Temporary access credentials
- Can be assumed by users or services
- No permanent credentials

#### 4. Policies
- JSON documents defining permissions
- Attached to users, groups, or roles
- Define what actions are allowed/denied

### Root Account

**Characteristics**:
- Created when signing up for AWS
- Has all administrative rights
- Access to all parts of the account
- Should be secured with MFA
- Should not be used for daily tasks

### New User Default State

- By default, new users have **no access** to any services
- Root account holder must grant permissions via IAM
- Follows principle of least privilege

### How IAM Works

1. **Authentication**: Verify user identity
2. **Authorization**: Check if user has permission
3. **Access Control**: Grant or deny access to resources

**Example Use Case**:
- Enable EC2 instance to access S3 buckets
- Grant fine-grained permissions
- No need to store credentials on instance

### IAM Policy Structure

#### Policy Elements

| Element | Description | Required |
|---------|-------------|----------|
| **Version** | Policy language version (use 2012-10-17) | Yes |
| **Statement** | Container for policy elements | Yes |
| **Sid** | Statement ID (optional identifier) | No |
| **Effect** | Allow or Deny | Yes |
| **Principal** | Who the policy applies to | Sometimes |
| **Action** | List of allowed/denied actions | Yes |
| **Resource** | Resources the actions apply to | Sometimes |
| **Condition** | Circumstances for granting permission | No |

### Example IAM Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "FirstStatement",
      "Effect": "Allow",
      "Action": ["iam:ChangePassword"],
      "Resource": "*"
    },
    {
      "Sid": "SecondStatement",
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "*"
    },
    {
      "Sid": "ThirdStatement",
      "Effect": "Allow",
      "Action": [
        "s3:List*",
        "s3:Get*"
      ],
      "Resource": [
        "arn:aws:s3:::amzn-s3-demo-bucket-confidential-data",
        "arn:aws:s3:::amzn-s3-demo-bucket-confidential-data/*"
      ],
      "Condition": {
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    }
  ]
}
```

### Policy Explanation

**First Statement**:
- Allows users to change their own password
- Applies to all resources (*)

**Second Statement**:
- Allows listing all S3 buckets
- Read-only operation

**Third Statement**:
- Allows List and Get operations on specific S3 bucket
- Requires MFA to be present
- More restrictive with specific resources

### IAM Best Practices

1. ✅ **Enable MFA** for root account and privileged users
2. ✅ **Use roles** for applications running on EC2
3. ✅ **Follow least privilege** principle
4. ✅ **Rotate credentials** regularly
5. ✅ **Use groups** to assign permissions
6. ✅ **Monitor activity** with CloudTrail
7. ✅ **Use policy conditions** for extra security
8. ✅ **Remove unnecessary credentials**

---

## Summary Table

| Service | Purpose | Key Feature |
|---------|---------|-------------|
| **Step Functions** | Workflow orchestration | Visual state machines |
| **Lambda** | Serverless compute | No server management |
| **S3** | Object storage | Unlimited scalability |
| **VPC** | Private network | Complete isolation |
| **Route 53** | DNS service | Global DNS resolution |
| **CloudWatch** | Monitoring | Metrics and alarms |
| **IAM** | Access management | Fine-grained permissions |

---

## Interview Tips

### Common Questions

1. **What is the difference between S3 and EBS?**
   - S3: Object storage, accessed via API
   - EBS: Block storage, attached to EC2 instances

2. **How does Lambda pricing work?**
   - Pay per request and compute time
   - Free tier: 1M requests/month

3. **What is the difference between Security Groups and NACLs?**
   - Security Groups: Stateful, instance-level
   - NACLs: Stateless, subnet-level

4. **What are IAM roles used for?**
   - Temporary credentials for services
   - No need to store long-term credentials

5. **How does Route 53 provide high availability?**
   - Global network of DNS servers
   - Multiple routing policies
   - Health checks and failover

---

**Master AWS! ☁️**