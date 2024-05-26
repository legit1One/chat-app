<template>
  <ChatHeader :selectedTheme="theme" @change="sendMessage($event, WS_MESSAGE_TYPE.THEME)"/>
  <ChatMessages :messages="messages"/>
  <ChatInput @send="sendMessage($event, WS_MESSAGE_TYPE.CHAT)"/>
</template>
<script setup>
import ChatInput from "@/components/ChatInput.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import ChatHeader from "@/components/ChatHeader.vue";
import { WS_MESSAGE_TYPE } from "@/static/common.js";
import { useChatWs } from "@/composables/useChatWs.js";

const { sendMessage, messages, theme } = useChatWs()
</script>