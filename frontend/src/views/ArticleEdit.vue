<template>
  <div class="content">
    <div class="editor">
      <InputField label="title" maxlength="50" @edit="edited" />
      <InputField
        label="description"
        maxlength="280"
        @edit="edited"
        :textarea="edited"
        :rows="4"
      />
      <InputField
        label="text"
        maxlength="4000"
        @edit="edited"
        :textarea="edited"
        :rows="10"
      />
      <div class="image-select-block">
        <input type="file" id="imageFile" @change="fileChange" />

        <label class="file-label">{{ selectedFileName }}</label>
        <label class="file-button" for="imageFile">Select Image</label>
      </div>
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
      inputFields: {},
      title: '',
      description: '',
      text: '',
      selectedFileName: '',
    }
  },
  methods: {
    edited(name, value) {
      this.inputFields[name] = value
    },
    fileChange() {
      this.selectedFileName = document.querySelector('#imageFile').files[0].name
    },
    submitArticle() {
      let formData = new FormData()
      let imagefile = document.querySelector('#imageFile')
      formData.append('postImg', imagefile.files[0])
      formData.append('title', this.inputFields.title)
      formData.append('text', this.inputFields.text)
      formData.append('description', this.inputFields.description)
      let payload = {
        data: formData,
      }
      if (this.$route.params.id) {
        payload.id = this.$route.params.id
      }

      this.$store.dispatch('sendPost', payload).then(() => {
        this.$router.push('/posts/user')
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
}

#imageFile {
  display: none;
}
.image-select-block {
  margin-top: var(--spacing);
  display: flex;
}
.file-button {
  height: 2rem;
  width: 8rem;
  background: var(--color-primary);
  color: white;
  padding-top: 4px;
  display: flex;
  justify-content: center;
}
.file-button:hover {
  background: var(--color-primary-hover);
}

.file-label {
  flex: 1;
}

.content {
  display: flex;
  justify-content: center;
}
</style>
