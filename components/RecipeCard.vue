<script lang="ts" setup>
import type { Recipe, BaseRecipe } from '~/types'

const props = defineProps<{
    recipe: Recipe | BaseRecipe
}>()

</script>

<template>
    <Card
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
</template>