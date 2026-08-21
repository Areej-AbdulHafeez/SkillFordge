# SkillForge

**AI-Powered Student Skills & Career Development Platform**
LoopLearn Hackathon 2026 — Problem Statement PS-03

---

## 1. Problem

Students often know they want a career in tech but don't know what skills
they're missing, what projects to build, or how to structure their learning
journey. SkillForge evaluates a student's current skills against a target
role and generates a grounded, practical roadmap to close the gap.

## 2. SDG Alignment

| SDG | Relevance |
|---|---|
| SDG 4 — Quality Education | Personalized, actionable learning guidance |
| SDG 8 — Decent Work and Economic Growth | Better-prepared candidates for the job market |
| SDG 9 — Industry, Innovation and Infrastructure | Tech-skills pipeline |
| SDG 10 — Reduced Inequalities | Free, self-serve career guidance regardless of access to mentors |

## 3. Core Users

- **Student** — creates a profile, self-rates skills, sets a career goal,
  and receives an AI-generated roadmap.
- **Mentor / Admin** *(planned)* — views student profiles, curates learning
  resources, reviews assessments.

## 4. Features

### Implemented (this submission)
- Landing page, profile creation, and skill self-assessment flow
- Skill radar chart + overall "readiness" gauge (6 categories: Python, Web
  Development, Git, DevOps, AI, Database)
- **Generative AI** — AI mentor generates a personalized roadmap (summary,
  skill gaps, ordered steps with a project/resource per step) based on the
  student's profile and ratings
- Responsive React UI (mobile-first, keyboard-focus visible, respects
  reduced-motion preference)

### Planned / not yet built
- Authentication (registration/login, JWT, roles: Student / Mentor / Admin)
- MongoDB persistence for profiles, skills, and roadmaps
- **RAG** — knowledge base of learning resources, course info, and project
  ideas, with retrieval-grounded AI answers
- **Agentic AI** — Career Planning Agent with tools (analyze skills, search
  resources, generate skill gap, create roadmap)
- Python/OOP microservice (`SkillAnalyzer`: `calculate_score()`,
  `identify_gaps()`, `recommend_topics()`)
- API Gateway + microservices split (Auth Service / Profile API / AI Service)
- Docker, Kubernetes manifests, Terraform configuration
- Linux setup/deploy shell scripts
- Mentor/Admin dashboard

## 5. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind (core utilities), Recharts, lucide-react |
| AI | Anthropic API (`claude-sonnet-4-6`) |
| Planned backend | Node.js, Express.js, MongoDB (MERN) |
| Planned AI/data | Python (OOP service), RAG knowledge base |
| Planned DevOps | Docker, Kubernetes, Terraform |

## 6. Architecture (target end-state)

```
React Frontend
      |
API Gateway
      |
Auth Service  /  Profile API  /  AI Service
      |
Python Analyzer / Skill Service
      |
MongoDB
```

Current submission implements the **React Frontend** layer and calls the
**AI Service** (Anthropic API) directly for roadmap generation; the
services below the gateway are not yet built.

## 7. Project Structure

```
project/
├── frontend/
│   └── skillforge.jsx        # this submission
├── backend/                  # planned
│   ├── auth-service/
│   ├── core-service/
│   └── api-gateway/
├── ai-service/                # planned
├── python-service/            # planned
├── rag/
│   └── knowledge-base/        # planned
├── agent/                     # planned
├── docker/                    # planned
├── kubernetes/                # planned
├── terraform/                 # planned
├── scripts/
│   ├── setup.sh                # planned
│   └── deploy.sh               # planned
├── docs/
│   ├── architecture.png
│   ├── database-schema.png
│   └── api-documentation.pdf
├── .env.example
├── docker-compose.yml
├── README.md
└── LICENSE
```

## 8. How the AI Feature Works

1. Student rates six skill categories (0–100) and picks a target role.
2. The app sends the profile + ratings to the Anthropic API with a prompt
   instructing it to act as a career mentor and identify the biggest gaps.
3. The model returns structured JSON: `{ summary, gaps[], roadmap[] }`.
4. The UI renders the summary, gap tags, and an ordered roadmap timeline.

This is a direct Generative AI integration. RAG grounding (pulling from a
curated resource knowledge base) and an autonomous agent layer are the next
additions — see **Planned / not yet built** above.

## 9. Getting Started

This submission is a single React component (`skillforge.jsx`) with no
required props. Drop it into any React app with Tailwind, `recharts`, and
`lucide-react` available, and render the default export.

```bash
npm install recharts lucide-react
```

No `.env` is required for the frontend — the AI request is proxied through
the hosting environment's Anthropic API access. For a standalone deployment,
route the `fetch` call through your own backend and keep the API key
server-side.

## 10. Future Improvements

- Wire up the planned backend, RAG knowledge base, and Career Planning Agent
- Add authentication and persist profiles/roadmaps in MongoDB
- Containerize each service and add Kubernetes + Terraform configs
- Mentor/Admin dashboard for reviewing student progress
- Real skill assessment (quiz-based scoring) instead of self-rated sliders

## 11. Demo Flow

```
Create profile → Set target role → Rate skills →
Generate AI roadmap → Review skill gaps → Follow roadmap steps
```
