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
import cSomething from '@/components/atoms/utils/a-conteiner-box'
export default {
    name: 'addSomething',
    props: ['BlogName'],
    components:{ cSomething }
}
</script>

<style lang="scss" scoped>
  @import 'm-blogs';
</style>