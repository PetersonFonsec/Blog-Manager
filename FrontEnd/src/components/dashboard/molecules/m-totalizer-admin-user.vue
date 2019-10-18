<template>
  
  <totalizer 
    title="Usuários"
    icon="fa fa-user-o"
    :count="count" />

</template>

<script>
import totalizer from '../atoms/totalizers'

export default {
    name:'TotalizerUser',
    components: { totalizer },
    props: {
      count:{
        type: String,
        require: true
      }
    }
}
</script>