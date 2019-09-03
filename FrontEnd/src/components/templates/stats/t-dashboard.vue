<template>
  <div>
    <b-row class="container-dashboad">
      <b-col sm='12' md='4' lg='3'>
        <totalizers/>
      </b-col>
      
      <b-col sm='12' md='8' lg='8'>
        <LikesArticles/>

        <Author/>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import totalizers from '@/components/organisms/stats/o-totalizers'
import LikesArticles from '@/components/organisms/stats/o-char-likes'
import Author from '@/components/organisms/stats/o-char-author-blog'

export default {
  name: 'DashBoad',
  components: { totalizers, LikesArticles, Author }
}
</script>

<style>

</style>