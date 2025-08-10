<script setup lang="ts">
definePageMeta({
    layout: "error-page-layout"
})

</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4">
        <h1 class="text-primary">404</h1>
        <h3>It seems you're lost</h3>
        <p class="text-center">The page you're looking for doesn't exist</p>
        <Button variant="ghost" as-child>
            <NuxtLink to="/">Back to Home</NuxtLink>
        </Button>
    </div>
</template>