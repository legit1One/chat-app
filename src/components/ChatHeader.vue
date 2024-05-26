<template>
  <div class="header">
    Server Chat

    <div class="themes">
      <div @click="emit('change', theme)"
           class="theme"
           :class="[`theme--${theme}`, {'theme--active': selectedTheme === theme}]"
           v-for="theme in APP_THEME">
      </div>
    </div>
  </div>
</template>
<script setup>
import { APP_THEME } from "@/static/common.js";

defineProps({
  selectedTheme: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['change'])
</script>
<style scoped lang="scss">
.header {
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--chat-input-bg);
}

.themes {
  display: flex;
  cursor: pointer;
  gap: 4px;
  position: relative;
}

.theme {
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;

  &--active {
    border: 1px solid #0A0A0A;
  }

  &--blue {
    background: #2563EB;
  }

  &--red {
    background: #EF4444;
  }

  &--purple {
    background: #7E22CE;
  }

  &--green {
    background: #166534;
  }

  &--default {
    background: #A1A1AA;
  }
}
</style>