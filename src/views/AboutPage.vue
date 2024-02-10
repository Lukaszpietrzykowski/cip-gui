<template>
  <section>
  <div class="aboutWrapper">
    <h2>Centrum Informacji Pacjenta</h2>
    <span>Niniejszy projekt powstał na potrzeby zaliczenia przedmiotu "Projekt Zespołowy" w roku akademickim 2023/2024.</span>
    <br>
    <span>Szczegółowy opis działania systemu został umieszczony w instrukcji obsługi systemu.</span>
    <br>
    <h3>Autorzy projektu:</h3>
    <table class="tableAbout">
      <thead>
        <tr class="headerAbout">
          <th>Nazwisko</th>
          <th>Numer indeksu</th>
          <th>Rola</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Paweł Świerczewski</td>
          <td>203818</td>
          <td>Team Lead & Business / System Analyst</td>
        </tr>
        <tr>
          <td>Łukasz Pietrzykowski</td>
          <td>207841</td>
          <td>Tech Lead & Developer</td>
        </tr>
        <tr>
          <td>Radosław Tomaszewski</td>
          <td>209318</td>
          <td>Frontend Developer</td>
        </tr>
        <tr>
          <td>Krzysztof Krawczyk</td>
          <td>207822</td>
          <td>Frontend Developer</td>
        </tr>
        <tr>
          <td>Kacper Michałek</td>
          <td>207832</td>
          <td>Frontend Developer</td>
        </tr>
        <tr>
          <td>Dariusz Głażewski</td>
          <td>209306</td>
          <td>Backend Developer</td>
        </tr>
        <tr>
          <td>Patryk Ostrowski</td>
          <td>207838</td>
          <td>Backend Developer</td>
        </tr>
        <tr>
          <td>Kuba Malicki</td>
          <td>209306</td>
          <td>Backend Developer</td>
        </tr>
        <tr>
          <td>Łukasz Niewiadomski</td>
          <td>207835</td>
          <td>Software Tester</td>
        </tr>
      </tbody>
    </table>
</div>
  </section>
</template>

<script>
export default {
  methods: {
    checkRole() {
      if (this.userRole === "PARAMEDIC") {
        this.$router.push({ path: "/about" });
      }
    },
  },
  mounted() {
    this.checkRole();
  },
};
</script>

<style scoped>
.aboutWrapper{
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.headerAbout{
  background-color: #215a80;
  color: white;
}
.tableAbout{
  width: 80%;
}

</style>