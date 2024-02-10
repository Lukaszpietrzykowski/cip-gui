<template>
  <section>
    <BackButton routeType="hospitals" />
    <div class="formWrapper">
      <div class="formTitle">
        <h1>Dodawanie szpitala</h1>
      </div>
      <div class="formContent">
        <span>Wprowadź dane szpitala</span>
        <form v-on:submit.prevent="submit" class="formFlex">
          <span>*Nazwa szpitala</span>
          <input class="formInput" type="text" name="nazwa szpitala" v-model="newHospital.name" placeholder="Szpital" required >
          <span>*Miejscowość</span>
          <input class="formInput" type="text" name="miasto" required pattern="^[a-zA-Z\s]*$" v-model="newHospital.address.city" placeholder="Warszawa">
          <span>*Ulica</span>
          <input class="formInput" type="text" name="ulica" required v-model="newHospital.address.street" placeholder="Kwiatowa">
          <span>*Numer budynku</span>
          <input class="formInput" type="text" name="numer budynku" required v-model="newHospital.address.streetNumber" placeholder="12a">
          <span>*Kod pocztowy</span>
          <input class="formInput" type="text" name="kod pocztowy" required v-model="newHospital.address.postalCode" pattern="^\d{2}-\d{3}$" placeholder="00-000">
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
      newHospital: {
        ...Hospital
      },
    }
  },
  components: { BackButton },
  methods: {
    checkRole() {
      if (this.userRole !== 'ADMIN') {
        this.$router.push({ path: '/hospitals' })
      }
    },
    submit() {
      axios.post(`${baseUrl}/hospital/add`, this.newHospital)
      .then(response => {
          if (response.status === 200) {
            this.$router.push({ path: '/hospitals' })
          }
        })
    },
  },
  mounted() {
    this.userRole = localStorage.getItem('userRole');
    this.checkRole();
  }
}
</script>
