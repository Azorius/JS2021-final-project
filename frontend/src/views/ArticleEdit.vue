<template>
  <div class="content">
    <div class="editor">
      <InputField
        label="Article Title"
        :value="title"
        maxlength="50"
        @valid="setValidationState"
      />
      <InputField
        label="Article Description"
        :value="description"
        maxlength="280"
        @valid="setValidationState"
      />
      <InputField
        label="Article Text"
        :value="text"
        maxlength="4000"
        @valid="setValidationState"
      />
      <label>image</label>
      <input type="file" id="imageFile" />
      <button @click="submitArticle">Submit</button>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/InputField'

export default {
  name: 'ArticleEdit',
  components: {
    InputField,
  },
  data() {
    return {
      title: '',
      description: '',
      text: '',
    }
  },
  methods: {
    setValidationState() {},
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

.inputstyle {
  height: 100px;
  width: 100%;
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
