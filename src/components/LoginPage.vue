<template>
  <div class="bg-[#3aafa9] lg:h-screen h-full flex justify-center items-center lg:overflow-hidden">
    
    <!-- card -->
    <div class="flex flex-col bg-[#17252a] rounded-md shadow-lg p-16 lg:mx-16 lg:p-20"
    v-motion
    :initial="{ x: -100, opacity: 0}"
    :enter="{
      x: 0,
      opacity: 1,
      transition: {
        type: 'string',
        stiffness: '100'
      }
    }"
    
    >
      <h1 class="font-bold text-4xl text-[#feffff]" v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="300">Login</h1>

      <p class="font-light text-sm mt-3 text-[#dce0e0]" v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="310">Login to our website and explore it!</p>

      <div id="line" class="w-full h-px bg-gray-500 my-2" v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="320"></div>

      <div class="mt-3 " v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="340">
        <label for="login-email" class="text-[#feffff]">Email <span id="login-email-error" class="text-red-700 text-sm ml-2 hidden"></span></label>
        <input v-model="login_email" id="login-email" name="login-email" class="mt-2 w-full py-1 mb-3 rounded-sm px-2" >
        
        <label for="login-password" class="text-[#feffff]">Password <span id="login-password-error" class="text-red-700 text-sm ml-2 hidden"></span></label>
        <input v-model="login_password" type="password" id="login-password" name="login-password" class="w-full py-1 mt-2 px-2 rounded-sm">

        <button id="login-submit-btn" class="bg-[#3aafa9] w-1/3 mt-6 py-3 rounded-full transition-all transform duration-300 delay-125 focus:ring focus:ring-[#2b7a78]" 
        @mousedown="onMouseDown" @mouseup="onMouseUp" @click="login">Login</button>
      </div>


      <!-- others authentication -->
      <!-- <div class="grid grid-rows-1 grid-flow-col mt-6" v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="350">
        <div id="line" class=" h-px bg-gray-500 mt-3 text-white px-16"/>
        <div class="flex justify-center items-center">
          <p class="text-gray-400 justify-items-center">OR</p>
        </div>
      
        <div id="line" class=" h-px bg-gray-500 mt-3 px-16 text-white"/>
      </div>
      
      <div class="grid grid-cols-3 grid-flow-row gap-x-3 mt-3" v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="360">

        <button id="google" class="h-16 bg-[#feffff] rounded-md">
          <div class="flex justify-start items-center ml-3">
            <img src="../assets/Google_logo.png" class="h-10 w-10 ml-3">
            <div class="flex flex-col justify-center items-center ml-3">
              <p class="text-sm">Sign in with</p>
              <p class="text-sm">Google</p>
            </div>
          </div>

        </button>

        <button id="facebook" class="h-16 bg-[#3b5998] rounded-md">

          <div class="flex justify-start items-center ml-3">
            <img src="../assets/Facebook_logo.png" class="h-10 w-10 ml-3">
            <div class="flex flex-col justify-center items-center ml-3">
              <p class="text-sm text-white">Sign in with</p>
              <p class="text-sm text-white">Facebook</p>
            </div>
          </div>

        </button>

        
        <button id="github" class="h-16 bg-[#21262d] rounded-md">

          <div class="flex justify-start items-center ml-3">
            <img src="../assets/Github_logo.png" class="h-10 w-10 ml-3">
            <div class="flex flex-col justify-center items-center ml-3">
              <p class="text-sm text-white">Sign in with</p>
              <p class="text-sm text-white">Github</p>
            </div>
          </div>

        </button> -->

      </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      login_email: "",
      login_password: ""
    }
  },

  methods: {
    onMouseDown() {
      document.getElementById("login-submit-btn").classList.add("scale-[0.90]")
    },
    onMouseUp() {
      document.getElementById("login-submit-btn").classList.remove("scale-[0.90]")
    },
    async login() {
      const auth = getAuth();
      const email = this.login_email
      const password = this.login_password
      const invalid_email = document.getElementById("login-email-error")
      const invalid_password = document.getElementById("login-password-error")

      await signInWithEmailAndPassword(auth, email, password)
        // eslint-disable-next-line no-unused-vars
        .then((userCredential) => {
          // Signed in 
          [ this.login_email, this.login_password ] = " "

          this.$router.push({ name: 'authenticated', params: { data: userCredential.user.email }})


          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case "auth/wrong-password":
              invalid_password.classList.remove("hidden")
              invalid_password.innerText = "*Wrong password"
              break
            case "auth/invalid-email":
              invalid_email.classList.remove("hidden")
              invalid_password.innerText = "*Invalid Email"
              break
            default:
              console.log(errorCode)
          }
        });
    }
  }
}
</script>

<style>
  body {
    font-family: 'Poppins'
  }
</style>