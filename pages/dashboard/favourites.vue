<script setup lang="ts">
import type { Recipe } from '~/types'

definePageMeta({
    layout: "dashboard"
})


const { data, pending, error, refresh } = await useFetch<Recipe[]>('/api/favorite')

</script>

<template>
    <div class="min-h-screen">
        <div class="max-w-4xl mx-auto p-4">
            <div v-if="pending" class="flex justify-center">
                <LucideLoader2 class="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
            <div v-if="error" class="h-[75vh] flex flex-col justify-center items-center sm:mx-10">
                <h2>
                    It seems like error has occured, would you like to go back and generate new preferences? 
                </h2>
                <div class="mt-4 flex gap-4">
                    <Button as-child>
                        <NuxtLink to="/dashboard">Generate Recipes</NuxtLink>
                    </Button>
                    <Button variant="ghost" @click="refresh">
                        Refresh
                    </Button>
                </div>
            </div>
            <div v-if="data && data.length < 1" class="h-[75vh] flex flex-col justify-center items-center">
                <div class="w-[70%] flex flex-col justify-center items-center gap-4">
                    <h3 class="text-center">No favorite recipe found! Please gnerate a recipe and add to favorites</h3>
                    <Button as-child>
                        <NuxtLink to="/dashboard">Generate Rcipes</NuxtLink>
                    </Button>
                </div>
            </div>
            <div v-if="data && data.length > 1" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <RecipeCard v-for="recipe in data" :key="recipe.name" :recipe="recipe" :is-generated="false" />
            </div>
        </div>
    </div>
</template>