<template>
  <section v-if="users?.length && users">
    <input class="inputSearch" type="text" placeholder="Wyszukaj użytkownika" v-model="search" />
    <div class="tableWrapper">
      <div class="tableTitle">
        <h1>Lista użytkowników</h1>
      </div>
    <table>
      <thead class="headTable">
        <tr>
            <th>e-mail</th>
            <th>Login</th>
            <th>Uprawnienia</th>
            <th v-if="this.userRole==='ADMIN'">Akcje</th>
          </tr>
      </thead>
      <tbody class="bodyTable">
        <tr v-for="user in filteredList" v-bind:key="user.id">
          <td>
            {{ user.email }}
          </td>
          <td>
            {{ user.login }}
          </td>
          <td>
            {{ convertRole(user.role) }}
          </td>
          <td v-if="hasPermission('ADMIN')">
              <div class="dropdown" @click="toggleDropdown(user)">
                <button
                  class="dropbtn dropdown-toggle listButton"
                  type="button"
                >
                  <i class="fa-solid fa-gear"></i>
                </button>
                <div v-if="user.isDropdownVisible" class="dropdown-content">
                  <a class="actionButton" v-on:click="updateUser(user.id)">
                    Edytuj użytkownika
                  </a>
                  <a class="actionButton" v-on:click="removeUser(user.id)">
                    Usuń użytkownika
                  </a>
                </div>
              </div>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
  </section>
</template>

<script>
import axios from 'axios';
import { baseUrl } from '@/utilities/data';
import {hasPermission, toggleDropdown} from './utilities';

export default {
  
  data() {
    return {
      users: [],
      search: '',
      userRole: ''
    }
  },

  methods: {
    hasPermission,
    toggleDropdown,
    checkRole() {
      if (this.userRole !== 'ADMIN') {
        this.$router.push({ path: '/hospitals' })
      }
    },

    convertRole(userRole) {
      if (userRole === "ADMIN") {
        return "Administrator"
      } else if (userRole === "DOCTOR") {
        return "Doktor"
      } else if (userRole === "PARAMEDIC") {
        return "Ratownik"
      } else {
        return "Dyspozytor"
      }
    },

    getAllUsers() {
      axios.get(`${baseUrl}/user/all`)
        .then(response => {
          if (response.status === 200)
            this.users = response.data
        })
    },

    removeUser(id) {
      axios.delete(`${baseUrl}/user/delete/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.getAllUsers()
          }
        })
    },

    updateUser(id) {
      this.$router.push({ name: 'UserEditing', params: { id: id } })
    },
  },

  mounted() {
    this.userRole = localStorage.getItem('userRole');
    this.checkRole();
    this.getAllUsers();
  },

  computed: {
    filteredList() {
      return this.users.filter(user => {
        return (user.name + " " + user.login + " " + user.email + " " + this.convertRole(user.role)).toLowerCase().includes(this.search.toLowerCase())
      })

    }
  }

}

</script>

<style scoped>
  @import url('style.scss');
</style>
