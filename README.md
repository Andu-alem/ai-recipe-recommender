# ChefGPT

ChefGPT is an AI-powered recipe recommender web application that helps you turn your available ingredients into delicious recipes instantly. Built with a modern tech stack, ChefGPT combines seamless authentication, AI integration, and user-friendly features to provide a personalized cooking experience.

---

## Features

- **Authentication**  
  Secure user authentication with [better-auth](https://better-auth.dev/) supporting both email/password and Google Sign-In.

- **Data Persistence**  
  User data and favorite recipes are stored securely in MongoDB using MongoDB Atlas for reliable cloud hosting.

- **AI-Powered Recipe Suggestions**  
  Leveraging [Vercel AI SDK](https://vercel.com/docs/concepts/ai) and Google Gemini API for generating up to 5 tailored recipe recommendations based on user ingredients and preferences.

- **Form Validation**  
  Robust and declarative form validation with [vee-validate](https://vee-validate.logaretm.com/v4/) and schema validation using [Zod](https://zod.dev/) for a smooth user experience.

- **Structured AI Responses**  
  AI replies are parsed and displayed in a clean, structured format for easy readability and interaction.

- **Favorites & Persistence**  
  Users can save their favorite recipes for quick access later.

- **Modern UI & Animations**  
  Built with Nuxt.js, Tailwind CSS, and shadcn-vue to provide a sleek, responsive, and accessible interface with subtle animations.

---

## Tech Stack

- **Frontend:**  
  - [Nuxt.js](https://nuxt.com)  
  - [Tailwind CSS v4](https://tailwindcss.com)  
  - [shadcn-vue](https://ui.shadcn.com/vue)  

- **Backend / API & Database:**  
  - MongoDB & [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
  - [Better-auth](https://better-auth.dev/) (authentication service)  

- **AI Integration:**  
  - [Vercel AI SDK](https://vercel.com/docs/concepts/ai)  
  - Google Gemini API  

- **Form Validation:**  
  - [vee-validate](https://vee-validate.logaretm.com/v4/)  
  - [Zod](https://zod.dev/)  

- **Deployment:**  
  - Frontend deployed on [Netlify](https://netlify.com)  

---

## Setup & Installation

Feel free to clone and extend or customize it for your need

1. **Clone the repository**

   ```bash
   git clone https://github.com/Andualem/ai-recipe-recommender.git
   cd ai-recipe-recommender
   pnpm install
   pnpm dev
   ```
