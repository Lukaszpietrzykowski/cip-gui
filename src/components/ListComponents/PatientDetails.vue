<template>
  <section>
    <BackButton routeType="patients" />
  <div class="tableWrapper">
    <div class="tableTitle">
      <h1>Szczegóły pacjenta</h1>
    </div>
      <table>
      <tbody class="bodyTable">
        <tr>
          <td><b>Imię:</b></td>
          <td>{{ convertString(PatientData.firstName) }}</td>
        </tr>
        <tr>
          <td><b>Nazwisko:</b></td>
          <td>{{ convertString(PatientData.lastName) }}</td>
        </tr>
        <tr>
          <td><b>PESEL:</b></td>
          <td>{{ convertString(PatientData.pesel) }}</td>
        </tr>
        <tr>
          <td><b>Data urodzenia:</b></td>
          <td>{{ convertDateNoTime(PatientData.birthDate) }}</td>
        </tr>
        <tr>
          <td><b>Wiek:</b></td>
          <td>{{ PatientData.age }}</td>
        </tr>
        <tr>
          <td><b>Płeć:</b></td>
          <td>{{ convertGender(PatientData.gender) }}</td>
        </tr>
        <tr>
          <td><b>Data rejestracji:</b></td>
          <td>{{ convertDateWithTime(PatientData.registrationDate) }}</td>
        </tr>
        <tr>
          <td><b>Data wypisania:</b></td>
          <td>{{ convertDateWithTime(PatientData.dischargeDate) }}</td>
        </tr>
        <tr>
          <td><b>Oddział:</b></td>
          <td>{{ this.department.name }}</td>
        </tr>
        <tr>
          <td><b>Szpital:</b></td>
          <td>{{ this.hospital.name }}</td>
        </tr>
      </tbody>
    </table>

    <div class="medicalHistory">
    <div><b>Historia choroby:</b></div>
      <textarea v-if="hasPermission('ADMIN', 'DOCTOR')" v-model="PatientData.medicalHistory" style="width: 100%;"></textarea>
      <textarea v-else v-model="PatientData.medicalHistory" cols="2" rows="7" readonly style="width: 100%;"></textarea>
      <button class="formConfirmButton" v-if="hasPermission('ADMIN', 'DOCTOR')"
        v-on:click.prevent="updatePatientDetails()" type="submit">
          Zapisz
      </button>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import { baseUrl } from '@/utilities/data';
import {convertString, convertGender, hasPermission} from '@/components/ListComponents/utilities';
import BackButton from '@/components/BackButton/BackButton.vue';

export default {
  data() {
    return {
      hospital: {},
      department: {},
      patientId: "",
      hospitalId: "",
      departmentId: "",
      PatientData: {},
      userRole: '',
    }
  },
  methods: {
    convertGender,
    convertString,
    hasPermission,
    convertDateNoTime(fullDate) {
      if (fullDate != null) return fullDate.substring(0, 10)
      return "brak danych"
    },
    convertDateWithTime(fullDate) {
      let formatedDate = "";
      if (fullDate != null) {
        formatedDate = fullDate.substring(0, 19)
        formatedDate = formatedDate.replace('T', ' ')
        return formatedDate
      }
      return "-"
    },
    getPatientData: function () {
      axios.get(`${baseUrl}/patient/${this.patientId}`)
        .then(response => {
          if (response.status === 200) {
            this.PatientData = response.data
            if (this.PatientData.birthDate != null) {
              this.PatientData.birthDate = this.PatientData.birthDate.split("T")[0]
            }
          }
        })
        .then(() => {
          this.getHospitalData(this.patientId)
        })
    },
    getHospitalData: function () {
      axios.get(`${baseUrl}/hospital/${this.PatientData.hospitalId}`)
        .then(response => {
          if (response.status === 200) {
            this.hospital = response.data
          }
        })
        .then(() => {
          this.getDepartmentData(this.patientId)
        })
    },
    getDepartmentData: function () {
      axios.get(`${baseUrl}/department/${this.PatientData.departmentId}`)
        .then(response => {
          if (response.status === 200) {
            this.department = response.data
          }
        })
    },
    updatePatientDetails: function () {
      const config = { headers: { 'Content-Type': 'text/plain' } };
      if (this.PatientData.medicalHistory == null) {
        this.PatientData.medicalHistory = "";
      }
      axios.put(`${baseUrl}/patient/update/medical-history/${this.patientId}`, this.PatientData.medicalHistory, config)
        .then(response => {
          if (response.status === 200) this.$router.push({
            path: "/patients"
          })
        })
    }
  },
  created() {
    this.patientId = this.$route.params.id
    this.getPatientData()
    this.userRole = localStorage.getItem('userRole');
  },
  components: { BackButton}
}
</script>

<style scoped>
  @import url('style.scss');
  .medicalHistory {
    width: 100%;
  }
</style>