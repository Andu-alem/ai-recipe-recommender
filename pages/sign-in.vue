<script setup lang="ts">
import { toast } from 'vue-sonner';
import { authClient } from "~/lib/auth-client"

const showPassword = ref(false);
const isLoading = ref(false);

const resData = ref({})
const resError = ref({})

const formData = reactive({
  email: "",
  password: ""
});


const handleSubmit = async () => {
    try {
        isLoading.value = true;
        const { data, error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.email,
        },{
            onSuccess: () => {
                useRouter().push("/dashboard")
            },
            onError: () => {
                toast.error("Error while logging in, please try again")
            }
        })
        resData.value = data ?? {}
        resError.value = error ?? {}
    } catch (error) {
        console.error('Registration error:', error);
    } finally {
        isLoading.value = false;
    }
};

const signInWithGoogle = async () => {
  try {
    isLoading.value = true;
    // Simulate Google OAuth integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sign in with Google clicked');
  } catch (error) {
    console.error('Google sign-in error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="py-7">
    <div class="container">
      <div class="flex justify-center items-center">
        <Card class="w-11/12 sm:w-7/12 md:w-1/3">
          <CardHeader>
            <div class="flex flex-col items-center">
              <div class="flex flex-col items-center">
                <NuxtLink to="/" class="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span class="text-3xl">🥘</span>
                </NuxtLink>
                <NuxtLink to="/" class="text-4xl font-bold text-emerald-800">ChefGPT</NuxtLink>
                <p class="text-lg font-semibold leading-relaxed">Welcome Back</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form class="space-y-2" @submit.prevent="handleSubmit">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <Input 
                    v-model="formData.email" 
                    type="email" 
                    placeholder="Your Email"
                    :disabled="isLoading"
                    required />
                </div>

                <div class="space-y-2">
                  <div class="relative">
                    <Input 
                      v-model="formData.password" 
                      :type="showPassword ? 'text' : 'password'"
                      :disabled="isLoading" 
                      placeholder="Your Password" />
                    <button 
                      type="button" 
                      class="absolute right-3 top-1/2 -translate-y-1/2" 
                      :disabled="isLoading"
                      @click="showPassword = !showPassword">
                      <LucideEye v-if="!showPassword" class="size-4 text-muted-foreground" />
                      <LucideEyeOff v-else class="size-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <Button type="submit" class="mt-2 w-full group" :disabled="isLoading">
                  <span v-if="!isLoading" class="group-hover:translate-x-0.5 transition-transform">
                    Sign In
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <LucideLoader2 class="mr-2 size-4 animate-spin" />
                    Signing In...
                  </span>
                  <LucideArrowRight v-if="!isLoading" class="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button variant="outline" class="w-full group" :disabled="isLoading" @click="signInWithGoogle">
                  <GoogleLogo />
                  <span class="group-hover:translate-x-0.5 transition-transform">
                    Sign in with Google
                  </span>
                </Button>
              </div>
            </form>
            <div class="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>New ?</p>
              <NuxtLink to="/signup" class="font-medium text-primary hover:text-primary/80 transition-colors">
                Sign Up
              </NuxtLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>