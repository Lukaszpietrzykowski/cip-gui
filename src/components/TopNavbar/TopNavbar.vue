<template><nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <span class="logo-text">Centrum Informacji Pacjenta</span>
    <!-- Sidebar Toggle-->
    <button @click="toggleSidebar" class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle"><i class="fas fa-bars"></i></button>
    <!-- Navbar Search-->
    <!-- <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
      <div class="input-group">
        <input class="form-control" type="text" placeholder="Szukaj..." aria-label="Szukaj..." aria-describedby="btnNavbarSearch" />
        <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
      </div>
    </form> -->
    <!-- Navbar-->
    <span class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
    </span>
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" @click="logout()">Wyloguj się</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  
  </template>

  <script>
  import axios from 'axios';
  import { baseUrl } from '@/utilities/data';

  export default {
    methods: {
      toggleSidebar() {
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      },
      logout() {
      axios.post(`${baseUrl}/logout`)
          .then(response => {
            if (response.status === 200)
              localStorage.removeItem('userRole')
            localStorage.removeItem('loggedIn')
            this.$router.push({
              path: '/'
            })
          })
    }
      
    }
  };
  </script>
  
 
  <style scoped>
.logo-text{
    height:25px;
    color: white;
    margin-left:20px;
    position: relative;
    text-decoration: none;
    user-select: none;
  }


  .bg-dark{
    background-color: #215a80 !important;
  }
  .sb-topnav {
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.5);
    position: fixed;
    top:0;
    width: 100%;
    font-family: 'Montsterrat',sans-serif;
  }
  #btnNavbarSearch:hover{
    background-color: #12456e;
  }
  
  #btnNavbarSearch{
    background-color: #215a80;
  }
  
  #btnNavbarSearch.btn.btn-primary{
    border:1px solid white;
  }
  
  #sidebarToggle, .nav-link.dropdown-toggle{
    color:white !important;
    margin-left: 5px;
  }
  
  #sidebarToggle, .nav-link.dropdown-toggle:hover{
    color:rgba(255,255,255,0.8 );
  }

  .dropdown-item{
    cursor: pointer;
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;

  }  

  .dropdown-item:active{
    color:black;
  }  

  @media screen and (max-width: 400px) {
    .logo-text {
        font-size: 0.9rem;
    }
}
  
  
  </style>