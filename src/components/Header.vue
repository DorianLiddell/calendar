<template>
  <div class="calendar-header">
    <button @click="$emit('prev-month')">&lt;</button>
    <span>{{ monthName }} {{ year }}</span>
    <button @click="$emit('next-month')">&gt;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    monthName: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  emits: ['prev-month', 'next-month'],
});
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>