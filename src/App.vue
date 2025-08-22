<template>
  <div>
    <button v-on:click="changeLocale">{{ selectedLocale === 'ru' ? 'Русский' : 'English' }}</button>
    <Calendar
      :initialDate="'2025-08-21'"
      :locale="selectedLocale"
      v-on:select-date="handleDateSelect"
    />
    <p>Выбранная дата: {{ selectedDate }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Calendar from './components/Calendar.vue';

export default defineComponent({
  components: {
    Calendar,
  },
  setup() {
    const selectedDate = ref<string>('');
    const selectedLocale = ref<string>('ru');
    const handleDateSelect = (date: string) => {
      selectedDate.value = date;
    };

    const changeLocale = () => {
      if (selectedLocale.value === 'ru') {
        selectedLocale.value = 'en';
      } else {
        selectedLocale.value = 'ru';
      }
    };

    return {
      selectedDate,
      selectedLocale,
      handleDateSelect,
      changeLocale,
    };
  },
});
</script>
