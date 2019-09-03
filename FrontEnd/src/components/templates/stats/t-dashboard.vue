<template>
  <div class="container-dashboad">
    <b-row>
    </b-row>

    <b-row>
      <b-col sm="12" md="4" lg="4" class="center">
        <totalizers/>
      </b-col> 

      <b-col sm="12" md="6" lg="6" class="center">
        <LikesArticles/>

        <AuthorForBlog/>

        <ArticleForAuthor/>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import totalizers from '@/components/organisms/stats/o-totalizers'
import LikesArticles from '@/components/organisms/stats/o-char-likes'
import AuthorForBlog from '@/components/organisms/stats/o-char-author-blog'
import ArticleForAuthor from '@/components/organisms/stats/o-char-article-author'

export default {
  name: 'DashBoad',
  components: { totalizers, LikesArticles, AuthorForBlog, ArticleForAuthor }
}
</script>

<style scoped>
.center{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  margin-top: 10px;
}
</style>