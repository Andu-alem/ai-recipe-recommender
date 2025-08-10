<script setup lang="ts">
definePageMeta({
    layout: "error-page-layout"
})

</script>

<template>
    <div class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-primary">Sorry, Error has occured!</h1>
        <p class="text-center">Please try to refresh the page, if it persist go back to home page.</p>
        <Button variant="ghost" as-child>
            <NuxtLink to="/">Back to Home</NuxtLink>
        </Button>
    </div>
</template>