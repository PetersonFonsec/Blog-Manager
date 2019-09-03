<template>
  <div class="FormAndView">

      <div class="left-side" :class="{ 'show' : showRightSide, 'hide' : !showRightSide }">
        <slot name="left"></slot>
      </div>

      <div class="right-side" :class="{ 'show' : showRightSide, 'hide' : !showRightSide }">

        <div class="centralizar" @click="showRightSide = !showRightSide">
            <ButtonEye :show="showRightSide"/>
        </div>

        <slot name="right"></slot>
      </div>

  </div>
</template>

<script>
import ButtonEye from '@/components/atoms/articles/a-button-eye'

export default {
    name: 'FormAndView',
    components: { ButtonEye },
    data(){
        return {
            showRightSide: false
        }
    }
}
</script>

<style scoped>

.FormAndView {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.FormAndView .left-side {
    width: auto;
    margin: 10px;
    transition:linear .4s all;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 1);
}

.FormAndView .right-side{
    box-shadow:  0 1px 5px rgba(0, 0, 0, 0.15);
    border: 1px solid  #AAA;
    border-top: none;
    border-right: none;
    background-color: #fff;
    width: 40%;
    height: 100%;
    padding: 20px 0;
    position: fixed;
    right: 0px;
    transition:linear .4s all;
}

.centralizar{
    position: absolute;
    top: 50%;
    left: -25px;
}

.left-side.show{
    transform: translateX(-50%);
}

.left-side.hide{
    transform: translateX(0);
}

.right-side.show{
    transform: translateX(0%);
}

.right-side.hide{
    transform: translateX(95%)
}

@media only screen and ( max-width:  800px) {
    .FormAndView .right-side{
        display: none;
    }
    .FormAndView .left-side{
        width: 100%;
        margin: 20px;
    }
}
</style>