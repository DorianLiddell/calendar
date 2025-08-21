<template>
  <div class="calendar-grid">
    <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
    <div
      v-for="day in days"
      :key="day.date"
      class="day"
      :class="{ selected: selectedDate === day.date, today: isToday(day.date) }"
      @click="$emit('select-day', day)"
    >
      {{ day.day }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isToday } from '../utils/dateUtils';
import type { Day } from '../types/Types';

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
  gap: 5px;
}
.weekday,
.day {
  text-align: center;
  padding: 10px;
}
.day {
  cursor: pointer;
}
.day:hover {
  background-color: #f0f0f0;
}
.selected {
  background-color: #007bff;
  color: white;
}
.today {
  border: 1px solid #007bff;
}
</style>