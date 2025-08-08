<script setup lang="ts">
import { toast } from 'vue-sonner'
import { authClient } from "~/lib/auth-client"

const { errors, validateForm } = useFormValidation()
const showPassword = ref(false)
const isLoading = ref(false)

const resData = ref({})
const resError = ref({})

const formData = reactive({
  name: "",
  email: "",
  password: ""
})


const passwordChecks = computed(() => ({
  length: formData.password.length >= 8,
  hasUpperCase: /[A-Z]/.test(formData.password),
  hasNumber: /[0-9]/.test(formData.password)
}))


const handleSubmit = async () => {
  if (validateForm(formData, passwordChecks)) {
    try {
      isLoading.value = true
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.email,
        name: formData.name,
      },{
        onSuccess: () => {
          useRouter().push("/dashboard")
        },
        onError: () => {
          toast.error("Error while signing up, please try again")
        }
      })
      resData.value = data ?? {}
      resError.value = error ?? {}
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      isLoading.value = false
    }
  }
}

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
                <p class="text-lg font-semibold leading-relaxed">Welcome</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form class="space-y-2" @submit.prevent="handleSubmit">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <Input 
                    v-model="formData.name"
                    type="text" 
                    placeholder="Your Name"
                    :disabled="isLoading"
                    :class="{ 'border-red-500': errors.name }"
                    required />
                  <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
                </div>

                <div class="space-y-2">
                  <Input 
                    v-model="formData.email" 
                    type="email" 
                    placeholder="Your Email"
                    :disabled="isLoading"
                    :class="{ 'border-red-500': errors.email }"
                    required />
                  <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
                </div>

                <div class="space-y-2">
                  <div class="relative">
                    <Input 
                      v-model="formData.password" 
                      :type="showPassword ? 'text' : 'password'"
                      :disabled="isLoading" 
                      placeholder="Your Password"
                      :class="{ 'border-red-500': errors.password }" />
                    <button 
                      type="button" 
                      class="absolute right-3 top-1/2 -translate-y-1/2" 
                      :disabled="isLoading"
                      @click="showPassword = !showPassword">
                      <LucideEye v-if="!showPassword" class="size-4 text-muted-foreground" />
                      <LucideEyeOff v-else class="size-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div class="space-y-1">
                    <p class="text-sm text-muted-foreground">Password requirements:</p>
                    <ul class="text-sm space-y-1">
                      <li :class="passwordChecks.length ? 'text-green-500' : 'text-muted-foreground'">
                        <span class="inline-block w-4">{{ passwordChecks.length ? '✓' : '•' }}</span>
                        Minimum 8 characters
                      </li>
                      <li :class="passwordChecks.hasUpperCase ? 'text-green-500' : 'text-muted-foreground'">
                        <span class="inline-block w-4">{{ passwordChecks.hasUpperCase ? '✓' : '•' }}</span>
                        At least one uppercase letter
                      </li>
                      <li :class="passwordChecks.hasNumber ? 'text-green-500' : 'text-muted-foreground'">
                        <span class="inline-block w-4">{{ passwordChecks.hasNumber ? '✓' : '•' }}</span>
                        At least one number
                      </li>
                    </ul>
                  </div>
                  <p v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</p>
                </div>

                <Button type="submit" class="mt-2 w-full group" :disabled="isLoading">
                  <span v-if="!isLoading" class="group-hover:translate-x-0.5 transition-transform">
                    Create Account
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <LucideLoader2 class="mr-2 size-4 animate-spin" />
                    Creating...
                  </span>
                  <LucideArrowRight v-if="!isLoading" class="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <GoogleSigninButton />
              </div>
            </form>
            <div class="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>Already registered?</p>
              <NuxtLink to="/sign-in" class="font-medium text-primary hover:text-primary/80 transition-colors">
                Sign in
              </NuxtLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>