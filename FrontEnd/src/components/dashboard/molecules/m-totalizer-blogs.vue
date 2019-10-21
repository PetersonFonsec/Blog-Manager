<template>

  <totalizer 
    title="Seus Blogs"
    icon="fa fa-folder"
    color="rgb(133, 216, 206)"
    :count="count" />

</template>

<script>
import totalizer from '../atoms/totalizers'

export default {
    name:'TotalizerBlogs',
    components: { totalizer },
    props: {
      count:{
        type: Number,
        require: true
      }
    }
}
</script>