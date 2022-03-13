<template>
  <div class="bg-[#17252a] lg:h-screen h-full flex justify-center items-center">

    <!-- card -->
    <div class="flex flex-col bg-[#3aafa9] rounded-md shadow-lg p-16 mx-10 lg:mx-16 lg:p-16"
    v-motion
    :initial="{ x: 100, opacity: 0}"
    :enter="{
      x: 0,
      opacity: 1,
      transition: {
        type: 'string',
        stiffness: '100'
      }
    }"
    >

      <h1 class="font-bold text-4xl text-[#feffff]" 
      v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="300"
      
      >Register</h1>
      <p class="font-light text-sm mt-3 text-[#dce0e0]"  v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="310">Register in order to login and explore the site!</p>

      <div id="line" class="w-full h-px bg-gray-500 my-2"  v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="320"></div>
      
      <div class="mt-3 "  v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="340">
        <label for="register-email" class="text-[#feffff]">Email <span id="register-email-error" class="text-red-700 text-sm ml-2 hidden"></span></label>
        <input v-model="register_email" id="register-email" name="register-email" class="mt-2 w-full py-1 mb-3 rounded-sm px-2" >
        
        <label for="register-password" class="text-[#feffff]">Password <span id="register-password-error" class="text-red-700 text-sm ml-2 hidden"></span></label>
        <input v-model="register_password" type="password" id="register-password" name="register-password" class="w-full py-1 mt-2 px-2 rounded-sm mb-3">

        <label for="confirm-password" class="text-[#feffff]">Confirm Password <span id="register-confirmed-password-error" class="text-red-700 text-sm ml-2 hidden"></span></label>
        <input v-model="register_confirmed_password" type="password" id="confirm-password" name="confirm-password" class="w-full py-1 mt-2 px-2 rounded-sm">

        <button @click="sendRegisterData" id="register-submit-btn" class="bg-[#17252a] w-1/3 mt-6 py-3 rounded-full text-[#feffff] transition-all transform duration-300 delay-125 focus:ring focus:ring-[#2b7a78]" 
        @mousedown="onMouseDown" @mouseup="onMouseUp" >Register</button>
      </div>


      <!-- others authentication -->
      <!-- <div class="grid grid-rows-1 grid-flow-col mt-6" v-motion
      :initial="{ y: 50, opacity: 0}"
      :enter="{ y: 0, opacity: 1, duraton: 300}"
      :delay="350">
        <div id="line" class=" h-px bg-white mt-3 text-white px-16"/>
        <div class="flex justify-center items-center">
          <p class="text-white justify-items-center">OR</p>
        </div>
      
        <div id="line" class=" h-px bg-white mt-3 px-16 text-white"/>
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      register_email: "",
      register_password: "",
      register_confirmed_password: ""
    }
  },

  methods: {
    onMouseDown() {
      document.getElementById("register-submit-btn").classList.add("scale-[0.90]")
    },
    onMouseUp() {
      document.getElementById("register-submit-btn").classList.remove("scale-[0.90]")
    },

    sendRegisterData() {
      const auth = getAuth();
      const email = this.register_email
      const password = this.register_password
      const confirmed_password = this.register_confirmed_password
      const invalid_email = document.getElementById("register-email-error")
      const invalid_password = document.getElementById("register-password-error")
      const invalid_confirmed_password = document.getElementById("register-confirmed-password")
      
      if(password === confirmed_password ) {
        createUserWithEmailAndPassword(auth, email, password)
        // eslint-disable-next-line no-unused-vars
        .then((userCredential) => {
          // Signed in 
          [ this.register_email, this.register_password, this.register_confirmed_password ] = " "
          this.$router.push({ name: 'authenticated', params: { data: userCredential.user.email }})
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          switch(errorCode) {
            case "auth/email-already-in-use":
              invalid_email.innerText = "*Email is already used"
              invalid_email.classList.remove("hidden")
              break
            case "auth/invalid-password":
              invalid_password.innerText = "*Invalid password (must be more than 6 characters)"
              invalid_password.classList.remove("hidden")
              break
            default:
              console.log(errorCode) 
              break
          }
          // ..
        });

      } else {
        invalid_confirmed_password.innerText = "*Invalid confirmd password"
        invalid_confirmed_password.classList.remove("hidden")
      }
      


    }
  },
}
</script>

<style>

</style>