<template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-700/15 to-background">
      <header class="border-b bg-secondary shadow-sm">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-emerald-600">ChefGPT</h1>
          <nav class="space-x-4">
            <Button variant="ghost" to="#features">Features</Button>
            <Button variant="ghost" to="#how-it-works">How It Works</Button>
            <Button variant="ghost" as-child>
                <NuxtLink to="/signup">Get Started</NuxtLink>
            </Button>
            <ThemeToggler />
          </nav>
        </div>
      </header>
  
      <main class="container mx-auto px-6 py-16 text-center">
        <h2 class="text-4xl font-extrabold mb-4 bg-gradient-to-l from-orange-700 to-emerald-500 inline-block text-transparent bg-clip-text">Your AI-Powered Recipe Companion</h2>
        <p class="text-lg text-secondary-foreground mb-8">
          ChefGPT helps you cook smarter by generating delicious recipes based on your preferences and ingredients.
        </p>
        <Button size="lg" as-child>
            <NuxtLink to="/dashboard">Start Cooking</NuxtLink>
        </Button>
  
        <!-- Features Section -->
        <section id="features" class="mt-24">
          <h3 class="text-3xl font-bold mb-6">Why ChefGPT?</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
                <CardContent>
              <h1 class="text-emerald-400">🎯 Personalized Recipes</h1>
              <p>Get recipes tailored to your taste, diet, and skill level.</p>
              </CardContent>
            </Card>
            <Card>
                <CardContent>
              <h1 class="text-emerald-400">🧠 Powered by AI</h1>
              <p>ChefGPT uses cutting-edge AI to generate creative and practical meals.</p>
              </CardContent>
            </Card>
            <Card>
                <CardContent>
              <h1 class="text-emerald-400">⏱️ Save Time</h1>
              <p>Input your ingredients and get instant recipes—no more endless searching.</p>
              </CardContent>
            </Card>
          </div>
        </section>
  
        <!-- How It Works Section -->
        <section id="how-it-works" class="mt-24">
          <h3 class="text-3xl font-bold mb-6">How It Works</h3>
          <ul class="space-y-4 text-left max-w-2xl mx-auto">
            <li><strong>1.</strong> Set your preferences: cuisine, diet, skill level, and time.</li>
            <li><strong>2.</strong> Enter the ingredients you have.</li>
            <li><strong>3.</strong> ChefGPT generates 3 delicious recipes instantly.</li>
          </ul>
        </section>
  
        <!-- Call to Action -->
        <section id="get-started" class="mt-24">
          <h3 class="text-3xl font-bold mb-4">Ready to Cook Smarter?</h3>
          <Button size="lg" as-child>
            <NuxtLink to="/dashboard">Launch ChefGPT</NuxtLink>
          </Button>
        </section>
      </main>
  
      <footer class="mt-24 border-t py-6 text-center text-sm">
        © 2025 ChefGPT. Built with ❤️ using Nuxt, Tailwind, and shadcn-vue.
      </footer>
    </div>
  </template>