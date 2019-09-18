<template>
  <div class="card-item-article">

    <div class="image-post">      
      <img :src="src" alt="picture" />
    </div>

    <div class="info">
      <strong>{{ title }}</strong>
      
      <p>
        {{ description }}
      </p>

      <div class="about">
        <div>{{ author }}</div>
        <div>{{ data }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/css/keyFrames.css'
import { baseURL } from '@/global'
import { mapState } from 'vuex'

export default {
    name: 'BoxPost',
    props:{
      title: {
        type: String,
        require: true
      },
      author:{
        type: String,
        require: true
      },
      data:{
        type: String,
        require: true
      },
      description:{
        type: String,
        require: true
      },
      imagem:{
        type: String,
        require: true,
      }
    },
    computed: {
      ...mapState(['defaultImage']),
      src(){
        return `${baseURL}/${this.imagem}` || this.defaultImage
      }
    }
}
</script>

<style scoped>
.card-item-article {
  animation: bornBox linear .6s;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  width: min-content;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  min-width: 200px;
}
.card-item-article img {
  max-width: 250px;
  max-height: 250px;
  border-radius: 5px;
}
.about{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.about strong {
  margin: 5px auto;
  font-size: 20px;
}
.info{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  flex: 1;
}
</style>