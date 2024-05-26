<template>
  <div ref="messagesRef" class="messages">
    <ChatMessage v-for="message in messages"
                 :message="message.text"
                 :right-aligned="message.isRightAligned"/>
  </div>
</template>
<script setup>
import { nextTick, ref, watch } from "vue";
import ChatMessage from "@/components/ChatMessage.vue";

const messagesRef = ref()
const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

watch(props.messages, async () => {
  await nextTick()
  messagesRef.value.scrollTo(0, messagesRef.value.scrollHeight)
})
</script>
<style scoped lang="scss">
.messages {
  padding: 12px;
  overflow: auto;
  height: calc(100vh - 107px);
  background: var(--chat-messages-bg);
  display: flex;
  flex-direction: column;
  gap: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
}
</style>