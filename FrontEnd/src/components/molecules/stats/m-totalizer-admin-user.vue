<template>
  <totalizer 
    title="Usuários"
    icon="fa fa-user-o"
    :count="count" />
</template>

<script>
import totalizer from '@/components/atoms/stats/totalizers'

export default {
    name:'TotalizerUser',
    components: { totalizer },
    props: ['count']
}
</script>

<style>

</style>