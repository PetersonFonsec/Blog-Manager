 <template>
  <div id="my-container">

    <div class="my-3">
      <div id="popover-reactive-1" :disabled="popoverShow" variant="primary" ref="button">
        <slot name="trigger"></slot>
      </div>
    </div>

    <b-popover
      target="popover-reactive-1"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover">

      <template slot="title">
        
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>

        {{ title }}
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
            required: true
        }
    },
    data() {
      return {
        popoverShow: false
      }
    },
    methods: {
      onClose() {
        this.popoverShow = false
      }
    }
  }
</script>