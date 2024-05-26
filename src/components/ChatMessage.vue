<template>
  <div class="message" :class="{'message--right': rightAligned}">{{ message }}</div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  },
  rightAligned: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.message {
  background: var(--chat-message-bg);
  width: fit-content;
  max-width: min(400px, 80%);
  padding: 8px 16px;
  border-radius: 8px;

  &--right {
    margin-left: auto;
  }
}
</style>