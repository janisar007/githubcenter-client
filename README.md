# GitHub Center

A centralized dashboard to manage all your GitHub repositories, workflows, and pull requests across multiple GitHub accounts — in one place.

---

## 🚀 Overview

Managing multiple repositories with several GitHub Actions workflows can be time-consuming and tedious.  
**GitHub Center** eliminates the need to check each repository manually by giving you a single interface to:

- View all repositories across one or more GitHub accounts.
- Monitor GitHub Actions workflow runs (passed/failed).
- Track pull request statuses (merged, failed, pending).
- Quickly navigate directly to the repository in GitHub.

---

## 🎯 Problem It Solves

> Imagine you have 20 repositories, each with 5+ workflows.  
> Some workflows fail, some pass, and pull requests may be pending or merged.  
> Normally, you'd open each repository daily to check them one by one.  
> **GitHub Center** automates this monitoring process, saving hours of manual work.

---

## ✨ Features

- **Multi-Account Support** — Connect and manage multiple GitHub accounts.
- **Centralized Repo Dashboard** — View all repositories in one place.
- **Workflow Monitoring** — Instantly see which workflows passed or failed.
- **Pull Request Tracker** — Identify failed or pending PRs that need action.
- **Repository Grouping** — Organize repos into custom groups for better management.
- **Direct GitHub Navigation** — One click to open the repo or PR in GitHub.
- **Secure Token Storage** —  
  - Personal Access Tokens (PATs) are encrypted and stored securely on our servers.
  - Tokens are **never** sent back to the browser after saving.
  - Backend token handling code is open source for transparency.

---

## 🛠 Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- Shadcn/UI (if used)  

**Backend**  
- Node.js  
- Express.js  
- MongoDB  

**Integrations**  
- GitHub REST & GraphQL APIs  

**Security**  
- Encrypted Personal Access Token storage  
- HTTPS  

---

## 📸 Screenshots / Demo

> _(Insert a few screenshots of your dashboard, workflow view, PR tracker, grouping interface.)_

---

## ⚙️ Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/janisar007/githubcenter-client.git
   cd githubcenter-client
