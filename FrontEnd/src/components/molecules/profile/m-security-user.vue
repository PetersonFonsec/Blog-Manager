<template>
  <div class="container-data-user">
      <b-card>

      </b-card>
  </div>
</template>

<script>
export default {
    name: 'DataUser',
    props:{
    },    
    data(){
        return {
            newEmail: '',
            newPassword: '',
            editEmail: false
        }
    },
}
</script>

<style scoped></style>