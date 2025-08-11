<script setup lang="ts">
import type { GeneratedRecipe } from '../types'
import { usePreferencesStore } from '~/stores/preferences'
import { toast } from 'vue-sonner'

const isSaved = ref(false)
const isSaving = ref(false)
const isSuccessful = ref(false)

const props = defineProps<{
    recipe: GeneratedRecipe,
}>()

const { preference } = usePreferencesStore()

async function saveRecipe() {
    if (isSaved.value) {
        toast.warning("Already saved!")
        return
    }
    isSaving.value = true
    try {
        await $fetch('/api/favorite', {
            method: 'POST',
            body: {
                ...preference,
                userIngredients: preference?.ingredients ?? '',
                ...props.recipe
            }
        })
        isSuccessful.value = true
        isSaved.value = true
        toast.success("Recipe saved successfuly.")
    } catch {
        // make a toast here to notify a user about the error
        toast.error("Error has occured here, do something")
    } finally {
        isSaving.value = false
    }
}

</script>

<template>
    <Button
        variant="ghost"
        size="sm"
        class=" rounded-full p-2"
        @click="saveRecipe"
    >
        <LucideHeart
            class="w-4 h-4"
            :class="{
                'fill-amber-500 text-amber-500': isSuccessful,
                'animate-pulse': isSaving
            }"
        />
    </Button>
</template>