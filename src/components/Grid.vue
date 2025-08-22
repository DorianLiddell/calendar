<template>
  <div class="calendar-grid">
    <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
    <div
      v-for="day in days"
      :key="day.date"
      class="day"
      :class="{
        selected: selectedDate === day.date,
        today: isToday(day.date)
      }"
      v-on:click="$emit('select-day', day)"
    >
      {{ day.day }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isToday } from '../utils/dateUtils';
import type { Day } from '../types/Types';

// Компонент для сетки дней


export default defineComponent({
  name: 'Grid',
  props: {
    days: {
      type: Array as () => Day[],
      required: true,
    },
    weekdays: {
      type: Array as () => string[],
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { isToday };
  },
  emits: ['select-day'],
});
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 50px); 
  gap: 5px;
  width: 400px; 
  height: 350px; 
  box-sizing: border-box;
}
.weekday,
.day {
  width: 50px; 
  height: 50px; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
}
.weekday {
  font-weight: bold;
}
.day {
  cursor: pointer;
}
.day:hover {
  background-color: #5e5c5c;
}
.selected {
  background-color: #3e3e3e;
  color: white;
}
.today {
  border: 1px solid #c4c7c9;
}
</style>