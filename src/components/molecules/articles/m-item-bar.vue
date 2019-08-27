<template>
  <div class="profile-blog">
    <img src="@/assets/default-post.png" alt="picture default" />

    <div class="info">
      <strong>{{ title }}</strong>
      
      <p>
        Front-end CSS libraries let 
        you rapidly prototype since 
        you don’t have to worry about styles
      </p>

      <div class="about">
        <div>{{ author }}</div>
        <div>{{ data }}</div>
      </div>
    </div>
  </div>
</template>

<script>
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
      }
    }
}
</script>

<style scoped>
.profile-blog {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 310px;
  padding: 10px;
  margin: 5px;
}

.profile-blog img {
  max-width: 300px;
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