<template>
  <div class="card-item-article">
    <img v-if="imagem" :src="imagem" alt="picture default" />
    <img v-else src="@/assets/default-post.png" alt="picture default" />

    <div class="info">
      <strong>{{ title }}</strong>
      
      <p>
        {{ description }}
      </p>

      <div class="about">
        <div>{{ author.name }}</div>
        <div>{{ data }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/css/keyFrames.css'
export default {
    name: 'BoxPost',
    props:{
      title: {
        type: String,
        require: true
      },
      author:{
        type: Object,
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
}

.card-item-article img {
  max-width: 250px;
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