<script setup lang="ts">
    definePageMeta({
        layout: "dashboard"
    })
    const ingredientInput = ref<string|undefined>()
    const dietary = ref([])
    const selectedMealType = ref("")
    const flavor = ref([])
    const skillLevel = ref("beginner")
    const cookingTime = ref([])
    const ingredients = computed(() => {
        const separated = ingredientInput.value?.split(",")
        
        return separated?.map(item => item.trim()).filter(item => item !== "")
    })
    
    const restrictions = ["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Halal", "Kosher"]
    const mealTypeOptions = ["breakfast", "lunch", "dinner", "snack", "dessert"]
    const skillLevelOptions = ["beginner", "intermediate", "expert"]
    const flavorOptions = ["Spicy", "Sweet", "Savory", "Mild"]
</script>

<template>
    <div class="grid gap-6 md:grid-cols-2 mx-2 my-4">
        <Card class="gap-0">
            <CardHeader>
                <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
                <Separator />
                <!-- Restrictions section -->
                <div class="space-y-2">
                    <div class="font-semibold text-primary">Dietary Restrictions</div>
                    <div class="flex flex-wrap gap-4">
                        <div v-for="restriction in restrictions" :key="restriction" class="flex items-center space-x-2">
                            <input
                                :id="restriction"
                                v-model="dietary"
                                type="checkbox"
                                :value="restriction"
                            >
                            <Label :html-for="restriction" class="text-stone-600">
                                {{restriction}}
                            </Label>
                        </div>
                    </div>
                </div>

                <!-- Meal Type section -->
                <div class="space-y-2">
                    <div class="font-semibold text-primary">Meal Type</div>
                    <Select v-model="selectedMealType">
                        <SelectTrigger class="rounded-xl">
                            <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="option in mealTypeOptions" :key="option" :value="option" class="capitalize">{{ option }}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                 <!-- Cooking Time Section -->
                <div class="space-y-2">
                    <div class="font-semibold text-primary">Available Cooking Time</div>
                    <div class="px-2">
                        <Slider
                            v-model="cookingTime"
                            max={120}
                            min={15}
                            step={15}
                            class="w-full"
                        />
                    </div>
                    <div class="text-center text-stone-600">{{cookingTime}} minutes</div>
                </div>

                <!-- Flavor Preferences -->
                <div class="space-y-2">
                    <div class="font-semibold text-primary">Flavor Preferences</div>
                    <div class="flex flex-wrap gap-4">
                        <div v-for="option in flavorOptions" :key="option" class="flex items-center space-x-2">
                            <input
                                :id="option"
                                v-model="flavor"
                                type="checkbox"
                                :value="option"
                            >
                            <Label :for="option" class="text-stone-600 capitalize">
                                {{ option }}
                            </Label>
                        </div>
                    </div>
                </div>

                <!-- Cooking Skill Level -->
                <div class="space-y-2">
                    <div class="font-semibold text-primary">Cooking Skill Level</div>
                    <RadioGroup
                        v-model="skillLevel"
                        class="space-y-2"
                    >
                        <div class="flex flex-wrap gap-4">
                            <div v-for="option in skillLevelOptions" :key="option" class="flex items-center space-x-2">
                                <RadioGroupItem :id="option" :value="option" />
                                <Label for="beginner" class="text-stone-600 capitalize">
                                    {{  option  }}
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent class="p-6 h-full space-y-4 flex flex-col items-center justify-center">
                <div class="relative w-full">
                    <LucideSearch class="absolute left-3 top-2 w-5 h-5 text-stone-400" />
                    <Input
                        v-model="ingredientInput"
                        placeholder="Enter ingredients (comma-separated)"
                        class="pl-10 py-3 text-base border-stone-200 rounded-xl"
                    />
                </div>
                <div class="space-x-2">
                    <Badge v-for="ingredient in ingredients" :key="ingredient" class="bg-emerald-100 text-emerald-700">{{ ingredient }}</Badge>
                </div>
                <Button class="w-full">Generate Recipes</Button>
            </CardContent>
        </Card>
    </div>
</template>