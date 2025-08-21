<template>
  <div class="calendar">
    <Header
      :monthName="monthName"
      :year="year"
      @prev-month="prevMonth"
      @next-month="nextMonth"
    />
    <Grid
      :days="daysInMonth"
      :weekdays="weekdays"
      :selectedDate="selectedDate"
      @select-day="selectDay"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import Header from './Header.vue';
import Grid from './Grid.vue';
import { initializeDate, getLocaleData, getDaysInMonth } from '../utils/dateUtils';
import type { Day } from '../types/Types';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'Calendar',
  components: { Header, Grid },
  props: {
    initialDate: {
      type: String,
      default: () => dayjs().format('YYYY-MM-DD'),
    },
    locale: {
      type: String,
      default: 'ru',
    },
  },
  emits: ['select-date'],
  setup(props, { emit }) {
    const month = ref<number | null>(null);
    const year = ref<number | null>(null);
    const selectedDate = ref<string | null>(null);
    const monthNames = ref<string[]>([]);
    const weekdays = ref<string[]>([]);

    const initializeCalendar = () => {
      const { month: initMonth, year: initYear, selectedDate: initDate } = initializeDate(props.initialDate, props.locale);
      month.value = initMonth;
      year.value = initYear;
      selectedDate.value = initDate;
      updateLocale();
    };

    const updateLocale = () => {
      const { monthNames: names, weekdays: days } = getLocaleData(month.value!, year.value!, props.locale);
      monthNames.value = names;
      weekdays.value = days;
    };

    const daysInMonth = computed(() => getDaysInMonth(month.value!, year.value!));

    const monthName = computed(() => monthNames.value[month.value!]);

    const prevMonth = () => {
      month.value!--;
      if (month.value! < 0) {
        month.value = 11;
        year.value!--;
      }
      updateLocale();
    };

    const nextMonth = () => {
      month.value!++;
      if (month.value! > 11) {
        month.value = 0;
        year.value!++;
      }
      updateLocale();
    };

    const selectDay = (day: Day) => {
      if (day.date) {
        selectedDate.value = day.date;
        emit('select-date', day.date);
      }
    };

    onMounted(initializeCalendar);

    return {
      monthName,
      year,
      daysInMonth,
      weekdays,
      selectedDate,
      prevMonth,
      nextMonth,
      selectDay,
    };
  },
});
</script>

<style scoped>
.calendar {
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
</style>