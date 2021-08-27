<template>
  <div class="content">
    <div class="editor">
      <input type="text" />
      <textarea cols="30" rows="3"></textarea>
      <textarea cols="30" rows="10"></textarea>
      <button>Submit</button>
    </div>
  </div>
</template>

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
</style>
