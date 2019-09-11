<template>
    <div class="field">     
        <template v-if="editField">
            <div class="container-edit-field">

                <b-form-input 
                    id="editField"
                    v-model="newValue"
                    :placeholder="`Alterar seu ${label}`"/>

                <b-button variant="success" v-b-modal="id" class="ml-3"> 
                    <i class="fa fa-check"></i>
                </b-button>

                <b-button 
                    class="ml-3"
                    variant="danger"
                    @click="editField = !editField"> 
                    <i class="fa fa-close"></i>
                </b-button>

            </div>
        </template>

        <template v-else>
            <div class="value">

                Seu {{ label }}: <strong class="ml-3"> {{ value }} </strong>

                <b-button variant="primary" @click="editField = !editField" class="ml-3"> 
                    <i class="fa fa-pencil"></i>
                </b-button>

            </div>
        </template>

        <b-modal :id="id" title="Você tem certeza ?">

            <p> Você deseja alterar {{ label }} ? </p>

            <p> de "{{ value }}" para "{{ newValue }}" ? </p>

            <template v-slot:modal-footer>
                <b-button variant="danger">Cancelar</b-button>
                <b-button variant="primary">Confirmar</b-button>
            </template>
        </b-modal>

    </div>
</template>

<script>
export default {
    props:{
        value:{
            type: String,
            required: true
        },
        label:{
            type: String,
            required: true
        }
    },
    methods:{
        editedField(){

            this.editField = false

            this.$emit('editedField',  this.newValue)

        }
    },
    computed:{
        id(){
            return `confirm-${(Math.random() * 100).toFixed()}`   
        }
    },
    data(){
        return {
            editField: false,
            newValue: '',
        }
    },
    mounted(){
        this.newValue = this.value
    }
}
</script>

<style scoped>

.container-edit-field{
    display: flex;
}   
.value {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    width: 320px;
}

</style>