<script setup lang="ts">
import { useSidebar } from './ui/sidebar'
import { authClient } from '~/lib/auth-client'

const { value:{ data } } = authClient.useSession()
const { isMobile } = useSidebar()

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        useRouter().push("/")
      }
    }
  })
}

</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="data?.user.image ?? ''" :alt="data?.user.name" />
              <AvatarFallback class="rounded-lg">
                {{ data?.user.name[0] }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ data?.user.name }}</span>
              <span class="truncate text-xs">{{ data?.user.email }}</span>
            </div>
            <LucideChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="data?.user.image ?? ''" :alt="data?.user.name" />
                <AvatarFallback class="rounded-lg">
                  {{ data?.user.name[0] }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ data?.user.name }}</span>
                <span class="truncate text-xs">{{ data?.user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="signOut">
            <LucideLogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
