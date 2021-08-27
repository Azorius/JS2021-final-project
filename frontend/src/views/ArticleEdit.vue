<template>
  <div class="content">
    <div class="editor">
      <input type="text" v-model="title" />
      <textarea cols="30" rows="3" v-model="description"></textarea>
      <textarea cols="30" rows="10" v-model="text"></textarea>
      <button @click="submitArticle">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      text: '',
    }
  },
  methods: {
    submitArticle() {
      this.$store.dispatch('addPost', {
        title: this.title,
        text: this.text,
        description: this.description,
      })
    },
  },
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  width: 30rem;

  border: 1px solid fuchsia;
  box-sizing: border-box;
}

.content {
  display: flex;
  justify-content: center;
  border: 1px solid coral;
  box-sizing: border-box;
}

textarea {
  resize: none;
}
</style>
