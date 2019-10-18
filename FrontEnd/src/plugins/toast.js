import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    position: "top-right",
    duration: 3000,
    theme: "outline", 
    action : {
        text : 'Close',
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
})