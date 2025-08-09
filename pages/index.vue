<script setup lang="ts">
const features = [
    {
        icon: "target",
        title: "Personalized Recipes",
        description: "Get recipes tailored to your taste, diet, and skill level."
    },
    {
        icon: "brain",
        title: "Powered by AI",
        description: "ChefGPT uses cutting-edge AI to generate creative and practical meals."
    },
    {
        icon: "clock",
        title: "Save Time",
        description: "Input your ingredients and get instant recipes--no more endless searching."
    }
]

const workSteps = [
    "Set your preferences: flavor, diet, skill level, and time.",
    "Enter the ingredients you have.",
    "ChefGPT generate 3-5 delicious recipes instantly."
]

</script>
<template>
    <div>
        <header class="sticky top-0 z-50 w-full bg-opacity-90 backdrop-blur-md">
            <nav class="flex justify-end mt-5">
                <div class="flex items-center gap-4 p-2">
                    <ThemeToggler />
                    <Button 
                        size="lg" 
                        class="inline-flex items-center justify-center rounded-full border border-transparent text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        as-child
                    >
                        <NuxtLink to="/sign-in">Sign In</NuxtLink>
                    </Button>
                </div>
            </nav>
        </header>
        <main class="container mx-auto">
            <!-- Hero Section -->
            <section class="min-h-[90vh] bg-radial from-amber-200 dark:from-emerald-700 to-background to-50%">
                <div class="w-full min-h-[90vh] flex flex-col justify-center items-center backdrop-blur-2xl">
                    <Motion
                        :initial="{ opacity: 0, y: -30 }"
                        :whileInView="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.2, duration: 0.5, ease: 'easeOut' }"
                        class="flex items-center"
                    >
                        <h1 class="text-4xl font-extrabold text-primary">
                            ChefGPT
                        </h1>
                    </Motion>
                    <Motion 
                        :initial="{ opacity: 0 }"
                        :whileInView="{ opacity: 1 }"
                        :transition="{ delay: 0.5, duration: 0.4 }"
                        class="text-5xl lg:text-7xl text-center font-extrabold text-accent tracking-tight mb-4 leading-tight">
                        Your Personal AI Chef
                    </Motion>
                    <Motion
                        :initial="{ opacity: 0, y: 30 }"
                        :whileInView="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.2, duration: 0.5, ease: 'easeOut' }"
                        class="flex flex-col justify-center items-center"
                    >
                        <p class="text-lg text-center lg:text-xl mb-8 max-w-2xl mx-auto">
                            Get instant, personalized recipes with a touch of AI magic. Just tell us what you have, and we'll create the perfect meal for you.
                        </p>
                        <Button 
                            size="lg" 
                            class="inline-flex items-center justify-center rounded-full border border-transparent px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            as-child
                        >
                            <NuxtLink to="/dashboard">Get Cooking</NuxtLink>
                        </Button>
                    </Motion>
                </div>
            </section>

            <!-- Features Section -->
            <section class="min-h-[90vh] flex flex-col justify-center items-center gap-7 my-10 md:my-0">
                <h1 class="text-center text-accent text-4xl font-extrabold">Why ChefGPT?</h1>
                <div class="grid md:grid-cols-3 gap-4 w-11/12">
                    <Motion
                        v-for="feature, index in features"
                        :key="index"
                        :initial="{ opacity: 0, y: 40 }"
                        :whileInView="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.6, delay: index * 0.2 }"
                        viewport="{ once: true }"
                    >
                        <Card class="h-64">
                            <CardContent class="flex flex-col items-center justify-center">
                                <div class="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-emerald-200 text-amber-500 shadow-inner">
                                    <LucideBrain v-if="feature.icon === 'brain'" class="size-7" />
                                    <LucideTarget v-else-if="feature.icon === 'target'" class="size-7" />
                                    <LucideClock v-else class="size-7" />
                                </div>
                                <h4 class="text-xl font-bold text-emerald-900 dark:text-emerald-500 mb-2 text-center">
                                    {{ feature.title }}
                                </h4>
                                <p class="text-center">
                                    {{ feature.description }}
                                </p>
                            </CardContent>
                        </Card>
                    </Motion>
                </div>
            </section>

            <!-- How it Works Sections -->
            <section class="min-h-[90vh] flex flex-col justify-center items-center gap-7">
                <h1 class="text-center text-accent text-4xl font-extrabold">How It Works</h1>
                <div class="grid md:grid-cols-3 gap-4 w-11/12">
                    <Motion
                        v-for="step, index in workSteps" 
                        :key="index"
                        :initial="{ opacity: 0, y: 40 }"
                        :whileInView="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.6, delay: index * 0.2 }"
                        viewport="{ once: true }"
                    >
                        <Card class="h-56">
                            <CardContent class="flex flex-col items-center justify-center">
                                <div class="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-emerald-200 text-amber-500 shadow-inner">
                                    <LucideStepForward class="size-7" />
                                </div>
                                <h4 class="text-xl font-bold text-emerald-900 dark:text-emerald-500 mb-2 text-center">
                                    Step - {{ index + 1 }}
                                </h4>
                                <p class="text-center">
                                    {{ step }}
                                </p>
                            </CardContent>
                        </Card>
                    </Motion>
                </div>
            </section>

            <!-- CTA Section -->
            <Motion 
                :initial="{ opacity: 0 }" 
                :whileInView="{ opacity: 1 }" 
                :transition="{ delay: 0.3, duration: 0.8, ease: 'easeOut'}"
                class="min-h-[90vh] flex justify-center items-center"
            >
                <Card class="md:w-11/12">
                    <CardContent class="flex flex-col justify-center items-center my-10">
                        <h3 class="text-3xl md:text-4xl font-extrabold text-amber-500 text-center tracking-tight mb-4">
                            Ready to start cooking?
                        </h3>
                        <p class="text-lg text-center mb-8 max-w-2xl mx-auto">
                            Join ChefGPT today and discover a world of culinary possibilities. It's free to get started!
                        </p>
                        <Button 
                            size="lg" 
                            class="inline-flex items-center justify-center rounded-full border border-transparent px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            as-child
                        >
                            <NuxtLink to="/dashboard">Cook for Free</NuxtLink>
                        </Button>
                    </CardContent>
                </Card>
            </Motion>
        </main>

        <!-- Footer -->
        <footer class="text-emerald-900 dark:text-emerald-500 text-center py-8">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p>
                    &copy; {{ new Date().getFullYear() }} ChefGPT, by 
                    <a href="https://andudev.netlify.app" target="__black__" class="text-accent font-bold">Andi</a>. 
                    All rights reserved.</p>
            </div>
        </footer>
    </div>
</template>