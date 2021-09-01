<template>
  <div class="content">
    <div class="editor">
      <input type="text" maxlength="50" v-model="title" />
      <textarea
        cols="30"
        maxlength="280"
        rows="3"
        v-model="description"
      ></textarea>
      <textarea cols="30" rows="10" maxlength="4000" v-model="text"></textarea>
      <label>image</label>
      <input type="file" id="imageFile" />
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
      let formData = new FormData()
      let imagefile = document.querySelector('#imageFile')
      formData.append('postImg', imagefile.files[0])
      formData.append('title', this.title)
      formData.append('text', this.text)
      formData.append('description', this.description)
      let payload = {
        data: formData,
      }
      if (this.$route.params.id) {
        payload.id = this.$route.params.id
      }

      this.$store.dispatch('sendPost', payload).then(response => {
        this.$router.push('/posts/user')
        console.log(response)
      })
    },
  },
  created() {
    if (this.$route.params.id) {
      let article = this.$store.getters.userArticles.find(
        article => article.id == this.$route.params.id
      )
      this.title = article.title
      this.description = article.description
      this.text = article.text
    }
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
