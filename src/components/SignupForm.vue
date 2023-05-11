<template>
  <div class="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-blue-900">Create a new account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
            <div class="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                v-model="form.name"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p class="text-red-500 text-xs italic">{{ errors.name[0] }}</p>
            </div>
          </div>
          <!-- Email input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                v-model="form.email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p class="text-red-500 text-xs italic">{{ errors.email[0] }}</p>
            </div>
          </div>

          <!-- Password input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                v-model="form.password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p class="text-red-500 text-xs italic">{{ errors.password[0] }}</p>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                v-model="form.confirmPassword"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p class="text-red-500 text-xs italic">{{ errors.confirmPassword[0] }}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> Or continue with </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <div>
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Github
              </button>
            </div>

            <div>
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray hover:bg-gray-50"
              >
                Google
              </button>
            </div>
            <div>
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import axios from 'axios' // import axios library

export default {
  setup() {
    const form = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const errors = ref({ name: '', email: '', password: '', confirmPassword: '' });

    const submitForm = async () => {

      // if (form.value.password !== form.value.confirmPassword) {
      //   // handle the passwords do not match case
      //   console.error('Passwords do not match')
      //   return
      // }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/api/register`, {
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
          password_confirmation: form.value.confirmPassword,
        })

        // handle the successful case, for instance, redirect to login page
        console.log(response.data)
      } catch (error) {
        // handle the error case, for instance, show error message
        console.error(error)
        if (error.response && error.response.data.errors) {
          // handle form validation errors
          errors.value.name = error.response.data.errors.name || '';
          errors.value.email = error.response.data.errors.email || '';
          errors.value.password = error.response.data.errors.password || '';
          errors.value.confirmPassword = error.response.data.errors.confirmPassword || ''

          console.log(errors.value.confirmPassword)
        }
      }
    }

    return {
      form,
      errors,
      submitForm
    }
  }
}
</script>
