<script setup lang="ts">
import { usePreferencesStore } from '~/stores/preferences'
import type { GeneratedRecipe, BaseRecipe } from '~/types'

const recipes = ref<BaseRecipe[]>()
const limitExceeded = ref(false)
const resetTime = ref('')

definePageMeta({
    layout: "dashboard"
})

const { preference } = usePreferencesStore()

const { data, pending, error, refresh } = await useFetch<GeneratedRecipe[]>('/api/recipe', {
    method: 'POST',
    body: JSON.stringify(preference)
})

if (data && preference) {
    recipes.value = data.value?.map(recipe => ({
        ...preference,
        ...recipe,
        ingredients: recipe.ingredients,
        userIngredients: preference.ingredients
    }))
}

if (error) {
    if (error.value?.statusCode === 429) {
        const resetHeader = error.value.response?.headers.get('X-RateLimit-Reset')
        const rateLimitResetTime = resetHeader ? new Date(parseInt(resetHeader)) : null
        if (rateLimitResetTime) {
            const now = new Date()
            const resetTimeSec = (rateLimitResetTime.getTime() - now.getTime())/1000
            const resetTimeMin = resetTimeSec/60
            const hoursLeft = Math.floor(resetTimeMin / 60)
            const plusMinLeft = Math.floor(resetTimeMin % 60)
            resetTime.value = `${hoursLeft}hr and ${plusMinLeft}miniute`
        }
    }
}

</script>

<template>
    <div class="min-h-screen">
        <div class="max-w-4xl mx-auto p-4">
            <div v-if="pending" class="flex justify-center">
                <LucideLoader2 class="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
            <!-- For Rate Limit Error -->
            <div v-if="error && limitExceeded" class="h-[75vh] flex flex-col justify-center items-center sm:mx-10">
                <h2 class="text-center">
                    You Exceeded Your Limit For Today! 
                </h2>
                <div class="text-center">
                    <p>Recipe generation is allowed after <span class="text-amber-500 font-semibold">{{ resetTime }}</span></p>
                    <p>Meanwhile you can browse your saved <NuxtLink to="/dashboard/favourites" class="text-primary hover:text-amber-500 font-semibold italic">favourite recipes</NuxtLink></p>
                </div>
                <div class="mt-4 flex gap-4">
                    <Button as-child>
                        <NuxtLink to="/dashboard">Change Preferences</NuxtLink>
                    </Button>
                    <Button variant="ghost" @click="refresh">
                        Refresh
                    </Button>
                </div>
            </div>

            <!-- For any other errors -->
            <div v-if="error && !limitExceeded" class="h-[75vh] flex flex-col justify-center items-center sm:mx-10">
                <h2 class="text-center">
                    It seems like error has occured, would you like to go back and change preferences? 
                </h2>
                <div class="mt-4 flex gap-4">
                    <Button as-child>
                        <NuxtLink to="/dashboard">Change Preferences</NuxtLink>
                    </Button>
                    <Button variant="ghost" @click="refresh">
                        Refresh
                    </Button>
                </div>
            </div>
            <div v-if="data" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <GeneratedRecipeCard 
                    v-for="recipe in recipes" 
                    :key="recipe.name" 
                    :recipe />
            </div>
        </div>
    </div>
</template>