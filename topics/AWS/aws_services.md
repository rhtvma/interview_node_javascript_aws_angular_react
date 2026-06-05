# AWS Services - Complete Guide

A comprehensive overview of Amazon Web Services (AWS) and its main service categories.

---

## Table of Contents

1. [Main Service Categories](#main-service-categories)
2. [Compute Services](#compute-services)
3. [Storage Services](#storage-services)
4. [Networking](#networking)
5. [Security and Identity](#security-and-identity)
6. [Management and Monitoring](#management-and-monitoring)
7. [Database Services](#database-services)
8. [Developer Tools](#developer-tools)
9. [Analytics and Big Data](#analytics-and-big-data)
10. [Machine Learning and AI](#machine-learning-and-ai)
11. [Serverless and Application Services](#serverless-and-application-services)
12. [Detailed Service Descriptions](#detailed-service-descriptions)

---

## Main Service Categories

### 1. Compute Services
- **Amazon EC2 (Elastic Compute Cloud)**: Virtual servers for scalable compute capacity
- **AWS Lambda**: Serverless computing for code execution without server management

### 2. Storage Services
- **Amazon S3 (Simple Storage Service)**: Object storage for secure and scalable data storage
- **Amazon EBS (Elastic Block Store)**: Persistent block storage for EC2 instances
- **Amazon RDS (Relational Database Service)**: Managed relational databases

### 3. Networking
- **Amazon VPC (Virtual Private Cloud)**: Isolated network environments within AWS
- **Amazon Route 53**: Scalable domain name system (DNS) for routing traffic
- **Amazon CloudFront**: Content delivery network (CDN) for global content distribution

### 4. Security and Identity
- **AWS Identity and Access Management (IAM)**: Control access to AWS resources
- **Amazon Inspector**: Security assessment service for enhancing application security

### 5. Management and Monitoring
- **AWS CloudWatch**: Monitor resources and applications, gather and track metrics
- **AWS CloudFormation**: Infrastructure as code for managing resources

### 6. Database Services
- **Amazon DynamoDB**: Managed NoSQL database
- **Amazon Redshift**: Data warehousing for analytics
- **Amazon Aurora**: High-performance managed relational database

### 7. Developer Tools
- **AWS CodePipeline**: CI/CD service for continuous integration and delivery
- **AWS CodeCommit**: Source code version control

### 8. Analytics and Big Data
- **Amazon EMR (Elastic MapReduce)**: Managed big data processing framework
- **Amazon Athena**: Interactive query service for analyzing data in Amazon S3
- **Amazon Kinesis**: Platform for processing real-time streaming data

### 9. Machine Learning and AI
- **Amazon SageMaker**: Managed machine learning service
- **Amazon Rekognition**: Image and video analysis
- **Amazon Polly**: Text-to-speech service

### 10. Serverless and Application Services
- **Amazon API Gateway**: Managed service for creating and publishing APIs
- **AWS Step Functions**: Coordinate multiple AWS services into serverless workflows

---

## Compute Services

### Amazon EC2 (Elastic Compute Cloud)

**What is EC2?**
Amazon EC2 provides scalable computing power via the cloud, allowing users to run applications and manage workloads remotely.

**Key Features:**
- Virtual servers (instances) in the cloud
- Multiple instance types for different workloads
- Pay-as-you-go pricing
- Auto-scaling capabilities
- Integration with other AWS services

**Use Cases:**
- Web application hosting
- Development and test environments
- High-performance computing
- Machine learning training
- Batch processing

**Example Configuration:**
```bash
# Launch an EC2 instance using AWS CLI
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t2.micro \
  --key-name MyKeyPair \
  --security-group-ids sg-0123456789abcdef0 \
  --subnet-id subnet-0123456789abcdef0
```

---

### AWS Lambda

**What is Lambda?**
AWS Lambda is a serverless computing service that runs code in response to events without requiring server management. It's a Function as a Service (FaaS) offering.

**Key Features:**
- No server management required
- Automatic scaling
- Pay only for compute time used
- Event-driven execution
- Supports multiple programming languages

**Benefits:**
- Focus completely on code logic
- Automatic infrastructure management
- Cost-effective for variable workloads
- Built-in fault tolerance

**Supported Languages:**
- Node.js
- Python
- Java
- Go
- Ruby
- .NET Core
- Custom runtimes

**Example Lambda Function (Node.js):**
```javascript
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event));
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      input: event
    })
  };
  
  return response;
};
```

**Lambda Integrations:**
- API Gateway
- DynamoDB
- S3
- Step Functions
- SNS
- SQS
- CloudWatch Events

---

## Storage Services

### Amazon S3 (Simple Storage Service)

**What is S3?**
Amazon S3 offers scalable object storage with high durability for storing and retrieving any amount of data.

**Key Features:**
- 99.999999999% (11 9's) durability
- Unlimited storage capacity
- Object size up to 5TB
- Versioning support
- Lifecycle policies
- Access control and encryption

**Storage Classes:**
- **S3 Standard**: Frequently accessed data
- **S3 Intelligent-Tiering**: Automatic cost optimization
- **S3 Standard-IA**: Infrequently accessed data
- **S3 One Zone-IA**: Lower-cost infrequent access
- **S3 Glacier**: Long-term archive
- **S3 Glacier Deep Archive**: Lowest-cost archive

**Use Cases:**
- Backup and restore
- Data archiving
- Static website hosting
- Big data analytics
- Content distribution

**Example S3 Operations:**
```bash
# Upload file to S3
aws s3 cp myfile.txt s3://my-bucket/

# List bucket contents
aws s3 ls s3://my-bucket/

# Download file from S3
aws s3 cp s3://my-bucket/myfile.txt ./
```

---

### Amazon RDS (Relational Database Service)

**What is RDS?**
Amazon RDS simplifies the management of relational databases, providing high availability and automated backups in the cloud.

**Supported Database Engines:**
- MySQL
- PostgreSQL
- MariaDB
- Oracle
- SQL Server
- Amazon Aurora

**Key Features:**
- Automated backups
- Multi-AZ deployments for high availability
- Read replicas for scalability
- Automatic software patching
- Monitoring and metrics

**Use Cases:**
- Web and mobile applications
- E-commerce platforms
- Enterprise applications
- Gaming applications

---

## Networking

### Amazon VPC (Virtual Private Cloud)

**What is VPC?**
Amazon VPC enables users to create isolated networks within the AWS cloud with complete control over IP addresses, subnets, route tables, and gateways.

**Key Components:**
- **Subnets**: Segments of VPC IP address range
- **Route Tables**: Control traffic routing
- **Internet Gateway**: Connect VPC to internet
- **NAT Gateway**: Allow private subnet internet access
- **Security Groups**: Virtual firewalls for instances
- **Network ACLs**: Subnet-level security

**Benefits:**
- Complete network isolation
- Customizable IP address ranges
- Multiple layers of security
- Hybrid cloud connectivity
- Fine-grained access control

**Use Cases:**
- Hosting multi-tier applications
- Extending on-premises network to cloud
- Disaster recovery
- Secure application hosting

**Example VPC Configuration:**
```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create subnet
aws ec2 create-subnet \
  --vpc-id vpc-0123456789abcdef0 \
  --cidr-block 10.0.1.0/24
```

---

### Amazon Route 53

**What is Route 53?**
Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service designed to route end users to internet applications.

**Key Features:**
- Domain registration
- DNS routing
- Health checking
- Traffic management
- Multiple routing policies

**Routing Policies:**
- Simple routing
- Weighted routing
- Latency-based routing
- Failover routing
- Geolocation routing
- Geoproximity routing

**Use Cases:**
- Domain name management
- Traffic routing
- Health monitoring
- Disaster recovery
- Load distribution

---

## Security and Identity

### AWS IAM (Identity and Access Management)

**What is IAM?**
IAM manages AWS users and their access to AWS accounts and services, controlling the level of access users have.

**Key Components:**
- **Users**: Individual identities
- **Groups**: Collections of users
- **Roles**: Temporary access credentials
- **Policies**: Permission definitions

**Best Practices:**
- Enable MFA for root account
- Use roles for applications
- Follow principle of least privilege
- Rotate credentials regularly
- Use policy conditions

**Example IAM Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

---

## Management and Monitoring

### AWS CloudWatch

**What is CloudWatch?**
Amazon CloudWatch is a monitoring and observability service that collects and tracks metrics, monitors log files, sets alarms, and automatically reacts to changes in AWS resources.

**Key Features:**
- Metrics collection and monitoring
- Log aggregation and analysis
- Alarms and notifications
- Dashboards for visualization
- Events and automation

**Monitored Aspects:**
- Performance metrics
- Application health
- Resource utilization
- Custom metrics
- Log data

**Use Cases:**
- Application monitoring
- Resource optimization
- Troubleshooting
- Automated responses
- Compliance reporting

---

## Database Services

### Amazon DynamoDB

**What is DynamoDB?**
Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.

**Key Features:**
- Fully managed
- Single-digit millisecond latency
- Automatic scaling
- Built-in security
- Global tables for multi-region

**Use Cases:**
- Mobile and web applications
- Gaming leaderboards
- IoT applications
- Real-time analytics

---

### Amazon Aurora

**What is Aurora?**
Amazon Aurora is a high-performance managed relational database compatible with MySQL and PostgreSQL.

**Key Features:**
- 5x faster than MySQL
- 3x faster than PostgreSQL
- Automatic failover
- Continuous backup to S3
- Up to 15 read replicas

---

## Developer Tools

### AWS CodePipeline

**What is CodePipeline?**
AWS CodePipeline is a CI/CD service for continuous integration and delivery of applications.

**Pipeline Stages:**
1. Source (CodeCommit, GitHub, S3)
2. Build (CodeBuild, Jenkins)
3. Test (CodeBuild, third-party tools)
4. Deploy (CodeDeploy, ECS, Lambda)

---

## Analytics and Big Data

### Amazon EMR (Elastic MapReduce)

**What is EMR?**
Amazon EMR is a managed big data processing framework for running Apache Spark, Hadoop, and other big data frameworks.

**Supported Frameworks:**
- Apache Spark
- Apache Hadoop
- Apache Hive
- Apache HBase
- Presto

---

### Amazon Kinesis

**What is Kinesis?**
Amazon Kinesis is a platform for processing real-time streaming data at scale.

**Kinesis Services:**
- **Kinesis Data Streams**: Real-time data streaming
- **Kinesis Data Firehose**: Load streaming data
- **Kinesis Data Analytics**: Analyze streaming data
- **Kinesis Video Streams**: Video streaming

---

## Machine Learning and AI

### Amazon SageMaker

**What is SageMaker?**
Amazon SageMaker is a fully managed machine learning service for building, training, and deploying ML models.

**Key Features:**
- Built-in algorithms
- Jupyter notebooks
- Model training at scale
- One-click deployment
- Model monitoring

---

### Amazon Rekognition

**What is Rekognition?**
Amazon Rekognition provides image and video analysis capabilities.

**Capabilities:**
- Object and scene detection
- Facial analysis
- Face comparison
- Text detection
- Content moderation

---

## Serverless and Application Services

### Amazon API Gateway

**What is API Gateway?**
Amazon API Gateway is a managed service for creating, publishing, and managing APIs at any scale.

**Features:**
- RESTful APIs
- WebSocket APIs
- API versioning
- Request/response transformation
- Authentication and authorization
- Rate limiting and throttling

---

### AWS Step Functions

**What is Step Functions?**
AWS Step Functions coordinates multiple AWS services into serverless workflows.

**Use Cases:**
- Data processing pipelines
- Microservices orchestration
- IT automation
- Machine learning workflows

---

## Service Comparison Table

| Category | Service | Purpose | Use When |
|----------|---------|---------|----------|
| Compute | EC2 | Virtual servers | Need full control |
| Compute | Lambda | Serverless functions | Event-driven tasks |
| Storage | S3 | Object storage | Store files/data |
| Storage | EBS | Block storage | EC2 persistent storage |
| Database | RDS | Relational DB | Structured data |
| Database | DynamoDB | NoSQL DB | High-scale, low-latency |
| Network | VPC | Private network | Network isolation |
| Network | Route 53 | DNS service | Domain management |

---

## Best Practices

1. ✅ **Use IAM roles** instead of access keys
2. ✅ **Enable MFA** for sensitive accounts
3. ✅ **Implement least privilege** access
4. ✅ **Use CloudWatch** for monitoring
5. ✅ **Enable CloudTrail** for auditing
6. ✅ **Tag resources** for organization
7. ✅ **Use Auto Scaling** for resilience
8. ✅ **Implement backup strategies**
9. ✅ **Use multiple availability zones**
10. ✅ **Regularly review costs**

---

**Master AWS Services! ☁️**