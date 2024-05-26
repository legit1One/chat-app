<template>
  <div class="form">
    <input class="form__input"
           v-model="message"
           type="text"
           placeholder="Write a message">
    <button class="form__action"
            :class="{'form__action--invisible': message.length === 0}"
            @click="sendMessage"
    >
      Send message
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(['send'])

const message = ref('')

function sendMessage() {
  emit('send', message.value)
  message.value = ''
}
</script>

<style scoped lang="scss">
.form {
  padding: 12px;
  display: flex;
  gap: 12px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--chat-input-bg);
  box-shadow: 0 12px 20px -6px black;

  &__input {
    height: 36px;
    padding: 10px 12px;
    border: none;
    width: 100%;
    outline: none;
    background: #F4F4F7;
    border-radius: 16px;
  }

  &__action {
    border: none;
    color: #27AE60;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    width: 200px;
    transition: .2s all ease-in-out;

    &--invisible {
      width: 0;
    }
  }
}
</style>