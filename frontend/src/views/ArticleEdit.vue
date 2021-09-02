<template>
  <div class="content">
    <div class="editor">
      <InputField label="title" :value="title" maxlength="50" @edit="edited"/>
      <InputField
        label="description"
        :value="description"
        maxlength="280"
        @edit="edited"
        textarea
        :rows="4"
      />
      <InputField
        label="text"
        :value="text"
        maxlength="4000"
        @edit="edited"
        textarea
        :rows="10"
      />
      <div class="image-select-block">
        <input type="file" id="imageFile" @change="fileChange" />

        <label class="file-label">{{ selectedFileName }}</label>
        <label class="file-button" for="imageFile">Select Image</label>
      </div>
      <button 
        @click="submitArticle"
        :disabled="!(inputFields.title && inputFields.description && inputFields.text)"
      >Submit</button>
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

      if (imagefile.files[0]) {
        console.log('here')
        formData.append('postImg', imagefile.files[0])
      }
      formData.append('title', this.inputFields.title)
      formData.append('text', this.inputFields.text)
      formData.append('description', this.inputFields.description)

      let payload = {
        data: formData,
      }

      if (this.$route.params.id) {
        payload.id = this.$route.params.id
        this.$store.dispatch('updatePost', payload).then(() => {
          this.$router.push('/posts/user')
        })
        return;
      }
      
      this.$store.dispatch('addPost', payload).then(() => {
        this.$router.push('/posts/user')
      })
    },
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      const article = this.$store.getters.userArticles.find(
        article => article.id == this.$route.params.id
      )

      const { title, description, text } = article

      this.title = title
      this.description = description
      this.text = text
      this.inputFields = {
        title,
        description,
        text,
      }
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
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding-left: var(--spacing);
  padding-right: var(--spacing);
}
</style>
