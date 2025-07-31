<template>
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader class="border-b border-stone-200">
                <div class="flex items-center space-x-2 px-4 py-3">
                <div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span class="text-lg">🥘</span>
                </div>
                <div>
                    <h1 class="text-lg font-bold text-emerald-800">PantryPal</h1>
                    <p class="text-xs text-stone-600">Smart Recipe Assistant</p>
                </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <LucideHome class="w-4 h-4" />
                                <span>Home</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <LucideSearch class="w-4 h-4" />
                                <span>Find Recipes</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <LucideChefHat class="w-4 h-4" />
                                <span>Add Ingridients</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <LucideBookOpen class="w-4 h-4" />
                                <span>Saved Recipies</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
                    <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LucideHeart class="w-4 h-4" />
                            <span>
                                savedRecipes goes here
                            </span>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
                <SidebarTrigger class="-ml-1" />
                <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span class="text-sm">🥘</span>
                    </div>
                    <span class="font-semibold text-emerald-800">PantryPal</span>
                </div>
            </header>
            <main class="flex-1">
                <slot />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>