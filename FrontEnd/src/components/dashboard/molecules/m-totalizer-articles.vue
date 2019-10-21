<template>

  <totalizer 
    title="Artigos dos seus blogs"
    icon="fa fa-file-o"
    color="red"
    :count="count" />

</template>

<script>
import totalizer from '../atoms/totalizers'

export default {
  name:'TotalizerArticle',
  components: { totalizer },
  props: {
    count:{
      type: Number,
      require: true
    }
  }
}
</script>