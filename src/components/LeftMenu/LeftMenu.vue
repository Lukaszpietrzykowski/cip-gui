<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Narzędzia główne</div>

          <a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseHospitals"
            aria-expanded="false" aria-controls="collapseHospitals">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-hospital"></i></div>
            Szpitale
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapseHospitals" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
              <router-link to="/adding-hospital" class="nav-link" v-if="this.userRole==='ADMIN'">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-plus"></i></div>
                Dodaj szpital
              </router-link>
              <router-link to="/hospitals" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-circle-info"></i></div>
                Lista szpitali
              </router-link>

            </nav>
          </div>

          <a class="nav-link collapsed" href="/hospitals" data-bs-toggle="collapse" data-bs-target="#collapseUsers"
            aria-expanded="false" aria-controls="collapseUsers" v-if="this.userRole==='ADMIN'">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-users"></i></div>
            Użytkownicy
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapseUsers" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav" v-if="this.userRole==='ADMIN'">
              <router-link to="/adding-user" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-plus"></i></div>
                Dodaj użytkownika
              </router-link>
              <router-link to="/users" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-circle-info"></i></div>
                Lista użytkowników
              </router-link>
            

            </nav>
          </div>

          <a class="nav-link collapsed" href="/hospitals" data-bs-toggle="collapse" data-bs-target="#collapsePatients"
            aria-expanded="false" aria-controls="collapsePatients">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-bed"></i></div>
            Pacjenci
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapsePatients" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
              <router-link to="/adding-patient" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-plus"></i></div>
                Dodaj pacjenta
              </router-link>
              <router-link to="/patients" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-circle-info"></i></div>
                Lista pacjentów
              </router-link>
              <router-link to="/archived-patients" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-box-archive"></i></div>
                Archiwum pacjentów
              </router-link>

            </nav>
          </div>

          <div class="sb-sidenav-menu-heading">Pozostałe</div>
       
         <router-link to="/about" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-address-card"></i></div>
                O aplikacji
              </router-link>
        </div>
      </div>



      <div class="sb-sidenav-footer">
        <div class="small">Zalogowano jako:</div>
        <span v-if="userRole==='ADMIN'" class="usersRole">Administrator</span>
        <span v-if="userRole==='DOCTOR'" class="usersRole">Lekarz</span>
        <span v-if="userRole==='DISPATCHER'" class="usersRole">Dyspozytor</span>
        <span v-if="userRole==='PARAMEDIC'" class="usersRole">Ratownik</span>

      </div>
    </nav>
  </div>
</template>


<style scoped>
@import "style.scss";
</style>

<script>
export default{
  data() {
    return {
      userRole: ""
    }
  },
  mounted() {
    this.userRole = localStorage.getItem("userRole");
    setInterval(() => {
      const newRole = localStorage.getItem("userRole");
      if (newRole !== this.userRole) {
        this.userRole = newRole;
      }
    }, 200);
  }
  }
  
  
</script>


