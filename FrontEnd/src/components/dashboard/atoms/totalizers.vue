<template>
  <div class="totalizers-container" >

    <div 
      class="totalizers-icon" 
      :style="{ 'color' : color }">
    
      <i :class="icon"></i>
    
    </div>

    <div class="info">

      <p>
        {{ title }}
      </p>

      <strong>
        {{ count }}
      </strong>
      
    </div>

  </div>
</template>

<script>
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

<style lang="scss">
  @import 'stats';
</style>