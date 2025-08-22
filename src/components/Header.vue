<template>
  <div class="calendar-header">
    <button v-on:click="$emit('prev-month')">&lt;</button>
    <span class="month-year">{{ monthName }} {{ year }}</span>
    <button v-on:click="$emit('next-month')">&gt;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Компонент для заголовка 

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
  // События для переключения месяцев
  emits: ['prev-month', 'next-month'],
});
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 400px; /* Фиксированная ширина заголовка */
  height: 50px; /* Фиксированная высота заголовка */
  box-sizing: border-box;
}
.month-year {
  width: 200px; /* Фиксированная ширина для текста месяца и года */
  height: 30px; /* Фиксированная высота для текста */
  line-height: 30px; /* Выравнивание по вертикали */
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
button {
  width: 40px; /* Фиксированная ширина кнопок */
  height: 40px; /* Фиксированная высота кнопок */
  font-size: 16px;
  cursor: pointer;
}
</style>