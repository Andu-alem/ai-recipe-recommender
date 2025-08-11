<script setup lang="ts">
import type { SidebarProps } from '~/components/ui/sidebar'
import { useSidebar } from './ui/sidebar/utils'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const { toggleSidebar } = useSidebar()

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
                          <span class="truncate font-semibold text-emerald-800 dark:text-emerald-400">
                              ChefGPT
                          </span>
                          <span class="truncate text-xs text-forground/75">Smart Recipe Assistant</span>
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
                      <SidebarMenuButton as-child @click="toggleSidebar">
                            <NuxtLink to="/dashboard" class="flex items-center gap-2">
                                <LucideChefHat class="w-4 h-4" />
                                <span>Generate Recipes</span>
                            </NuxtLink>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton as-child @click="toggleSidebar">
                            <NuxtLink to="/dashboard/favourites" class="flex items-center gap-2">
                                <LucideBookOpen class="w-4 h-4" />
                                <span>Saved Recipies</span>
                            </NuxtLink>
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