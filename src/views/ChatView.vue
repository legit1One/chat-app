<template>
  <ChatHeader :selectedTheme="theme" @change="sendMessage($event, WS_MESSAGE_TYPE.THEME)"/>
  <ChatMessages :messages="messages"/>
  <ChatInput @send="sendMessage($event, WS_MESSAGE_TYPE.CHAT)"/>
</template>
<script setup>
import { onBeforeMount, ref  } from "vue";
import ChatInput from "@/components/ChatInput.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import ChatHeader from "@/components/ChatHeader.vue";
import { APP_THEME, WS_MESSAGE_TYPE   } from "@/static/common.js";
const theme = ref(APP_THEME.DEFAULT)
const messages = ref([])
let socket = new WebSocket('wss://echo.websocket.org/');

function sendMessage (value, type) {
  if(type === WS_MESSAGE_TYPE.CHAT) {
    messages.value.push({ text: value })
  } else if(value === theme.value) return

  socket.send(JSON.stringify({ value, type }))
}

onBeforeMount(() => {
  socket.onmessage = function({ data }) {
    try {
      const response = JSON.parse(data)

      if(response.type === WS_MESSAGE_TYPE.THEME) {
        theme.value = response.value
        const html = document.querySelector('html')
        html.classList.remove(...html.classList)
        html.classList.add(response.value)
      } else {
        messages.value.push({ text: response.value, isRightAligned: true })
      }
    } catch (e) {
      console.error(e)
    }
  };
})
</script>