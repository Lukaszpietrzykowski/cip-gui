<template>
<section>
    <BackButton routeType="users" />
    <div class="formWrapper">
      <div class="formTitle">
            <h1>Edytowanie użytkownika</h1>
          </div>
      <div class="formContent">
        <span>Wprowadź dane użytkownika</span>
        <form v-on:submit.prevent="this.updateUser()" class="formFlex">
          <span>*E-mail</span>
          <input class="formInput" type="email" v-model="oldUser.email" placeholder="E-mail" required>
          <span>*Login</span>
          <input class="formInput" type="text" v-model="oldUser.login" placeholder="Login" required>
          <span>*Hasło</span>
          <input class="formInput" type="password" v-model="oldUser.password" placeholder="Hasło" required>
          <span>*Uprawnienia</span>
          <label for="ADMIN">
            <input value="ADMIN" type="radio" v-model="oldUser.role">
            Administrator
          </label>
          <label for="DOCTOR">
            <input value="DOCTOR" type="radio" v-model="oldUser.role">
            Doktor
          </label>
          <label for="DISPATCHER">
            <input value="DISPATCHER" type="radio" v-model="oldUser.role">
            Dyspozytor
          </label>
          <label for="PARAMEDIC">
            <input value="PARAMEDIC" type="radio" v-model="oldUser.role">
            Ratownik
          </label>
          <button class="formConfirmButton">Zatwierdź zmiany</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { baseUrl, User } from '@/utilities/data';
import BackButton from '@/components/BackButton/BackButton.vue';

export default {
  data() {
    return {
      userId: '',
      oldUser: {
        ...User
      },
      userRole: ''
    }
  },
  components: { BackButton },
  created() {
    this.userId = this.$route.params.id
  },

  mounted() {
    this.userRole = localStorage.getItem('userRole');
    this.checkRole();
    axios.get(`${baseUrl}/user/${this.userId}`)
      .then(response => {
        if (response.status === 200) {
          this.oldUser = response.data
        }
      })
  },
  methods: {
    checkRole() {
      if (this.userRole !== 'ADMIN') {
        this.$router.push({ path: '/hospitals' })
      }
    },
    updateUser() {
      axios.put(`${baseUrl}/user/update/${this.userId}`, this.oldUser)
        .then(response => {
          if (response.status === 200) {
            this.$router.push({ path: '/users' })
          }
        })
    }
  }

}
</script>