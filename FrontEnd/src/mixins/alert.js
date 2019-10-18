const alertMixins = {
    methods:{
        alertError(msg){
            this.$toasted.show(msg, { 
                type: 'error',
                icon: 'fa-exclamation-triangle',
            });
        },
        alertSuccess(msg){
            this.$toasted.show(msg, { 
                type: 'success',
                icon: 'done',
            });
        },
    }
}

export default alertMixins