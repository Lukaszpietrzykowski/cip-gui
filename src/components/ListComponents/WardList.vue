<template>
  <section v-if="departments?.length && departments">
    <div class="tableWrapper">
      <div class="tableTitle">
        <h1>Lista oddziałów</h1>
      </div>
      <table>
        <thead class="headTable">
          <tr>
            <th>Nazwa oddziału</th>
            <th>Wszystkie łóżka</th>
            <th>Wolne łóżka</th>
            <th colspan="2">Akcje</th>
          </tr>
        </thead>
        <tbody class="bodyTable">
          <tr v-for="department in departments" :key="department.id">
            <td v-if="(edit.editMode && edit.elementId === department.id)">
              <input class="listButton" type="text" v-model="department.name" required>
            </td>
            <td v-else>
              {{ department.name }}
            </td>
            <td v-if="(edit.editMode && edit.elementId === department.id)">
              <input class="listButton" type="number" min="0" v-model="department.availableBeds" @keyup="checkValue(department)" @change="checkValue(department)">
            </td>
            <td v-else>
              {{ department.availableBeds }}
            </td>
            <td>
              {{ department.remainingBeds }}
            </td>
            <td>
              <button class="listButton" v-if="(edit.editMode && edit.elementId === department.id)" @click="disableEditMode">
                Cofnij zmiany
              </button>
              <button class="listButton" v-else @click="toggleEditMode(department.id)">
                Edytuj oddział
              </button>
            </td>
            <td>
              <button class="listButton" v-if="(edit.editMode && edit.elementId === department.id)" v-on:click.prevent="this.edit.isDataCorrect && submitEdit(department)">
                Zatwierdz zmiany
              </button>
              <button class="listButton" v-else @click="removeDepartment(department.id)">
                Usuń oddział
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { baseUrl, Department } from '@/utilities/data';

export default {
  data() {
    return {
      edit: {
        isDataCorrect: false,
        editMode: false,
        elementId: ''
      },
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

    checkValue(department) {
      if (department.occupiedBeds > department.availableBeds) {
        this.edit.isDataCorrect = false;
      } else {
        this.edit.isDataCorrect = true;
      }
    },
    submitEdit(department) {
      department.hospitalId = this.hospitalId;
      axios.put(`${baseUrl}/department/update/${department.id}`, department)
        .then(response => {
          if (response.status === 200) {
            this.edit.editMode = false;
            this.edit.elementId = '';
            this.getAllDepartments();
          }
        })
    },
    toggleEditMode(id) {
      this.edit.editMode = true;
      this.edit.elementId = id;
      this.edit.isDataCorrect = true;
    },

    disableEditMode() {
      this.edit.editMode = false;
      this.edit.elementId = '';
      this.edit.isDataCorrect = true;
      this.getAllDepartments();
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
            document.getElementById('success').innerHTML = "Dodano oddział!";
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
    removeDepartment(id) {
      axios.delete(`${baseUrl}/department/delete/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.getAllDepartments()
          }
        })
    }
  },
}

</script>

<style scoped>
  @import url('style.scss');
</style>