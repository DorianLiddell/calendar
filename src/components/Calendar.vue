<template>
  <div class="calendar">
    <Header
      v-if="monthName && year"
      :monthName="monthName"
      :year="year"
      v-on:prev-month="prevMonth"
      v-on:next-month="nextMonth"
    />
    <Grid
      :days="daysInMonth"
      :weekdays="weekdays"
      :selectedDate="selectedDate"
      v-on:select-day="selectDay"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import Header from './Header.vue';
import Grid from './Grid.vue';
import { initializeDate, getLocaleData, getDaysInMonth } from '../utils/dateUtils';
import type { Day } from '../types/Types';
import dayjs from 'dayjs';

// Главный компонент календаря

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
    const month = ref<number>(0);
    const year = ref<number>(2025);
    const selectedDate = ref<string>('');
    const monthNames = ref<string[]>([]);
    const weekdays = ref<string[]>([]);

    const initializeCalendar = () => {
      const dateInfo = initializeDate(props.initialDate, props.locale);
      month.value = dateInfo.month;
      year.value = dateInfo.year;
      selectedDate.value = dateInfo.selectedDate;

      updateLocale();
    };


    const updateLocale = () => {
      const validLocale = props.locale === 'ru' || props.locale === 'en' ? props.locale : 'ru';
      const localeData = getLocaleData(validLocale);
      monthNames.value = localeData.monthNames;
      weekdays.value = localeData.weekdays;
    };

    const daysInMonth = computed(() => {
      return getDaysInMonth(month.value, year.value);
    });

    const monthName = computed(() => {
      if (monthNames.value && month.value >= 0) {
        return monthNames.value[month.value];
      }
      return '';
    });

    const prevMonth = () => {
      let newMonth = month.value - 1;
      if (newMonth < 0) {
        newMonth = 11;
        year.value = year.value - 1;
      }
      month.value = newMonth;
      updateLocale();
    };

    const nextMonth = () => {
      let newMonth = month.value + 1;
      if (newMonth > 11) {
        newMonth = 0;
        year.value = year.value + 1;
      }
      month.value = newMonth;
      updateLocale();
    };

    const selectDay = (day: Day) => {
      if (day.date !== '') {
        selectedDate.value = day.date;
        emit('select-date', day.date);
      }
    };

    watch(() => props.locale, (newLocale) => {
      console.log('Изменена на:', newLocale);
      updateLocale();
    });

    onMounted(() => {
      initializeCalendar();
    });

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
  width: 400px; 
  height: 400px; 
  margin: 0 auto;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>