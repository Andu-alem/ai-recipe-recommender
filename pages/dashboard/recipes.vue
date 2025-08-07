<script setup lang="ts">
import { usePreferencesStore } from '~/stores/preferences'
import type { GeneratedRecipe } from '~/types'

definePageMeta({
    layout: "dashboard"
})

const { preference } = usePreferencesStore()

const { data, pending, error, refresh } = await useFetch<GeneratedRecipe[]>('/api/recipe', {
    method: 'POST',
    body: JSON.stringify(preference)
})

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
                <Card
                    v-for="recipe in data"
                    :key="recipe.name"
                    class="shadow-lg gap-0 cursor-pointer hover:shadow-xl transition-shadow"
                >
                    <CardHeader>
                        <CardTitle class="flex justify-between items-center px-2">
                            <h3 class="font-semibold">{{recipe.name}}</h3>
                            <FavoriteButton :recipe />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Separator />
                        <div class="text-sm space-y-1">
                            <h3 class="text-primary font-semibold">Instructions</h3>
                            <div v-for="instruction, index in recipe.instructions" :key="instruction">
                                {{ index+1 }} - {{ instruction }}
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-2 text-sm text-foreground/85 my-4">
                            <div class="flex items-center space-x-1">
                                <LucideClock class="w-4 h-4" />
                                <span>{{recipe.cookTime}}</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <LucideUsers class="w-4 h-4" />
                                <span>{{recipe.servings}} servings</span>
                            </div>
                            <Badge variant="outline" class="text-xs">
                                {{preference?.skillLevel}}
                            </Badge>
                        </div>
                        <div class="flex flex-wrap gap-1 mb-3">
                            <Badge v-for="tag in recipe.tags" :key="tag" variant="secondary" class="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100">
                                {{tag}}
                            </Badge>
                        </div>
                        <div class="text-xs text-foreground/85">You have: {{preference?.ingredients}}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>