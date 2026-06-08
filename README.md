# FluxWork – Real-Time Workflow Management Platform

FluxWork is a full-stack workflow management platform designed to streamline personal task organization through secure workspaces, real-time updates, and cloud-native deployment.

The project was built to explore modern software engineering practices including authentication, real-time communication, CI/CD pipelines, and cloud deployment on AWS.

---

## Live Demo

Live Demo: https://d561sdevlxo9y.cloudfront.net

Backend: Fluxwork-backend-env.eba-quyayh3f.eu-north-1.elasticbeanstalk.com

---

## Features

### User Authentication & Security

* JWT-based Authentication
* Spring Security Authorization
* Password Encryption using BCrypt
* User-specific Data Isolation

### Workflow Management

* Create and Manage Boards
* Create, Update and Delete Tasks
* Task Priorities and Deadlines
* Workflow Tracking (TODO → IN PROGRESS → DONE)

### Real-Time Updates

* Spring WebSockets (STOMP + SockJS)
* Instant task synchronization across multiple browser sessions
* Live task creation, updates, deletion, and status changes

### Cloud & DevOps

* Frontend hosted on AWS S3 + CloudFront
* Backend deployed on AWS Elastic Beanstalk
* PostgreSQL hosted on AWS RDS
* Automated CI/CD pipelines using GitHub Actions

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA
* WebSockets (STOMP + SockJS)

### Database

* PostgreSQL

### Cloud & DevOps

* AWS S3
* AWS CloudFront
* AWS Elastic Beanstalk
* AWS RDS
* GitHub Actions

---

## Architecture

```text
React Frontend
        │
        ▼
AWS CloudFront + S3
        │
        ▼
Spring Boot Backend
(AWS Elastic Beanstalk)
        │
        ▼
PostgreSQL Database
(AWS RDS)

        ▲
        │
Spring WebSockets
(STOMP + SockJS)
        │
        ▼
Real-Time Task Synchronization
```

---


## Screenshots

The following screenshots demonstrate the application's user interface, cloud infrastructure, and CI/CD deployment pipeline.

<img width="1920" height="1080" alt="FluxWork_HomePage" src="https://github.com/user-attachments/assets/040ea95b-0f36-450c-80d3-6fd3015dde31" />

<img width="1894" height="912" alt="DashBoard" src="https://github.com/user-attachments/assets/78c5c286-1457-4d67-b602-5327a72ae9fe" />

<img width="1845" height="810" alt="image" src="https://github.com/user-attachments/assets/3ce64617-5274-4e13-8de4-2f42da748a90" />

<img width="1896" height="646" alt="FluxWork_Backend" src="https://github.com/user-attachments/assets/beb16fb3-cfab-4300-8612-69a832bc1a96" />

<img width="1880" height="796" alt="FluxWork_DB" src="https://github.com/user-attachments/assets/4224d711-19a3-4b41-a58e-ce9116ce0967" />

<img width="1901" height="908" alt="Github_Action" src="https://github.com/user-attachments/assets/a1453d6b-fbe1-41f6-920a-6c41b02b499a" />

---

## Engineering Challenges & Solutions

### 1. Multi-User Data Isolation & Authorization

#### Challenge

During early testing, the application successfully supported multiple user accounts, but resource ownership was not enforced consistently across all endpoints. This created a risk where users could potentially access boards or tasks belonging to other users.

#### Solution

Implemented a strict **User → Board → Task** ownership hierarchy and enforced authorization checks at the service layer before every operation. Combined this with **JWT Authentication** and **Spring Security** to ensure users could only access resources they owned.

#### Key Takeaways

* Authentication vs Authorization
* Secure API Design
* User-Specific Data Isolation
* Spring Security Best Practices

---

### 2. Real-Time Task Synchronization

#### Challenge

The initial implementation relied entirely on REST APIs, requiring users to manually refresh the page to see task updates. This resulted in inconsistent views across multiple browser sessions.

#### Solution

Integrated **Spring WebSockets (STOMP + SockJS)** to broadcast task creation, updates, deletion, and status changes. React clients subscribe to task events and automatically refresh data whenever a task update is received, enabling real-time synchronization.

#### Key Takeaways

* Event-Driven Architecture
* WebSocket Communication
* Real-Time Application Design
* Client-Server Synchronization

---

### 3. Cloud Deployment & CI/CD Automation

#### Challenge

The application functioned correctly in local development but required a reliable production deployment strategy. Managing frontend hosting, backend deployment, database connectivity, and environment-specific configurations introduced additional complexity.

#### Solution

Deployed the frontend using **AWS S3 + CloudFront**, the backend using **AWS Elastic Beanstalk**, and the database using **AWS RDS PostgreSQL**. Implemented **GitHub Actions CI/CD pipelines** to automate build, test, and deployment workflows, ensuring every push to the main branch could be deployed consistently.

#### Key Takeaways

* Cloud-Native Deployment
* CI/CD Automation
* Environment Configuration Management
* Production Infrastructure Management


## Future Enhancements

* Team Collaboration
* Shared Workspaces
* Notifications
* Activity Logs
* Role-Based Access Control (RBAC)
* File Attachments
