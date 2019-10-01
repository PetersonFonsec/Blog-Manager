 <template>
  <div :id="container">

    <div class="my-3">
      
      <div 
        :id="target"
        :disabled="popoverShow" 
        variant="primary" 
        :ref="refTarget">
      
        <slot name="trigger"></slot>
      
      </div>

    </div>

    <b-popover
      :target="target"
      :show.sync="popoverShow"
      :container="container"
      ref="something"
      triggers="click"
      placement="auto">

      <template slot="title">
        
        <b-button 
          @click="onClose" 
          class="close" 
          aria-label="Close">
        
          <span 
            class="d-inline-block" 
            aria-hidden="true"> &times;
          
          </span>

        </b-button>

        <span class="mr-3"> 
        
          {{ title }} 
        
        </span>

      </template>

      <div>
        
        <slot name="content"></slot>
      
      </div>

    </b-popover>

  </div>
</template>

<script>
  export default {
    props:{
      title:{
        type: String,
        required: true,
      },
      target:{
        type: String,
        required: true,
      },
      container:{
        type: String,
        required: true,
      },
      refTarget:{
        type: String,
        required: true,          
      }
    },
    data() {
      return {
        popoverShow: false,
      }
    },
    methods: {
      onClose() {
        this.popoverShow = false
      }
    }
  }
</script>