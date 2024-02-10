<script setup>
import topNavbar from '../src/components/TopNavbar/TopNavbar.vue'
import leftMenu from '../src/components/LeftMenu/LeftMenu.vue'
import FooterPage from './components/Footer/FooterPage.vue'
</script>

<template>
  <topNavbar v-if="$route.path !== '/'"></topNavbar>
  <div id="layoutSidenav" v-if="$route.path !== '/'">
    <leftMenu v-if="$route.path !== '/'"></leftMenu>
    <div id="layoutSidenav_content" v-if="$route.path !== '/'">
      <router-view class="position" v-if="$route.path !== '/'"></router-view>
    </div>
  </div>
  <router-view class="login_margin" v-if="$route.path === '/'"></router-view>
  <FooterPage v-if="$route.path !== '/'"></FooterPage>


 
</template>

<style scoped>
.position{
  margin-left: 220px;
}


.login_margin{
  margin-left:0;
}

</style>




