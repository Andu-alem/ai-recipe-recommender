<script setup lang="ts">
import { usePreferencesStore } from '~/stores/preferences'
import type { GeneratedRecipe, BaseRecipe } from '~/types'

const recipes = ref<BaseRecipe[]>([])
const limitExceeded = ref(false)
const resetTime = ref('')

definePageMeta({
    layout: 'dashboard'
})

const { preference } = usePreferencesStore()

const { data, pending, error, refresh } = useFetch<GeneratedRecipe[]>('/api/recipe', {
    method: 'POST',
    body: JSON.stringify(preference),
})

// Watch for data changes and populate recipes
watch(data, (val) => {
    if (val && preference) {
        recipes.value = val.map(recipe => ({
            ...preference,
            ...recipe,
            ingredients: recipe.ingredients,
            userIngredients: preference.ingredients
        }))
    }
})

// Watch for errors and handle them
watch(error, (err) => {
    if (!err) return

    // Nuxt FetchError shape check
    const fetchErr = err as { statusCode?: number; response?: Response }

    // Rate limit case
    if (fetchErr.statusCode === 429) {
        limitExceeded.value = true

        const resetHeader = fetchErr.response?.headers?.get?.('X-RateLimit-Reset')
        if (resetHeader) {
            const resetTimeMs = parseInt(resetHeader)
            const rateLimitResetTime = new Date(resetTimeMs)
            const now = new Date()
            const diffMs = rateLimitResetTime.getTime() - now.getTime()

            if (diffMs > 0) {
                const diffMin = Math.floor(diffMs / 1000 / 60)
                const hours = Math.floor(diffMin / 60)
                const minutes = diffMin % 60
                resetTime.value = hours > 0
                ? `${hours} hr ${minutes} min`
                : `${minutes} min`
            }
        }
    }
})
</script>

<template>
    <div class="min-h-screen">
        <div class="max-w-4xl mx-auto p-4">

        <!-- Loading state -->
        <div v-if="pending" class="flex justify-center">
            <LucideLoader2 class="w-10 h-10 text-emerald-500 animate-spin" />
        </div>

        <!-- Rate Limit Error -->
        <div v-if="error && limitExceeded" class="h-[75vh] flex flex-col justify-center items-center sm:mx-10">
            <h2 class="text-center">
                You Exceeded Your Limit For Today!
            </h2>
            <div class="text-center">
                <p>
                    Recipe generation is allowed after
                    <span class="text-amber-500 font-semibold">{{ resetTime }}</span>
                </p>
                <p>
                    Meanwhile, you can browse your saved
                    <NuxtLink to="/dashboard/favourites" class="text-primary hover:text-amber-500 font-semibold italic">
                        favourite recipes
                    </NuxtLink>
                </p>
            </div>
        </div>

        <!-- Generic Error -->
        <div v-else-if="error" class="h-[75vh] flex flex-col justify-center items-center sm:mx-10">
            <h2 class="text-center">
                An error occurred. Would you like to go back and change preferences?
            </h2>
            <div class="mt-4 flex gap-4">
                <Button as-child>
                    <NuxtLink to="/dashboard">Change Preferences</NuxtLink>
                </Button>
                <Button variant="ghost" @click="refresh">Refresh</Button>
            </div>
        </div>

        <!-- Recipe List -->
        <div v-else-if="data" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <GeneratedRecipeCard
                v-for="recipe in recipes"
                :key="recipe.name"
                :recipe="recipe"
            />
        </div>

        </div>
    </div>
</template>
