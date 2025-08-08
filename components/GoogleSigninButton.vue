<script setup lang="ts">
import { authClient } from "~/lib/auth-client"
import { toast } from 'vue-sonner'

const isLoading = ref(false)
    
const signInWithGoogle = async () => {
    try {
        isLoading.value = true
        authClient.signIn.social({
            provider: 'google',
            fetchOptions: {
                onError: () => {
                    toast.error("Something went wrong, please try again")
                }
            },
            callbackURL: '/dashboard',
        })
    } catch (error) {
        toast.error('Google sign-in error:')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <Button variant="outline" class="w-full group" :disabled="isLoading" @click="signInWithGoogle">
        <LucideLoader2 v-if="isLoading" class="mr-2 size-4 animate-spin" />
        <GoogleLogo v-else />
        <span class="group-hover:translate-x-0.5 transition-transform">
            {{ isLoading ? 'Signing in...' : 'Sign in with Google' }}
        </span>
    </Button>
</template>