<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <h1 class="font-bold text-4xl text-['Poppins']">Successfully Authenticated!</h1>
    <p class="text-xl text-['Poppins']  text-gray-500 mt-3" >Your email is: {{ email }} </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: this.$route.params.data
    }
  }
}
</script>

<style>

</style>