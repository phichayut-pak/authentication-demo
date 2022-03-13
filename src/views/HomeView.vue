<template>
  <div class="lg:grid lg:grid-cols-2 lg:grid-flow-row lg:justify-center lg:content-center w-screen h-screen">
    <LoginPage/>
    <RegisterPage/>
  </div>
</template>

<script>
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
export default { 
  components: {
    LoginPage, RegisterPage
  }
}
</script>

<style>

</style>