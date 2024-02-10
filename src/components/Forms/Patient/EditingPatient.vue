<template>
  <section>
    <BackButton routeType="patients" />
    <div class="formWrapper">
      <div class="formTitle">
        <h1>Edytowanie pacjenta</h1>
      </div>
      <div class="formContent">
        <span>Wprowadź dane pacjenta</span>
        <div id="dodawaniePacjenta">
          <form v-on:submit.prevent="updatePatient()" class="formFlex">
            <span>*Szpital</span>
            <select class="formInput" @change="getHospitalById(oldPatient.hospitalId)" v-model="oldPatient.hospitalId" id="SZPITAL" required>
              <option :key="hospital.id" v-for="hospital in hospitals" :value="hospital.id">
                {{ hospital.name }}
              </option>
            </select>
            <span>*Oddział</span>
            <select class="formInput" v-model="oldPatient.departmentId" id="ODDZIAL" required>
              <option :key="department.id" v-for="department in departments" :value="department.id">
                {{ department.name }}
              </option>
            </select>
            <span>Imię</span>
            <input class="formInput" v-model="oldPatient.firstName" type="text" id="IMIE">
            <span>Nazwisko</span>
            <input class="formInput" v-model="oldPatient.lastName" type="text" id="NAZWISKO">
            <span>Numer PESEL</span>
            <input class="formInput" v-model="oldPatient.pesel" id="PESEL" type="text" size="11" @input="handlePeselBlur">
            <button v-if="errorPesel === 'ok' && oldPatient.pesel !== ''" @click="setDateAgeGender">Ustaw datę urodzenia, wiek, płeć</button>
            <span class="errorPesel" v-if="errorPesel !== 'ok'">{{ errorPesel }}</span>
            <span>Data urodzenia</span>      
            <input class="formInput" v-model="oldPatient.birthDate" type="date" id="DATURO" max="">
            <button v-if="oldPatient.birthDate && !this.oldPatient.age" @click="setAge">Ustaw wiek</button>
            <span>*Wiek</span>
            <input class="formInput" v-model="oldPatient.age" type="number" id="WIEK" min="0" max="130" required>
            <span>*Płeć</span>
            <label for="kobieta">
              <input v-model="oldPatient.gender" v-bind:value="'FEMALE'" type="radio" name="plec" id="kobieta" required>
              Kobieta
            </label>
            <label for="mezczyzna">
              <input v-model="oldPatient.gender" v-bind:value="'MALE'" type="radio" name="plec" id="mezczyzna">
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
            oldPatient: {
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
        updatePatient: function () {
          if (this.oldPatient.birthDate.slice(10) != "T00:00:00" && this.oldPatient.birthDate != "") 
          this.oldPatient.birthDate = this.oldPatient.birthDate + "T00:00:00"
          this.errorPesel = checkPESEL(this.oldPatient.pesel);
          if (checkPESEL(this.oldPatient.pesel) === 'ok') {
            axios.put(`${baseUrl}/patient/update/${this.patientId}`, this.oldPatient)
              .then(response => {
                if (response.status == 200) this.$router.push({
                  path: "/patients"
                })
                this.oldPatient = {};
              })
          }
        },
        resetForm() {
            this.oldPatient = {
              ...Patient
            };
            this.selectedHospital = "";
        },
        handlePeselBlur() {
          this.errorPesel = checkPESEL(this.oldPatient.pesel);
        },
        setDateAgeGender() {
          this.oldPatient.birthDate = setDateBirthAndAge(this.oldPatient.pesel)[0];
            this.oldPatient.age = setDateBirthAndAge(this.oldPatient.pesel)[1];
            this.oldPatient.gender = setGender(this.oldPatient.pesel);
        },
        setAge(){
          this.oldPatient.age = setAge(this.oldPatient.birthDate);
        },
        getHospitalData: function () {
        axios.get(`${baseUrl}/hospital/all`)
          .then(response => {
            if (response.status === 200) {
              this.hospitals = response.data
            }
          }).then(() => {
            this.getPatientData(this.patientId)
          })
          .catch(e => {
            this.errors.push(e)
          })
        },
        getPatientData: function (patientId) {
          axios.get(`${baseUrl}/patient/${patientId}`)
            .then(response => {
              if (response.status === 200) {
                this.oldPatient = response.data
                if (this.oldPatient.birthDate != null) {
                  this.oldPatient.birthDate = this.oldPatient.birthDate.split("T")[0]
                }
              }
            }).then(() => {
              this.setDepartments()
            })
        },
        setDepartments: function () {
          this.departments = this.hospitals.find(hospital => hospital.id === this.oldPatient.hospitalId).departments
        },
    },
    created() {
    this.patientId = this.$route.params.id
    this.getHospitalData()
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