<template>
  <section v-if="hospitals?.length && hospitals">
    <input class="inputSearch" type="text" placeholder="Wyszukaj szpital" v-model="search" />
    <div class="tableWrapper">
      <div class="tableTitle">
        <h1>Lista szpitali</h1>
      </div>
      <table>
        <thead class="headTable">
          <tr>
            <th>Nazwa szpitala</th>
            <th>Miejscowość</th>
            <th>Adres</th>
            <th>Oddziały</th>
            <th v-if="this.userRole==='ADMIN'">Akcje</th>
          </tr>
        </thead>
        <tbody class="bodyTable">
          <tr v-for="hospital in filteredList" v-bind:key="hospital.name">
            <td>{{ hospital.name }}</td>
            <td>{{ hospital.address.city }}</td>
            <td>
              ul. {{ hospital.address.street }}
              {{ hospital.address.streetNumber }} <br />
              {{ hospital.address.postalCode }}
            </td>
            <td>
              <button class="listButton dropdown-toggle" @click="toggleDepartment(hospital)">
                {{ hospital.departmentVisible ? 'Zwiń' : 'Rozwiń' }} listę oddziałów
              </button>
              <div class ="department" v-if="hospital.departmentVisible">
                <span v-for="department in hospital.departments" :key="department.id">
                  {{ department.name }}
                  <br>
                </span>
              </div>
            </td>
            <td v-if="hasPermission('ADMIN')">
              <div class="dropdown" @click="toggleDropdown(hospital)">
                <button
                  class="dropbtn dropdown-toggle listButton"
                  type="button"
                >
                  <i class="fa-solid fa-gear"></i>
                </button>
                <div v-if="hospital.isDropdownVisible" class="dropdown-content">
                  <a class="actionButton" @click="updateHospital(hospital.id)">
                    Edytuj szpital
                  </a>
                  <a class="actionButton" @click="managementWards(hospital.id)">
                    Zarządzaj oddziałami
                  </a>
                  <a class="actionButton" @click="removeHospital(hospital.id)">
                    Usuń szpital
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
import axios from "axios";
import { baseUrl } from "@/utilities/data";
import {hasPermission, toggleDropdown} from './utilities';

export default {
  data() {
    return {
      hospitals: [],
      search: "",
      userRole: "",
    };
  },

  methods: {
    hasPermission,
    toggleDropdown,
    toggleDepartment(hospital) {
      hospital.departmentVisible = !hospital.departmentVisible;
    },
    getAllHospitals() {
      axios.get(`${baseUrl}/hospital/all/details`).then((response) => {
        if (response.status === 200) this.hospitals = response.data;
      });
    },
    removeHospital(id) {
      axios.delete(`${baseUrl}/hospital/delete/${id}`).then((response) => {
        if (response.status === 200) {
          this.getAllHospitals();
        }
      });
    },
    updateHospital(id) {
      this.$router.push({ name: "AdminHospitalEditing", params: { id: id } });
    },
    managementWards(id) {
      this.$router.push({ name: "AdminWardManagement", params: { id: id } });
    },
  },
  mounted() {
    this.userRole = localStorage.getItem("userRole");
    setInterval(() => {
      const newRole = localStorage.getItem("userRole");
      if (newRole !== this.userRole) {
        this.userRole = newRole;
      }
    }, 200)
    this.getAllHospitals();

  },
  computed: {
    filteredList() {
      return this.hospitals.filter((hospital) => {
        let deps = "";
        hospital.departments.forEach((value) => {
          deps = deps + value.name + " ";
        });
        return (
          hospital.name +
          " " +
          hospital.address.city +
          " " +
          hospital.address.street +
          " " +
          hospital.address.streetNumber +
          " " +
          hospital.address.postalCode +
          " " +
          deps
        )
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
  @import url('style.scss');
</style>
