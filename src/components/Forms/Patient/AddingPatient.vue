<template>
  <section>
    <BackButton routeType="patients" />
    <div class="formWrapper">
      <div class="formTitle">
        <h1>Dodawanie pacjenta</h1>
      </div>
      <div class="formContent">
        <span>Wprowadź dane pacjenta</span>
        <div id="dodawaniePacjenta">
          <form v-on:submit.prevent="addPatient()" class="formFlex">
            <span>*Szpital</span>
            <select class="formInput" @change="getHospitalById(selectedHospital)" v-model="selectedHospital" id="SZPITAL" required>
              <option :key="hospital.id" v-for="hospital in hospitals" :value="hospital.id">
                {{ hospital.name }}
              </option>
            </select>
            <span>*Oddział</span>
            <select class="formInput" v-model="newPatient.departmentId" id="ODDZIAL" required>
              <option :key="department.id" v-for="department in departments" :value="department.id">
                {{ department.name }}
              </option>
            </select>
            <span>Imię</span>
            <input class="formInput" v-model="newPatient.firstName" type="text" id="IMIE">
            <span>Nazwisko</span>
            <input class="formInput" v-model="newPatient.lastName" type="text" id="NAZWISKO">
            <span>Numer PESEL</span>
            <input class="formInput" v-model="newPatient.pesel" id="PESEL" type="text" size="11" @input="handlePeselBlur">
            <button class="formSetButton" v-if="errorPesel === 'ok' && newPatient.pesel !== ''" @click="setDateAgeGender">Ustaw datę urodzenia, wiek, płeć</button>
            <span class="errorPesel" v-if="errorPesel !== 'ok'">{{ errorPesel }}</span>
            <span>Data urodzenia</span>      
            <input class="formInput" v-model="newPatient.birthDate" type="date" id="DATURO" max="">
            <button class="formSetButton" v-if="newPatient.birthDate && !this.newPatient.age" @click="setAge">Ustaw wiek</button>
            <span>*Wiek</span>
            <input class="formInput" v-model="newPatient.age" type="number" id="WIEK" min="0" max="130" required>
            <span>*Płeć</span>
            <label for="kobieta">
              <input v-model="newPatient.gender" v-bind:value="'FEMALE'" type="radio" name="plec" id="kobieta" required>
              Kobieta
            </label>
            <label for="mezczyzna">
              <input v-model="newPatient.gender" v-bind:value="'MALE'" type="radio" name="plec" id="mezczyzna">
              Mężczyzna
            </label>
            <div class="buttonsWrapper">
              <button class="formCancelButton twoButtons" type="button" @click="resetForm">Skasuj wprowadzone wartości</button>
              <button class="formConfirmButton twoButtons" type="submit">Zatwierdź</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { baseUrl, Patient } from '@/utilities/data';
import BackButton from '@/components/BackButton/BackButton.vue';
import { checkPESEL, setDateBirthAndAge, setGender, setAge } from '@/components/Forms/Patient/validation';

export default {
    el: '#dodawaniePacjenta',
    data() {
        return {
            hospitals: [],
            selectedHospital: "",
            departments: [],
            newPatient: {
              ...Patient
            },
            errorPesel: "",
        };
    },
    methods: {
        getHospitalById: function (selectedHospital) {
            axios.get(`${baseUrl}/hospital/${selectedHospital}`)
                .then(response => {
                this.departments = response.data.departments;
            })
                .catch(e => {
                this.errors.push(e);
            });
        },
        addPatient: function () {
          if (this.newPatient.birthDate.slice(10) != "T00:00:00" && this.newPatient.birthDate != "") this.newPatient
            .birthDate = this.newPatient.birthDate + "T00:00:00"
          this.errorPesel = checkPESEL(this.newPatient.pesel);
            if (checkPESEL(this.newPatient.pesel) === 'ok') {
            axios.post(`${baseUrl}/patient/add`, this.newPatient)
              .then(response => {
                if (response.status == 200) this.$router.push({
                  path: "/patients"
                })
                this.newPatient = {}
              })
          }
        },
        resetForm() {
            this.newPatient = {
              ...Patient
            };
            this.selectedHospital = "";
        },
        handlePeselBlur() {
          this.errorPesel = checkPESEL(this.newPatient.pesel);
        },
        setDateAgeGender() {
          this.newPatient.birthDate = setDateBirthAndAge(this.newPatient.pesel)[0];
          this.newPatient.age = setDateBirthAndAge(this.newPatient.pesel)[1];
          this.newPatient.gender = setGender(this.newPatient.pesel);
        },
        setAge(){
          this.newPatient.age = setAge(this.newPatient.birthDate);
        }
    },
    mounted() {
        axios.get(`${baseUrl}/hospital/all`)
            .then(response => {
            this.hospitals = response.data;
        })
            .catch(e => {
            this.errors.push(e);
        });
    },
    components: { BackButton}
}
</script>

<style scoped>
  @import url('../style.scss');
  @import url('style.scss');
</style>