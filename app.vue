<script setup lang="ts">
import 'vue-sonner/style.css'
</script>

<template>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
      <Toaster position="bottom-right" rich-colors />
    </NuxtLayout>
</template>
