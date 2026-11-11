# KESCA — Kitchen Exhaust Systems Cleaners Association

Public website for KESCA, a volunteer project by **Air Advocates**.  
Contact: Rob Sweet — [info@airadvocates.net](mailto:info@airadvocates.net)

## Prerequisites

- [Node.js 20 LTS](https://nodejs.org/) & npm
- [MariaDB 10.11+](https://mariadb.org/)

## Setup

### 1. Create the database

```sql
CREATE DATABASE kesca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'kesca'@'127.0.0.1' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON kesca.* TO 'kesca'@'127.0.0.1';
FLUSH PRIVILEGES;
```

### 2. Backend

```bash
cd backend
cp .env.example .env        # fill in DB_PASSWORD and JWT_SECRET — never commit real secrets
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev                 # http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env        # adjust VITE_API_URL if needed
npm install
npm run dev                 # http://localhost:5173
```

## Local URLs

| Service  | URL                        |
|----------|----------------------------|
| Backend  | http://localhost:5000      |
| Frontend | http://localhost:5173      |

> **Note:** Never commit `.env` files containing real secrets. They are listed in `.gitignore`.
