<template>
  <div class="profile-blog">
    <div class="image-post">
      <img src="@/assets/default-post.png" alt="picture default" />
    </div>

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
    name: 'totalBlog',
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

<style >
.image-post img {
  max-width: 150px;
  border-radius: 5px;
}
.image-post {
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px solid #AAA;
}
.profile-blog{
  padding: 5px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
}
.about{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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