<template>
    <section>
      <div class="formWrapper">
        <div class="formTitle">
          <h1>Dodawanie oddziału</h1>
        </div>
        <div class="formContent">
          <span>Wprowadź dane oddziału</span>
          <form v-on:submit.prevent="submit" class="formFlex">
            <span>*Nazwa oddziału</span>
            <input class="formInput" type="text" name="oddział" v-model="newDepartment.name" placeholder="Kardiologia" required>
            <span>*Ilość łóżek</span>
            <input class="formInput" type="text" name="miasto" v-model="newDepartment.availableBeds" pattern="[0-9]+" placeholder="0" required>
            <button class="formConfirmButton">Dodaj oddział</button>
          </form>   
        </div>   
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  import { Department, baseUrl } from '@/utilities/data';
  
  export default {
    data() {
      return {
        hospitalId: '',
        departments: [],
        newDepartment: {
          ...Department
        },
        userRole: ''
      }
    },
 
    created() {
      this.hospitalId = this.$route.params.id
    },
  
    mounted() {
      this.userRole = localStorage.getItem('userRole');
      this.checkRole();
      this.getAllDepartments();
    },
  
    methods: {
      checkRole() {
        if (this.userRole !== 'ADMIN') {
          this.$router.push({ path: '/hospitals' })
        }
      },
      submit() {
        const department = {
          name: this.newDepartment.name,
          hospitalId: this.hospitalId,
          availableBeds: this.newDepartment.availableBeds
        };
        axios.post(`${baseUrl}/department/add/`, department)
          .then(function (response) {
            if (response.status === 200) {
              this.getAllDepartments();
              location.reload();
            }
          }.bind(this));
      },
      getAllDepartments() {
        axios.get(`${baseUrl}/hospital/${this.hospitalId}/departments`)
          .then(response => {
            if (response.status === 200)
              this.departments = response.data
          })
          .then(() => {
            this.departments.map(department => {
              department.occupiedBeds = department.availableBeds - department.remainingBeds
            })
          })
      },
    },
  }
  </script>
  