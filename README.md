# Financel

Hello please use the development branch "dev" for local development and operations. It uses the local Postgres database. You will not be able to connect with the S3 bucket on your local machine.

### 1. Introduction

This is a project that takes some of the core concepts of games such as Tradle and Wordle and applies them to the world of finance. The goal is to create a system that is both fun and educational. The project is still in the early stages of development, but we are excited to see where it goes. For more information send me an email at [ltomblock@gmail.com](mailto:ltomblock@gmail.com)
Change

## Local Development Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/financel.git
   cd financel
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the database:

   - Install PostgreSQL on your local machine if you haven't already.

4. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Update the database connection details in `.env` (see instructions in the file)

5. Run database migrations:

   ```
   npx prisma migrate dev

   npx generate

   npm run import-rates
   ```

6. In the future the setting up of the "Daily Challenge" will be automated, but for now you need do it manually by running the following command for every new day, as of right now the only category is "Interest Rates":

   ```
   npm run daily-challenge
   ```

7. Start the development server:

   ```
   npm run dev
   ```

The application should now be running at `http://localhost:3000`.

### 3. Tech Stack

Programming Language: TypeScript
Frontend: React, CSS Modules, PostCSS, Mantine
Server-less Backend: Next.js 14 with App Router
Database: PostgreSQL
ORM: Prisma
Deployment: Vercel
