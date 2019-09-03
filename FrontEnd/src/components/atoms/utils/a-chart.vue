<template>
    <b-card class="Grafico">
        <canvas :id="id"></canvas>
    </b-card>
</template>

<script >
export default {
  props: {
    datasets: {
      type: Array,
      required: true,
    },
    labels: {
      type: [Array, String],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const canvas = document.getElementById(this.id).getContext('2d');

    // eslint-disable-next-line 
    new Chart( canvas, {
      type: this.type,
      data:{
        labels: this.labels,
        datasets: this.datasets
      }
    });
  },
};
</script>

<style scoped>
    .Grafico{
      margin: 10px;
    }
</style>
