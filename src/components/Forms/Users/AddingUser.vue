<template>
  <section>
    <BackButton routeType="users" />
    <div class="formWrapper">
      <div class="formTitle">
            <h1>Dodawanie użytkownika</h1>
          </div>
      <div class="formContent">
        <span>Wprowadź dane użytkownika</span>
        <form v-on:submit.prevent="this.addUser()" class="formFlex">
          <span>*E-mail</span>
          <input class="formInput" type="email" v-model="newUser.email" placeholder="E-mail" required>
          <span>*Login</span>
          <input class="formInput" type="text" v-model="newUser.login" placeholder="Login" required>
          <span>*Hasło</span>
          <input class="formInput" type="password" v-model="newUser.password" placeholder="Hasło" required>
          <span>*Uprawnienia</span>
          <label for="ADMIN">
            <input value="ADMIN" type="radio" v-model="newUser.role">
            Administrator
          </label>
          <label for="DOCTOR">
            <input value="DOCTOR" type="radio" v-model="newUser.role">
            Doktor
          </label>
          <label for="DISPATCHER">
            <input value="DISPATCHER" type="radio" v-model="newUser.role">
            Dyspozytor
          </label>
          <label for="PARAMEDIC">
            <input value="PARAMEDIC" type="radio" v-model="newUser.role">
            Ratownik
          </label>
          <button class="formConfirmButton">Dodaj użytkownika</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';
import { baseUrl, User } from '@/utilities/data';
import BackButton from '@/components/BackButton/BackButton.vue';

export default {
  data() {
    return {
      userRole: '',
      newUser: {
        ...User
      }
    }
  },
  methods: {
    checkRole() {
      if (this.userRole !== 'ADMIN') {
        this.$router.push({ path: '/hospitals' })
      }
    },

    addUser() {
      axios.post(`${baseUrl}/user/add`, this.newUser)
        .then(function (response) {
          console.log(response)
        }.bind(this))
        .then(() => {
          this.$router.push("/users")
        });
    }
  },
  components: { BackButton },
  mounted() {
    this.userRole = localStorage.getItem('userRole');
    this.checkRole();
  }
}
</script>