<template>
  <div>
    <label>{{ label }}</label>
    <input :type="type" :minlength="minlength" :maxlength="maxlength" />
  </div>
</template>
<script>
export default {
  name: 'InputField',
  props: {
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
