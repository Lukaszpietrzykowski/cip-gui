<template>
  <section class="login-panel">
    <img src="../../assets/logo.webp" width="300"/> 

    <p v-if="showError" class="alert alert-danger mt-3">Niepoprawny login lub hasło</p>

    <form @submit.prevent="login(email, password)" class="mt-4">
      <div class="form-group">
        <label for="email">Login</label>
        <input type="text" class="form-label" placeholder="Twój login" v-model="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="password">Hasło</label>
        <input type="password" class="form-label" placeholder="Twoje hasło" v-model="password" name="password" required>
      </div>

      <button type="submit" class="button">Zaloguj się</button>
    </form>
  </section>
</template>

<style scoped>
  @import "style.scss";
</style>




<script>
import axios from 'axios';
import { baseUrl } from '@/utilities/data';
import { setRole, role } from '@/utilities/role';

export default {
  name: 'LoginPanel',
  data() {
    return {
      email: "",
      password: "",
      showError: false
    }
  },

  methods: {
    getUserData() {
      axios.get(`${baseUrl}/user/details/?login=${this.email}`)
        .then(response => {
          this.users = response.data
          console.log(response.data)
          if (response.status === 200) {
            setRole(response.data.role);
            localStorage.setItem('userRole', response.data.role)
            console.log(role)
          }
        })
    },
    login(email, password) {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);
      axios.post(`${baseUrl}/login`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }).then(response => {
        console.log(response.status)
        if (response.status === 200) {
          localStorage.setItem('loggedIn', 'true')

        }
      }).then(() => {
        this.getUserData();
      }).then(() => {
        this.$router.push({ path: '/hospitals' })
      }).catch((error) => {
        if (error.response.status === 401 || error.response.status === 500) {
          this.showError = true;
        }
      })
    }
  }
}
</script>



