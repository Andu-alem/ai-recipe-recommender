<script setup lang="ts">
import type { ObjectId } from 'mongoose'
import { toast } from 'vue-sonner'

const { recipeId } = defineProps<{
    recipeId: ObjectId
}>()

const emit = defineEmits(['refetch'])

const deleteRecipe = async () => {
    try {
        await $fetch('/api/favorite', {
            method: 'DELETE',
            body: {
                id: recipeId
            }
        })
        toast.success("Recipe has deleted successfuly")
        emit('refetch')
    } catch {
        toast.error("Unable to delete the recipe, please try again!")
    }
}
</script>
<template>
    <AlertDialog>
        <AlertDialogTrigger>
            <LucideTrash class="text-red-400 hover:text-red-400/75" />
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Quick Checkup
                </AlertDialogTitle>
            </AlertDialogHeader>
            <Separator />
            <div>Are you sure you want to delete this recipe?</div>
            <div class="flex justify-center items-center gap-4">
                <AlertDialogCancel class="m-0 w-20">Cancel</AlertDialogCancel>
                <AlertDialogAction
                    class="w-20 bg-red-800"
                    @click="deleteRecipe"
                >yes</AlertDialogAction>
            </div>
        </AlertDialogContent>
    </AlertDialog>
</template>