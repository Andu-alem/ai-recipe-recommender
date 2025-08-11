<script lang="ts" setup>
import type { BaseRecipe } from '~/types'

const { recipe } = defineProps<{
    recipe: BaseRecipe
}>()
</script>

<template>
    <Card
        class="shadow-lg gap-2 cursor-pointer hover:shadow-xl transition-shadow"
    >
        <CardHeader>
            <CardTitle class="flex justify-between items-center px-2">
                <h3 class="font-semibold leading-5">{{recipe.name}}</h3>
                <FavoriteButton :recipe />
            </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
            <Separator />
            <div class="flex flex-wrap items-center gap-2">
                <Badge variant="outline" class="text-amber-500">
                    <div class="flex items-center space-x-1">
                        <LucideClock class="" />
                        <span>{{recipe.cookTime}}</span>
                    </div>
                </Badge>
                <Badge variant="outline" class="text-amber-500">
                    <div class="flex items-center space-x-1">
                        <LucideUsers class="" />
                        <span>{{recipe.servings}} servings</span>
                    </div>
                </Badge>
                <Badge variant="outline" class="text-amber-500 capitalize">{{ recipe.cuisine }}</Badge>
                <Badge variant="outline" class="text-amber-500 capitalize">{{ recipe.mealType }}</Badge>
                <Badge variant="outline" class="text-amber-500 capitalize">{{ recipe.skillLevel }}</Badge>
            </div>

            <!-- Nutrition info -->
            <div class="flex flex-wrap items-center gap-1">
                <Badge v-for="flavor in recipe.flavors" :key="flavor" variant="secondary" class="capitalize">{{ flavor }}</Badge>
            </div>
            <div>
                <p class="font-thin">{{ recipe.nutritionInfo }}</p>
            </div>

            <!-- Ingredients list -->
            <div class="space-y-2 text-sm">
                <Collapsible>
                    <CollapsibleTrigger class="w-full">
                        <div class="w-full flex justify-between items-center">
                            <span class="text-primary font-semibold">Needed Ingredients</span>
                            <LucideChevronDown class="text-accent font-semibold" />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent class="text-sm tracking-wide font-thin">
                        <div v-for="ingredient in recipe.ingredients" :key="ingredient">
                            {{ ingredient }}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <p class="text-xs text-foreground/85">You have : <span class="capitalize">{{ recipe.userIngredients }}</span></p>
            </div>

            <!-- Dietary Restrictions liste -->
            <div class="space-y-2 text-sm">
                <h3 class="text-primary font-semibold">Dietary Restrictions</h3>
                <div class="flex flex-wrap items-center gap-2">
                    <Badge v-for="restriction in recipe.dietaries" :key="restriction" variant="outline" class="capitalize">
                        {{ restriction }}
                    </Badge>
                </div>
            </div>

            <!-- Instructions -->
            <Collapsible>
                <CollapsibleTrigger class="w-full">
                    <div class="w-full flex justify-between items-center">
                        <span class="text-primary font-semibold">Instructions</span>
                        <LucideChevronDown class="text-accent font-semibold" />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent class="text-sm tracking-wide font-thin">
                    <div v-for="instruction, index in recipe.instructions" :key="instruction">
                        {{ index+1 }} - {{ instruction }}
                    </div>
                </CollapsibleContent>
            </Collapsible>
            
            <div class="flex flex-wrap gap-1">
                <Badge v-for="tag in recipe.tags" :key="tag" class="text-xs">
                    {{tag}}
                </Badge>
            </div>
        </CardContent>
    </Card>
</template>