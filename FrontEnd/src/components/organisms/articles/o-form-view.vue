<template>
  <div class="Form-article">
    <FormAndView>

        <template v-slot:left>
            <Form :preview="true" />
        </template>
        
        <template v-slot:right>
            <Preview />
        </template>

    </FormAndView>
  </div>
</template>

<script>
import FormAndView from '@/components/atoms/utils/a-form-view'
import Form from '@/components/molecules/articles/m-form-create'
import Preview from '@/components/molecules/articles/m-form-preview'

export default {
    name: 'FormArticles',
    components: { Form, Preview, FormAndView },
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
    /* justify-content: flex-start; */
    justify-content: center;
    align-items: flex-start;
}
.FormAndView .left-side {
    width: 50%;
    margin: 20px 0 0 20px;
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
</style>