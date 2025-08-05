<script setup lang="ts">
import type { SidebarProps } from '~/components/ui/sidebar';

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

</script>
<template>
  <Sidebar v-bind="props">
      <SidebarHeader>
          <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton            
                      size="lg"
                      class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                      <div class="flex aspect-square size-8 items-center justify-center rounded-full bg-emerald-500 text-sidebar-primary-foreground">
                          <span class="text-lg">🥘</span>
                      </div>
                      <div class="grid flex-1 text-left text-sm leading-tight">
                          <span class="truncate font-semibold text-emerald-800">
                              ChefGPT
                          </span>
                          <span class="truncate text-xs text-stone-600">Smart Recipe Assistant</span>
                      </div>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
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
      <SidebarFooter>
          <SidebarFooterNav />
      </SidebarFooter>
  </Sidebar>
</template>