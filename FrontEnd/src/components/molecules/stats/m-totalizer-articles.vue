<template>
  <totalizer 
    title="Artigos dos seus blogs"
    icon="fa fa-file-o"
    color="red"
    :count="count" />
</template>

<script>
import totalizer from '@/components/atoms/stats/totalizers'

export default {
  name:'TotalizerArticle',
  components: { totalizer },
  props: ['count']
}
</script>

<style>

</style>