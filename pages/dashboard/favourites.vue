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
                <Card
                    v-for="recipe in data"
                    :key="recipe.name"
                    class="shadow-lg gap-2 cursor-pointer hover:shadow-xl transition-shadow"
                >
                    <CardHeader>
                        <CardTitle class="flex justify-between items-center px-2">
                            <h3 class="font-semibold">{{recipe.name}}</h3>
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <Separator />
                        <div class="text-sm space-y-1">
                            <h3 class="text-primary font-semibold">Instructions</h3>
                            <div v-for="instruction, index in recipe.instructions" :key="instruction">
                                {{ index+1 }} - {{ instruction }}
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-2 text-sm text-foreground/85">
                            <div class="flex items-center space-x-1">
                                <LucideClock class="w-4 h-4" />
                                <span>{{recipe.cookTime}}</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <LucideUsers class="w-4 h-4" />
                                <span>{{recipe.servings}} servings</span>
                            </div>
                            <Badge variant="outline" class="text-xs">
                                {{recipe.skillLevel}}
                            </Badge>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            <Badge v-for="ingredient in recipe.ingredients" :key="ingredient" variant="secondary" class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100">
                                {{ingredient}}
                            </Badge>
                        </div>
                        <div class="text-xs text-foreground/85">You have: {{recipe.userIngredients}}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>