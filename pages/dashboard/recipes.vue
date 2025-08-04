<script setup lang="ts">
import { usePreferencesStore } from '~/stores/preferences'

definePageMeta({
    layout: "dashboard"
})

const pref = usePreferencesStore()
console.log("user preferences are ---- ", pref.preferences)

interface Recipe {
    id: number
    name: string
    image: string
    cookTime: string
    difficulty: string
    servings: number
    tags: string[]
    ingredients: string[]
    instructions: string[]
    userHasIngredients: string[]
}

const mockRecipes: Recipe[] = [
    {
        id: 1,
        name: "Mediterranean Chickpea Salad",
        image: "/placeholder.svg?height=200&width=300",
        cookTime: "15 min",
        difficulty: "Beginner",
        servings: 4,
        tags: ["Vegan", "Gluten-Free", "Healthy"],
        ingredients: ["Chickpeas", "Cucumber", "Tomatoes", "Red onion", "Olive oil", "Lemon juice", "Parsley"],
        instructions: [
        "Drain and rinse chickpeas",
        "Dice cucumber, tomatoes, and red onion",
        "Mix all vegetables with chickpeas",
        "Whisk olive oil and lemon juice",
        "Toss salad with dressing and parsley",
        ],
        userHasIngredients: ["Chickpeas", "Cucumber", "Olive oil"],
    },
    {
        id: 2,
        name: "Creamy Mushroom Pasta",
        image: "/placeholder.svg?height=200&width=300",
        cookTime: "25 min",
        difficulty: "Intermediate",
        servings: 2,
        tags: ["Vegetarian", "Comfort Food"],
        ingredients: ["Pasta", "Mushrooms", "Heavy cream", "Garlic", "Parmesan", "Butter"],
        instructions: [
        "Cook pasta according to package directions",
        "Sauté mushrooms and garlic in butter",
        "Add cream and simmer",
        "Toss with pasta and parmesan",
        "Season and serve hot",
        ],
        userHasIngredients: ["Pasta", "Mushrooms", "Garlic"],
    },
    {
        id: 3,
        name: "Asian Stir-Fry Bowl",
        image: "/placeholder.svg?height=200&width=300",
        cookTime: "20 min",
        difficulty: "Beginner",
        servings: 3,
        tags: ["Healthy", "Quick", "Gluten-Free"],
        ingredients: ["Rice", "Broccoli", "Carrots", "Soy sauce", "Ginger", "Sesame oil"],
        instructions: [
        "Cook rice in rice cooker",
        "Heat oil in wok or large pan",
        "Stir-fry vegetables until tender-crisp",
        "Add sauce and toss",
        "Serve over rice",
        ],
        userHasIngredients: ["Rice", "Broccoli", "Carrots"],
    },
]
    

</script>

<template>
    <div class="min-h-screen bg-stone-50">
        <div class="max-w-4xl mx-auto p-4">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card
                    v-for="recipe in mockRecipes"
                    :key="recipe.id"
                    class="shadow-lg gap-0 border-0 cursor-pointer hover:shadow-xl transition-shadow"
                >
                    <CardHeader>
                        <CardTitle class="flex justify-between items-center px-2">
                            <h3 class="font-semibold text-stone-800">{{recipe.name}}</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                class=" bg-white/80 hover:bg-white rounded-full p-2"
                            >
                                <LucideHeart
                                    class="w-4 h-4"
                                    :class="{
                                        'fill-red-500 text-red-500': true ,
                                        'text-stone-600': false
                                    }"
                                />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="p-3">
                        <Separator />
                        <div class="text-sm my-2">
                            <h3 class="text-primary font-semibold">Instructions</h3>
                            <div v-for="instruction, index in recipe.instructions" :key="instruction">
                                {{ index+1 }} - {{ instruction }}
                            </div>
                        </div>
                        <div class="flex items-center space-x-4 text-sm text-stone-600 mb-3">
                            <div class="flex items-center space-x-1">
                                <LucideClock class="w-4 h-4" />
                                <span>{{recipe.cookTime}}</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <LucideUsers class="w-4 h-4" />
                                <span>{{recipe.servings}} servings</span>
                            </div>
                            <Badge variant="outline" class="text-xs">
                                {{recipe.difficulty}}
                            </Badge>
                        </div>
                        <div class="flex flex-wrap gap-1 mb-3">
                            <Badge v-for="tag in recipe.tags" :key="tag" variant="secondary" class="text-xs bg-emerald-100 text-emerald-700">
                                {{tag}}
                            </Badge>
                        </div>
                        <div class="text-xs text-stone-500">You have: {{recipe.userHasIngredients.join(", ")}}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>