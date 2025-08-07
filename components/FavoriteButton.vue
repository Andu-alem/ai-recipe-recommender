<script setup lang="ts">
import type { GeneratedRecipe } from '../types'
import { usePreferencesStore } from '~/stores/preferences'
import { toast } from 'vue-sonner'

const isSaved = ref(false)
const isSaving = ref(false)

const props = defineProps<{
    recipe: GeneratedRecipe,
}>()

const { preference } = usePreferencesStore()

async function saveRecipe() {
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
        isSaved.value = true
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
        class=" bg-white/80 hover:bg-white rounded-full p-2"
        @click="saveRecipe"
    >
        <LucideHeart
            class="w-4 h-4"
            :class="{
                'fill-red-500 text-red-500': isSaved,
                'text-stone-600': false,
                'animate-pulse': isSaving
            }"
        />
    </Button>
</template>