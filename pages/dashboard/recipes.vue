<script setup lang="ts">
import { usePreferencesStore } from '~/stores/preferences'
import type { GeneratedRecipe, BaseRecipe } from '~/types'

const recipes = ref<BaseRecipe[]>()

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

</script>

<template>
    <div class="min-h-screen">
        <div class="max-w-4xl mx-auto p-4">
            <div v-if="pending" class="flex justify-center">
                <LucideLoader2 class="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
            <div v-if="error" class="h-[75vh] flex flex-col justify-center items-center sm:mx-10">
                <h2>
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