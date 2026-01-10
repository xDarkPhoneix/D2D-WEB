# D2D-WEB

⚡ **D2D-WEB** is a modern web application built with **Next.js**, designed as the frontend for a Dealer-to-Dealer (D2D) service platform.  
The project is structured for scalability, rapid development, and clean UI using modern frontend tooling.

> 🚀 *You can update this description later to clearly explain your business idea or platform vision.*

---

## ✨ Features

- ⚛️ Built with **Next.js (App Router)**
- 🎨 Styled using **Tailwind CSS**
- 📦 Modular and scalable folder structure
- 🧪 Includes seed scripts for development data
- 🚀 Ready for deployment on **Vercel**
- 🛠️ Easy to extend with backend APIs

---

## 📁 Project Structure

```text
├── public/                   # Static assets
├── src/                      # Application source code
│   ├── app/                  # Next.js App Router
│   ├── components/           # Reusable UI components
│   └── styles/               # Global styles
├── seed-d2d-services.js      # Seed D2D services data
├── seed-users.js             # Seed users data
├── create-dummy-services.js  # Dummy data generator
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # PostCSS + Tailwind config
├── jsconfig.json             # Path aliases
├── package.json              # Dependencies & scripts
└── README.md


//create a .env folder in root and add the below 
MONGODB_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET


📥 Install Dependencies
npm install
# or
yarn install
# or
pnpm install

▶️ Run Development Server
npm run dev
# or
yarn dev
# or
pnpm dev

🧪 Seed Sample Data

Use the seed scripts to generate mock data for development.

node seed-d2d-services.js
node seed-users.js


ℹ️ These scripts are meant for development/testing only.