
# 💳 Banking Management System — Microservices Project

A production-grade **Banking Management System** using **Spring Boot Microservices**, **Kafka**, **Docker**, **JWT**, **Monitoring with Prometheus + Grafana**, and **CI/CD via GitHub Actions**.

---

## 🚀 Features

| Module             | Description                                                              |
|--------------------|--------------------------------------------------------------------------|
| 🔐 `auth-service`     | JWT RS256 authentication + Redis cache                                |
| 👤 `user-service`     | Manage users and their profiles                                        |
| 💼 `account-service`  | Create & manage accounts with balances                                 |
| 💰 `transaction-service` | Transfer, deposit, withdraw with Kafka events                     |
| 📢 `notification-service` | Sends SMS (Fast2SMS/Twilio) and email notifications asynchronously |


---

## ⚙️ Tech Stack

- **Java 21 + Spring Boot 3.2.x**
- **Spring Cloud (Eureka)**
- **Spring Security + RS256 JWT**
- **Apache Kafka** (async messaging)
- **MySQL + Redis**
- **Docker + Docker Compose**
- **Prometheus + Grafana** (Monitoring)
- **GitHub Actions** (CI/CD Pipelines)
- **Swagger (SpringDoc OpenAPI)**

---

## 🧭 Architecture

```

\[User] → \[API Gateway] → \[Auth/User/Account/Transaction/... Services]
↓
\[Kafka Broker]
↓
\[Notification Service]

````

---

## 📦 DevOps & Observability

### 🔍 Prometheus + Grafana
All services expose `/actuator/prometheus` metrics for Prometheus to scrape.

#### Grafana Dashboards:
- JVM memory, CPU, GC stats
- Kafka consumer lag
- API performance
- Uptime per microservice

#### Prometheus Config (sample):
```yaml
scrape_configs:
  - job_name: 'spring-apps'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['auth-service:8081', 'user-service:8082']
````

---

### ✅ GitHub Actions CI/CD

Your `.github/workflows/ci.yml` might look like:

```yaml
name: Build & Test Microservices

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '21'
      - name: Build with Maven
        run: mvn clean install
```

✅ Automatically builds and tests on every PR or push.

---

## 🐳 Dockerized Setup

```bash
docker-compose up --build
```

Spin up:

* 5+ Microservices
* Kafka + Zookeeper
* Redis
* MySQL
* Eureka
* Prometheus + Grafana

---

## 🔐 Authentication (JWT RS256)

* Secure with asymmetric keys (public/private)
* JWT token includes roles, expires in X mins
* Redis used for storing blacklisted/revoked tokens

---

## 📬 Kafka Notification Topics

| Topic                   | Produced By           | Consumed By            |
| ----------------------- | --------------------- | ---------------------- |
| `user.registered`       | `user-service`        | `notification-service` |
| `transaction.completed` | `transaction-service` | `notification-service` |
| `loan.approved`         | `loan-service`        | `notification-service` |

---

## 📁 Project Structure

```
banking-system/
├── auth-service/
├── user-service/
├── account-service/
├── transaction-service/
├── loan-service/
├── notification-service/
├── .github/workflows/    # GitHub Actions
├── docker-compose.yml
└── README.md
```

---

## 🛡️ Security Features

* ✅ RS256 signed JWT tokens
* ✅ Redis-based token invalidation
* ✅ API Gateway route protection
* ✅ Role-based endpoint authorization
* ✅ CORS and rate-limiting support

---

## 📊 Swagger Docs

Each service provides Swagger UI at:

```
http://localhost:<PORT>/swagger-ui.html
```

---

## ✉️ Notifications (SMS + Email)

| Type  | Providers Used            |
| ----- | ------------------------- |
| SMS   | Fast2SMS / Twilio (trial) |
| Email | Gmail SMTP / SendGrid     |

---

## 🧑‍💻 Author

**Akash Adak**
`Backend Architect | Microservices Specialist`
GitHub: [@Akash-Adak](https://github.com/Akash-Adak)

---

## 📜 License

MIT License — Free to use and modify.

---


