<template>
  <section v-if="patients?.length && patients">
    <input class="inputSearch" v-model="search" type="text" placeholder="Wyszukaj pacjenta">
    <div class="tableWrapper">
      <div class="tableTitle">
        <h1 v-if="this.$route.path === '/patients'">Lista pacjentów</h1>
        <h1 v-else>Archiwum pacjentów</h1>
      </div>
      <table>
        <thead class="headTable">
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>PESEL</th>
            <th>Wiek</th>
            <th>Płeć</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody class="bodyTable">
            <tr v-for="patient in filteredList" v-bind:key="patient.pesel">
              <td>
                {{ convertString(patient.firstName) }}
              </td>
              <td>
                {{ convertString(patient.lastName) }}
              </td>
              <td>
                {{ convertString(patient.pesel) }}
              </td>
              <td>
                {{ patient.age }}
              </td>
              <td>
                {{ convertGender(patient.gender) }}
              </td>
              <td v-if="hasPermission('ADMIN', 'DOCTOR', 'PARAMEDIC', 'DISPATCHER')">
              <div class="dropdown" @click="toggleDropdown(patient)">
                <button
                  class="dropbtn dropdown-toggle listButton"
                  type="button"
                >
                  <i class="fa-solid fa-gear"></i>
                </button>
                <div v-if="patient.isDropdownVisible" class="dropdown-content">
                  <a class="actionButton" v-if="hasPermission('ADMIN', 'DOCTOR', 'DISPATCHER', 'PARAMEDIC') && this.$route.path === '/patients'" @click="updatePatient(patient.id)" >
                    Edytuj pacjenta
                  </a>
                  <a class="actionButton" v-if="hasPermission('ADMIN', 'DOCTOR', 'DISPATCHER') && this.$route.path === '/patients'" @click="removePatient(patient.id)">
                    Archiwizuj pacjenta
                  </a>
                  <router-link :to="{ name: 'PatientDetails', params: { id: patient.id } }">
                    <a class="actionButton">
                      Szczegóły pacjenta
                    </a>
                </router-link>
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
import {convertString, convertDate, convertGender, hasPermission, toggleDropdown} from './utilities';

export default {
  data() {
    return {
      patients: [],
      search: "",
      userRole: '',
    }
  },
  methods: {
    convertDate,
    convertGender,
    convertString,
    hasPermission,
    toggleDropdown,
    updatePatient(id) {
      this.$router.push({ name: 'EditingPatient', params: { id: id } })
    },
    getAllPatients() {
      if (this.$route.path === '/patients') {
        axios.get(`${baseUrl}/patient`)
          .then(response => {
            this.patients = response.data;
          });
      } else if (this.$route.path === '/archived-patients') {
        axios.get(`${baseUrl}/patient/archived/all`)
          .then(response => {
            this.patients = response.data;
          });
      }
    },
    removePatient(patientId) {
      axios.delete(`${baseUrl}/patient/delete/${patientId}`)
        .then(response => {
          if (response.status == 200) {
            this.getAllPatients()
          }
        })
    },
  },
  mounted() {
  this.getAllPatients();
  this.userRole = localStorage.getItem('userRole');
},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getAllPatients();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.getAllPatients();
    next();
  },
  computed: {
    filteredList() {
      return this.patients.filter(patient => {
        return (this.convertString(patient.firstName) + " " + this.convertString(patient.lastName) + " " + this.convertString(patient.pesel) + " " + this.convertDate(patient.birthDate) + " " + this.convertGender(patient.gender) + " " + patient.age).toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
  @import url('style.scss');
</style>