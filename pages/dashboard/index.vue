<script setup lang="ts">
import { useForm } from 'vee-validate'
import { formSchema } from '~/lib/preferenceSchema'
import { usePreferencesStore } from '~/stores/preferences'
import type { Preference } from '~/types'

definePageMeta({
    layout: "dashboard"
})

const ingredientInput = ref<string|undefined>()
const ingredientsList = computed(() => {
    const separated = ingredientInput.value?.split(",")
    
    return separated?.map(item => item.trim()).filter(item => item !== "")
})

// fetch initial preferences
const { data } = await useFetch<Preference>('/api/preference')

const restrictions = ["vegan", "vegetarian", "raw-food", "pescatarian", "gluten-free", "lactose-intolerance", "nut-free", "soy-free", "egg-free", "shelifish-free", "low-sugar", "low-sodium", "keto", "halal", "kosher"]
const mealTypeOptions = ["breakfast", "lunch", "dinner", "snack", "dessert"]
const skillLevelOptions = ["beginner", "intermediate", "expert"]
const flavorOptions = ["spicy", "sweet", "sour", "savory", "sild", "bitter", "salty", "smoky", "tangy", "earthy", "herbal"]

const preferenceStore = usePreferencesStore()
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    dietaries: data.value?.dietaries ?? [],
    mealType: data.value?.mealType,
    cookingTime: data.value?.cookingTime ?? [30],
    skillLevel: data.value?.skillLevel,
    ingredients: data.value?.ingredients,
    flavors: data.value?.flavors ?? [],
    cuisine: data.value?.cuisine
  },
})

const onSubmit = handleSubmit((values) => {
  preferenceStore.addPreference(values, data.value?._id)
  useRouter().push("/dashboard/recipes")
})
</script>

<template>
  <div>
    <form class="grid gap-6 md:grid-cols-2 mx-2 my-4" @submit="onSubmit">
      <Card class="gap-0">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <Separator />
          <!-- Dietary Restrictions Field -->
          <FormField name="dietaries">
            <FormItem>
              <div class="mb-2">
                <FormLabel class="text-base text-emerald-800 dark:text-emerald-500">
                  What are your dietary choices?
                </FormLabel>
              </div>
              <div class="flex flex-wrap gap-3">
                <FormField v-for="restriction in restrictions" v-slot="{ value, handleChange }" :key="restriction" type="checkbox" :value="restriction" :unchecked-value="false" name="dietaries">
                  <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        :model-value="value.includes(restriction)"
                        @update:model-value="handleChange"
                      />
                    </FormControl>
                    <FormLabel class="font-normal capitalize">
                      {{ restriction }}
                    </FormLabel>
                  </FormItem>
                </FormField>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex items-center gap-7">
            <!-- Meal Type Selection Field -->
            <FormField v-slot="{ componentField }" name="mealType">
              <FormItem>
                <FormLabel class="text-base text-emerald-800 dark:text-emerald-500">Meal Type</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                      <SelectTrigger class="rounded-xl">
                          <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem v-for="option in mealTypeOptions" :key="option" :value="option" class="capitalize">{{ option }}</SelectItem>
                      </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Cuisine Input Section -->
            <FormField v-slot="{ componentField }" name="cuisine">
              <FormItem>
                <FormLabel class="text-base text-emerald-800 dark:text-emerald-500">Cusine Preference</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg. Thai or Italian or Chinese ..."
                    class="text-base border-stone-200 rounded-xl"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <!-- Available Cooking Time Selection -->
          <FormField v-slot="{ componentField, value }" name="cookingTime">
            <FormItem>
              <FormLabel class="text-base text-emerald-800 dark:text-emerald-500">Available Cooking Time</FormLabel>
              <FormControl>
                <Slider
                  :model-value="componentField.modelValue"
                  :default-value="[30]"
                  :max="120"
                  :min="0"
                  :step="15"
                  @update:model-value="componentField['onUpdate:modelValue']"
                />
                <FormDescription class="flex justify-between">
                  <span>How many available minitues do you have?</span>
                  <span>{{ value?.[0] }} min</span>
                </FormDescription>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Dietary Restrictions Field -->
          <FormField name="flavors">
            <FormItem>
              <FormLabel class="text-base text-emerald-800 dark:text-emerald-500">
                Flavor Preferences
              </FormLabel>
              <div class="flex flex-wrap gap-4">
                <FormField v-for="flavor in flavorOptions" v-slot="{ value, handleChange }" :key="flavor" type="checkbox" :value="flavor" :unchecked-value="false" name="flavors">
                  <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        :model-value="value.includes(flavor)"
                        @update:model-value="handleChange"
                      />
                    </FormControl>
                    <FormLabel class="font-normal capitalize">
                      {{ flavor }}
                    </FormLabel>
                  </FormItem>
                </FormField>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Skill Level selection section -->
          <FormField v-slot="{ componentField }" name="skillLevel">
            <FormItem>
              <FormLabel class="text-base text-emerald-800 dark:text-emerald-500">What is your skill level?</FormLabel>
              <FormControl>
                <RadioGroup
                    v-bind="componentField"
                    class="space-y-2"
                >
                    <div class="flex flex-wrap gap-4">
                        <div v-for="option in skillLevelOptions" :key="option" class="flex items-center space-x-2">
                            <RadioGroupItem :id="option" :value="option" />
                            <Label for="beginner" class="capitalize">
                                {{  option  }}
                            </Label>
                        </div>
                    </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6 h-full space-y-4 flex flex-col items-center justify-center">
          <FormField v-slot="{ handleChange, value }" name="ingredients">
            <FormItem class="w-full flex flex-col items-center">
              <FormLabel class="text-base text-emerald-800 dark:text-emerald-500">What's in your pantry?</FormLabel>
              <FormControl>
                <div class="relative w-full">
                  <LucideSearch class="absolute left-3 top-2 w-5 h-5 text-stone-400" />
                  <Input
                      placeholder="Enter ingredients (comma-separated)"
                      class="pl-10 py-3 text-base border-stone-200 rounded-xl"
                      :model-value="value"
                      @update:model-value="$event => {
                        ingredientInput = String($event)
                        handleChange($event)
                      }"
                  />
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>
                <div class="space-x-1">
                  <Badge v-for="ingredient in ingredientsList" :key="ingredient" class="bg-emerald-100 text-emerald-800 capitalize">{{ ingredient }}</Badge>
                </div>
              </FormDescription>
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full">Generate Recipes</Button>
        </CardContent>
      </Card>
    </form>
  </div>
</template>