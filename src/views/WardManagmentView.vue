<template>
  <section>
    <BackButton routeType="hospitals" />
    <WardList/>
    <AddingWard />
  </section>
</template>

<script>
import AddingWard from '../components/Forms/Wards/AddingWard.vue';
import WardList from '../components/ListComponents/WardList.vue';
import BackButton from '@/components/BackButton/BackButton.vue';

export default {
  components: {WardList, AddingWard, BackButton}
}
</script>

<style scoped>
</style>