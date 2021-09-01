<template>
  <div class="container">
    <div class="label-container">
      <label>{{ label }}</label>
      <label id="message"></label>
    </div>
    <input
      :type="type"
      :minlength="minlength"
      :maxlength="maxlength"
      :value="value"
      v-on:input="change"
    />
  </div>
</template>
<script>
export default {
  name: 'InputField',
  props: {
    value: {
      default: '',
    },
    label: {
      default: '',
    },
    type: {
      default: 'text',
    },
    minlength: {
      default: 0,
    },
    maxlength: {
      default: null,
    },
  },
  methods: {
    change(event) {
      let val = event.target.value
      let message = ''
      switch (true) {
        case val.length < this.minlength:
          message = 'too short'
          break
        case val.length <= this.maxlength:
          message = `${val.length}/${this.maxlength}`
          break
        case val.length > this.maxlength:
          message = 'too long'
          break
        default:
          message = 'ok'
      }

      this.$el.querySelector('#message').innerHTML = message
    },
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.label-container {
  display: flex;
}
#message {
  margin-left: 10;
  flex: 1;
  text-align: right;
}
</style>
