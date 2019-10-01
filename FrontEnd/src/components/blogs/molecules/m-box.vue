<template>
	<div class="load">

        <cSomething>
        
            <div class="btn">
                <i class="fa fa-file-o"></i>
            </div>
        
        </cSomething>  

        <h3>{{ BlogName }}</h3>
        
    </div>
</template>

<script>
import cSomething from '@/components/utils/atoms/a-conteiner-box'
export default {
    name: 'addSomething',
    props: {
        BlogName:{
            type: String,
            required: true
        }
    },
    components:{ cSomething }
}
</script>

<style lang="scss" scoped>
  @import 'm-blogs';
</style>