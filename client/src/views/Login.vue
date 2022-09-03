<template>
  <div class="flex justify-center w-[90vw] md:w-[70vw]">
    <div class="w-full md:w-96 px-3 py-4 grid gap-4">
      <p class="uppercase text-2xl font-semibold">Sign in</p>
      <input
        type="text"
        placeholder="username"
        class="py-2 pl-1 bg-transparent text-n-black placeholder:text-n-gray placeholder:pl-1 border border-n-black outline-none"
        v-model="username"
      />
      <input
        type="password"
        placeholder="password"
        class="py-2 pl-1 bg-transparent text-n-black placeholder:text-n-gray placeholder:pl-1 border border-n-black outline-none"
        v-model="password"
      />
      <p
        @click="handleSubmit"
        class="uppercase bg-green-800 text-white px-8 py-3 w-fit cursor-pointer"
      >
        Login
      </p>
      <p class="uppercase underline text-xs cursor-pointer">
        do not remember password?
      </p>

      <router-link :to="{ name: 'Register' }"
        ><p class="uppercase underline text-xs">
          create a new account
        </p></router-link
      >
    </div>
  </div>
  <!-- <div class="login">
    <h2>Login</h2>

    <div class="card">
      <form @submit.prevent="handleSubmit">
        <div>
          <span>
            <label for="">Mobile Number</label>
            <div>
              <input
                type="text"
                placeholder="+234-555-555-555"
                v-model="mobile"
                id="idMobile"
                autofocus
                required
              />
            </div>
          </span>
        </div>

        <div>
          <span>
            <label for="">Password</label>
            <div>
              <input
                :type="passwordFieldType"
                v-model="password"
                @keypress.enter="handleSubmit"
                toggleMask
                :feedback="false"
                placeholder="*******"
                id="idPassword"
                required
              />

              <i
                v-if="togglePassword === true"
                class="fa fa-eye"
                id="right"
                @click="viewPassword"
              />

              <i
                v-else
                class="fa fa-eye-slash"
                id="right"
                @click="viewPassword"
              />
            </div>
          </span>
        </div>

        <router-link :to="{ name: 'ForgotPassword' }">
          <p class="forgot">Forgot password?</p>
        </router-link>

        <CButton class="button" text="Login" size="large" :loading="loading" />
        <button>Login</button>
      </form>
    </div>

 
  </div> -->
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import router from "../router";
import authStore from "../store/authStore";
import { getToken } from "../utils/helpers";
// import CButton from "@/components/CButton.vue";
// import router from "@/router";
// import Toast from "@/components/Toast.vue";
// import SingleToast from "@/components/SingleToast.vue";

onBeforeMount(() => {
  const token = getToken();
  if (token) {
    router.push("/");
  }
});

const loading = ref(false);
const togglePassword = ref(false);
const username = ref("");
const password = ref("");
const passwordFieldType = ref("password");
const idMobile = ref(false);
const idPassword = ref(false);
const showToastModal = ref(false);
const toastMsg = ref("");
const toastType = ref("");

// const validateInput = () => {
//   const mobileValid = !!mobile.value;
//   const passValid = !!password.value;
//   return mobileValid && passValid;
// };

const viewPassword = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
  togglePassword.value = !togglePassword.value;
};

const handleSubmit = () => {
  loading.value = true;
  const data = {
    username: username.value,
    password: password.value,
  };

  // adminStore.actions.adminLogin(data).then((res) => {
  //   loading.value = false;

  //   if (res.success) {
  //     toastMsg.value = res.message;
  //     toastType.value = "success";
  //     showToastModal.value = true;

  //     setTimeout(() => {
  //       router.push("/");
  //     }, 3000);
  //   } else {
  //     toastMsg.value = res.message;
  //     toastType.value = "danger";
  //     showToastModal.value = true;
  //   }
  // });

  authStore.actions.login(data).then((res) => {
    if (res.success) {
      router.push("/");
    } else {
    }
  });
};
</script>

<style scoped>
.login {
  margin: 0px auto;
  height: 100%;
}

.login .card {
  width: 450px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.login .card form > div span {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
}

.login .card form > div label {
  font-weight: 600;
  margin: 5px 0;
}

.login .card form > div > div {
  display: flex;
  position: relative;
}

.login .card form > div > div #left {
  margin-right: -35px;
  margin-top: auto;
  margin-bottom: auto;
  z-index: 10;
}

.login .card form > div > div #right {
  z-index: 10;
}
.login .card form > div > div #idPassword {
  width: 91%;
}
.login .card form > div > div input {
  border: 1px solid;
  border-color: #cee3ff;
  border-radius: 4px;
  padding: 0 1rem;
  height: 48px;
  width: 100%;
  outline: none;
}

.login .card form > div > div input:focus {
  border-color: #0d142f;
}

.login .card form > div > div input:disabled {
  border-color: #e6e6e6;
  background-color: #f5f5f5;
  color: #bdbdbd;
}

.login .card form > div > div input .invalid {
  border-color: red;
  font-weight: 600;
}
a {
  text-decoration: none;
  color: #000;
}

a .forgot {
  float: right;
  font-size: 14px;
  margin-top: -5px;
}

.button {
  width: 100%;
}

button:hover {
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  .login {
    height: 100%;
    padding: 0 10px;
  }
  .login .card {
    width: 250px;
  }

  .login .card form {
    margin: 0 auto;
  }
}

@media screen and (max-width: 880px) {
  .login .card {
    width: 250px;
  }

  .login .card form {
    margin: 0 auto;
  }
}
</style>
