<template>
  <div class="FormAndView">

      <div class="left-side">
        <Form/>
      </div>

      <div class="right-side">
        <template v-if="view">
            <Card/>
        </template>
        
        <template v-else>
            <Bar/>
        </template>
      </div>

  </div>
</template>

<script>
import Form from '@/components/molecules/articles/m-form-create'
import Card from '@/components/molecules/articles/m-item-bar'
import Bar  from '@/components/molecules/articles/m-item-card'

export default {
    name: 'FormAndView',
    components: { Form, Card, Bar }
}
</script>

<style scoped>
    .FormAndView{
        
    }
</style>