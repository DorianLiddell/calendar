<template>
  <div>
    <h1>Календарь</h1>
    <Calendar
      :initialDate="'2025-08-21'"
      :locale="'ru'"
      @select-date="handleDateSelect"
    />
    <p>Выбранная дата: {{ selectedDate }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Calendar from './components/Calendar.vue';

export default defineComponent({
  components: { Calendar },
  setup() {
    const selectedDate = ref<string | null>(null);

    const handleDateSelect = (date: string) => {
      selectedDate.value = date;
      console.log('Выбранная дата:', date);
    };

    return { selectedDate, handleDateSelect };
  },
});
</script>
