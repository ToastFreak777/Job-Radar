# Job Radar

**Job Rader** is a job aggregator designed to help users find the right job quickly.
It demonstrates proficiency in **external API integration**, **unit and integration testing**, and **containerization with Docker**.

---

## 🚀 Core Features

- **Job Search**
  - Search jobs by keywords
  - Filter by location
- **Advance Filtering**
  - Filter by job type (full-time, part-time, internships, etc)
- **Containerized with Docker**
  - Fully dockerized for portability
- **Fully Tested**
  - Includes unit tests for individual components and integration tests for full workflows

---

## 🔗 Api's

- **Adzuna** - Fully integrated
- **Jobicy** - Under development

## 💻 Tech Stack

- Next.js 15
- TypeScript
- React
- Node.js
- Jest & React Testing Library
- Docker

## 📦 Getting Started

Clone the repo

```bash
git clone https://github.com/ToastFreak777/Job-Radar.git
cd job_radar
```

Install Dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

Run development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Running Tests

```bash
npm test
# or
yarn test
# or
pnpm test
```

Unit tests verify individual components and utility functions.

Integration tests verify end-to-end functinality of job search and API integration.

Running with Docker

```bash
# Build the Docker image
docker build -t job-radar .

# Run the container
docker run -p 3000:3000 --env-file .env job-radar
```

App will be available at `http://localhost:3000`

Demonstrates containerization skills and ensures portability across platforms like Railway, AWS, or DigitalOcean.

## 🌐 Deployment

- [Live Demo](https://job-radar-ruby.vercel.app)
- Vercel handles frontend, backend API routes, and external API requests seamlessly.

## 📂 Project Structure

```bash
job_radar/
├─ app/                # Next.js App Router pages
│  ├─ api/             # API routes
│  ├─ jobs/            # Job pages/components
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/         # React components
├─ utils/              # API helpers and fetch logic
├─ __tests__/          # Unit & integration tests
├─ Dockerfile
├─ package.json
└─ README.md
```

## 🏆 Portfolio Highlights

1. External API Integration

   - Fetches live job data from Adzuna, demonstrating async data handling and API consumption.

2. Testing

   - Unit and integration tests ensure code quality and maintainability.

3. Docker & Portability

   - Dockerfile included for containerized deployment, showing DevOps skill.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
