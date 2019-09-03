<template>
  <div class="totalizers-container" >

    <div class="totalizers-icon" :style="{ 'color' : color }">
      <i :class="icon"></i>
    </div>

    <div class="info">

      <p>
        {{ title }}
      </p>

      <strong>{{ count }}</strong>
      
    </div>

  </div>
</template>

<script>
import '@/css/keyFrames.css'
export default {
    name: 'totalBlog',
    props:{      
      title: {
        type: String,
        require: true
      },
      icon:{
        type: String,
        require: true
      },
      count:{
        type: Number,
        require: true
      },
      color:{
        type: String,
        require: true
      },
    }
}
</script>

<style >
.totalizers-container{
  animation: bornHeder linear .6s;
  padding: 20px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
}

.totalizers-container .totalizers-icon {
  margin-right: 20px;
  padding-right: 20px;
  font-size: 60px;
  border-right: 1px solid #AAA;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info strong {
  font-size: 20px;
}
.info p {
  text-align: center;
}
.info {
  display: flex;
  margin: auto;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
}

</style>