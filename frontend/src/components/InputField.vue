<template>
  <div class="container">
    <div class="label-container">
      <label>{{ label }}</label>
      <label id="message"></label>
    </div>

    <textarea
      v-if="textarea == true"
      :minlength="minlength"
      :maxlength="maxlength"
      :value="value"
      v-on:input="change"
      :rows="rows"
      :cols="cols"
    />
    <input
      v-else
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
    textarea: {
      default: false,
      type: Boolean,
    },
    rows: {
      default: 1,
    },
    cols: {
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
          this.setOk(false)
          break
        case val.length <= this.maxlength:
          message = `${val.length}/${this.maxlength}`
          this.setOk(true)
          break
        case val.length > this.maxlength:
          message = 'too long'
          this.setOk(false)
          break
        default:
          this.setOk(true)
          message = 'ok'
      }

      this.$el.querySelector('#message').innerHTML = message
    },
    setOk(value) {
      this.$emit('valid', this.label, value)
    },
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing);
}

.label-container {
  display: flex;
}
#message {
  margin-left: 10;
  flex: 1;
  text-align: right;
}
input {
  border: 1px solid #999;
  height: 2rem;
  outline: none;
  padding-left: var(--spacing-half);
  padding-right: var(--spacing-half);
}
textarea {
  border: 1px solid #999;
  outline: none;
  padding: var(--spacing-half);
  resize: none;
}
input:focus {
  border: 1px solid indigo;
}
</style>
