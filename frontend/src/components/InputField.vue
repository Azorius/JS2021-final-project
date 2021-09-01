<template>
  <div>
    <label>{{ label }}</label>
    <input
      :type="type"
      :minlength="minlength"
      :maxlength="maxlength"
      :value="value"
    />
  </div>
</template>
<script>
export default {
  name: 'InputField',
  props: {
    value: {
      default: '',
      type: String,
    },
    label: {
      default: '',
      type: String,
    },
    type: {
      default: 'text',
      type: String,
    },
    minlength: {
      default: 0,
      type: Number,
    },
    maxlength: {
      default: null,
      type: Number,
    },
  },
}
</script>
