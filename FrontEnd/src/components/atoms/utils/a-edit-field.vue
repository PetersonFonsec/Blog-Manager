<template>
    <div class="field">     
        <template v-if="editField">
            <div class="container-edit-field">

                <b-form-input 
                    id="editField"
                    v-model="newValue"
                    :placeholder="`Alterar seu ${label}`"/>

                <b-button variant="success" @click="editedField" class="ml-3"> 
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
            const newValue = this.newValue
            
            this.editField = false

            this.$emit('editedField', newValue)

        }
    },
    data(){
        return {
            editField: false,
            newValue: this.value,
        }
    }
}
</script>

<style scoped>

.container-edit-field{
    display: flex;
}   
.value{
    display: inline-block;
    min-width: 320px;
}

</style>