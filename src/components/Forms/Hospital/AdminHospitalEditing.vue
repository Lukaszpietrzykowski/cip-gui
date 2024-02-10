<template>
  <section>
    <BackButton routeType="hospitals" />
    <div class="formWrapper">
      <div class="formTitle">
        <h1>Edytowanie szpitala</h1>
      </div>
      <div class="formContent">
        <span>Wprowadź dane szpitala</span>
        <form v-on:submit.prevent="updateHospital" class="formFlex">
          <span>*Nazwa szpitala</span>
          <input class="formInput" type="text" name="nazwa szpitala" v-model="editedHospital.name" placeholder="Szpital" required >
          <span>*Miejscowość</span>
          <input class="formInput" type="text" name="miasto" required pattern="^[a-zA-Z\s]*$" v-model="editedHospital.address.city" placeholder="Warszawa">
          <span>*Ulica</span>
          <input class="formInput" type="text" name="ulica" required v-model="editedHospital.address.street" placeholder="Kwiatowa">
          <span>*Numer budynku</span>
          <input class="formInput" type="text" name="numer budynku" required v-model="editedHospital.address.streetNumber" placeholder="12a">
          <span>*Kod pocztowy</span>
          <input class="formInput" type="text" name="kod pocztowy" required v-model="editedHospital.address.postalCode" pattern="^\d{2}-\d{3}$" placeholder="00-000">
          <button class="formConfirmButton">Dodaj szpital</button>
        </form>   
      </div>   
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { baseUrl, Hospital } from '@/utilities/data';
import BackButton from '@/components/BackButton/BackButton.vue';

export default {
  data() {
    return {
      userRole: '',
      editedHospital: {
        ...Hospital
      },
      hospitalId: '',
    }
  },

  created() {
    this.hospitalId = this.$route.params.id
  },
  components: { BackButton },
  mounted() {
    this.userRole = localStorage.getItem("userRole");
    setInterval(() => {
      const newRole = localStorage.getItem("userRole");
      if (newRole !== this.userRole) {
        this.userRole = newRole;
      }
    }, 200)
    axios.get(`${baseUrl}/hospital/${this.hospitalId}`)
      .then(response => {
        if (response.status === 200) {
          this.editedHospital = response.data
        }
      })
  },


  methods: {
    checkRole() {
      if (this.userRole !== 'ADMIN') {
        this.$router.push({ path: '/hospitals' })
      }
    },

    updateHospital() {
      axios.put(`${baseUrl}/hospital/update/${this.hospitalId}`, this.editedHospital)
        .then(response => {
          if (response.status === 200) {
            this.$router.push({ path: '/hospitals' })
          }
        })
    }
  }
}
</script>

