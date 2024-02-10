<template>
  <div class="navbar">
    <router-link :to="generateLink(routeType)[0]" class="back-button">
      <i class="fa-solid fa-arrow-rotate-left"></i>
      Powrót do listy {{ generateLink(routeType)[1]}}
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    routeType: {
      type: String,
      required: true,
    },
  },
  methods: {
    generateLink(type) {
      switch (type) {
        case 'patients':
          return ['/patients', 'pacjentów'];
        case 'hospitals':
          return ['/hospitals', 'szpitali'];
        case 'users':
          return ['/users', 'użytkowników'];
        default:
          return '/';
      }
    },
  },
};
</script>
  
  <style scoped>
  .navbar {
    height: 40px;
    display: block;
    text-align: left;
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .back-button {
    text-decoration: none;
    font-size: 16px;
    margin-right: 10px;
  }
  </style>