<template>
  <div v-if="loading">
    <spinner />
  </div>
  <div v-else>
    <!-- <homeView /> -->
    <router-view/>
  </div>
</template>

<script>
import spinner from '@/components/spinner.vue';
import homeView from '/src/views/HomeView.vue';

export default {
  components: {
    spinner,
    homeView
  },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5200); // Adjust the delay as needed
  }
};
</script>

<style scoped>
/* Your existing CSS styles from the previous code can be added here if needed */
</style>
