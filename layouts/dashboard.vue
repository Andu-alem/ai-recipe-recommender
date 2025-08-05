<script setup lang="ts"></script>
<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
                <SidebarTrigger class="-ml-1" />
                <div class="flex items-center space-x-2">
                    <div class="flex aspect-square size-8 items-center justify-center rounded-full bg-emerald-500 text-sidebar-primary-foreground">
                        <span class="text-lg">🥘</span>
                    </div>
                    <span class="font-semibold text-emerald-800">ChefGPT</span>
                </div>
            </header>
            <main class="flex-1">
                <slot />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>