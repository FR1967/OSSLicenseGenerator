<template>
  <v-container>
    <v-row >
      <v-col cols="12" sm="1" class="mt-8"></v-col>
      <v-col cols="12" sm="10" class="mt-8">
        <h1 class="text-center mb-5">
          Welcome to OSSLicenseGenerator
        </h1>
        <p>This website is intended to help developers who are in the process of programming an open source software to find a license for this program. This is to be done by answering certain questions. The corresponding answers in combination will provide the developer with several results after submitting the questionnaire.</p>
        <p>Currently, the questionnaire only returns results if the developer is the original author of the program, or if the program used is not yet licensed.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" class="mt-8">
        <h3 class="mb-2">Start the survey!</h3>

        <p>You want to know which license fits best to your project and how you can generate revenue with it? To start the survey go to the <router-link to="/survey">Survey page</router-link></p>
      </v-col>
      <v-col cols="12" sm="4" class="mt-8">
        <h3 class="mb-2">Check supported license!</h3>
        <p>The survey currently supports 11 licenses. To see all licenses go to the <router-link to="/license">License page</router-link></p>
      </v-col>
      <v-col cols="12" sm="4" class="mt-8">
        <h3 class="mb-2">Issues or questions?</h3>
        <p>If you have any questions, comments or if you have found any bugs go to the <router-link to="/about">About page</router-link></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>

