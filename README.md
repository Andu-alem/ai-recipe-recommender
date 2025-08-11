# 🍳 ChefGPT

**ChefGPT** is an AI-powered recipe recommender web application that transforms the ingredients you already have into delicious, step-by-step recipes in seconds.  
Built with a modern, scalable tech stack, ChefGPT blends **seamless authentication**, **powerful AI integration**, and a **beautiful, responsive UI** to make cooking inspiration accessible anytime.

---

## ✨ Features

- **🔐 Authentication**  
  Secure sign-in with [better-auth](https://better-auth.dev/) supporting **email/password** and **Google Sign-In**.

- **💾 Data Persistence**  
  Store user profiles and favorite recipes in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for secure, cloud-based persistence.

- **🤖 AI-Powered Recipe Suggestions**  
  Generate up to **5 personalized recipes** based on your ingredients and dietary preferences using [Vercel AI SDK](https://vercel.com/docs/concepts/ai) + **Google Gemini API**.

- **✅ Robust Form Validation**  
  Built with [vee-validate](https://vee-validate.logaretm.com/v4/) and [Zod](https://zod.dev/) for schema-based, error-proof user input.

- **📑 Structured AI Responses**  
  Recipes are parsed into a **clean, easy-to-read** format — including ingredients, preparation steps, and estimated cooking times.

- **❤️ Favorites System**  
  Save your go-to recipes for quick access anytime.

- **🎨 Modern UI & Animations**  
  Designed with **Nuxt.js**, **Tailwind CSS**, and **shadcn-vue** for a sleek, responsive, and accessible experience with smooth animations.

---

## 🛠 Tech Stack

**Frontend**
- [Nuxt.js v3](https://nuxt.com) — Vue based meta framework
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first styling
- [shadcn-vue](https://ui.shadcn.com/vue) — Modern UI components
- [Pinia](https://pinia.vuejs.org/) — State management

**Backend / Auth / Database**
- [MongoDB](https://www.mongodb.com/) & [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — Cloud database
- [better-auth](https://better-auth.dev/) — Authentication service

**AI Integration**
- [Vercel AI SDK](https://vercel.com/docs/concepts/ai)
- [Google Gemini API](https://deepmind.google/technologies/gemini/)

**Validation**
- [vee-validate](https://vee-validate.logaretm.com/v4/)
- [Zod](https://zod.dev/)

**Deployment**
- [Netlify](https://netlify.com) — Frontend hosting

---

## 🚀 Getting Started

Clone the repository and run locally:

```bash
git clone https://github.com/Andualem/ai-recipe-recommender.git
cd ai-recipe-recommender
pnpm install
pnpm dev
````

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---
 
## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 📷 Screenshots

![chefGPT](/public/chefgpt.png)
---

## 📌 Roadmap

* [ ] Add meal type filters (breakfast, lunch, dinner)
* [ ] Support for more AI models
* [ ] Grocery list export
* [ ] Offline mode with IndexedDB

---

## 🤝 Contributing

Contributions, ideas, and suggestions are welcome!
Feel free to fork the repository and submit a pull request.
Or clone it and extend and customize for your use case.

---

## 📄 License

This project is licensed under the **MIT License**.

---



