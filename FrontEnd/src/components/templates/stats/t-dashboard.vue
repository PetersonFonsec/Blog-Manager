<template>
  <div class="container-dashboad">
    <totalizers/>
    <likesArticles/>
  </div>
</template>

<script>
import totalizers from '@/components/organisms/stats/o-totalizers'
import likesArticles from '@/components/organisms/stats/o-char-likes'
export default {
    name: 'DashBoad',
    components: { totalizers, likesArticles }
}
</script>

<style>

</style>