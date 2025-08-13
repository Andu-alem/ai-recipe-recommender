<script setup lang="ts">
definePageMeta({
    layout: "error-page-layout"
})

defineProps({
  error: Object,
})

</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4">
        <h1 class="text-amber-500 text-4xl">{{ error?.statusCode }}</h1>
        <h1>{{ error?.message }}</h1>
        <p class="text-center">There was an error 😱</p>
        <Button variant="ghost" as-child>
            <NuxtLink to="/">Back to Home</NuxtLink>
        </Button>
    </div>
</template>