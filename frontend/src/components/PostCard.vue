<template>
  <div class="container">
    <div
      class="article-image"
      :style="{ backgroundImage: `url(${img})` }"
    ></div>
    <div class="article-contents-wrapper">
      <div class="contents">
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
        <div class="author-block">
          <div class="author-icon">{{ authorName }}</div>
          <!-- <img src="@/assets/placeholder_icon.png" /> -->
          <p>{{ name }}</p>
          <img
            v-if="editMode"
            class="action-button"
            @mouseover="deleteHover = true"
            @mouseleave="deleteHover = false"
            @click.stop="action('delete')"
            :src="editHover ? '/icon_delete_hover.png' : '/icon_delete.png'"
          />
          <img
            v-if="editMode"
            class="action-button"
            @mouseover="editHover = true"
            @mouseleave="editHover = false"
            @click.stop="action('edit')"
            :src="editHover ? '/icon_edit_hover.png' : '/icon_edit.png'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    title: String,
    text: String,
    img: String,
    name: String,
    editMode: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      editHover: false,
      deleteHover: false,
    }
  },
  methods: {
    action(action) {
      this.$emit(action)
    },
  },
  computed: {
    authorName() {
      return this.name[0].toUpperCase()
    },
  },
}
</script>

<style scoped>
.article-image {
  width: 50%;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.author-icon {
  background: gray;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  text-align: center;
  font-weight: 800;
  font-size: 2rem;
  padding-top: 3px;
  color: white;
}

.article-contents-wrapper {
  width: 50%;
}

.contents {
  height: 100%;
  padding: var(--spacing);
  display: flex;
  flex-direction: column;
}

.contents > p {
  flex: 1;
}

.author-block {
  display: flex;
  flex-direction: row;
}
.author-block > img {
  width: 3rem;
  height: 3rem;
}
.author-block > p {
  margin: auto;
  margin-left: var(--spacing);
}

.action-button {
  margin-left: var(--spacing-half);
}

.container:hover {
  cursor: pointer;
  opacity: 0.6;
}

.container {
  width: 100%;
  height: 100%;

  display: flex;
  background: #ffffff;
  box-shadow: inset 0px 0px 0px 1px #ccc;
}

@media (max-width: 480px) {
  .container {
    flex-direction: column;
  }

  .article-image {
    width: 100%;
    height: 30%;
  }

  .article-contents-wrapper {
    width: 100%;
    height: 70%;
  }
}
</style>
