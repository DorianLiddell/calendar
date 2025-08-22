import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import type { DateInfo, LocaleData, Day } from '../types/Types';

// Начальная настройка даты
export const initializeDate = (initialDate: string | undefined, locale: string): DateInfo => {
  dayjs.locale(locale);

  // Проверяем, валидна ли дата
  let dateToUse = dayjs();
  if (initialDate && dayjs(initialDate).isValid()) {
    dateToUse = dayjs(initialDate);
  }

  const result: DateInfo = {
    month: dateToUse.month(),
    year: dateToUse.year(),
    selectedDate: initialDate || dateToUse.format('YYYY-MM-DD'),
  };

  return result;
};

// Получаем названия месяцев и дней 
export const getLocaleData = (locale: string): LocaleData => {
  dayjs.locale(locale);

  const monthNames: string[] = [];
  for (let i = 0; i < 12; i++) {
    monthNames.push(dayjs().month(i).locale(locale).format('MMMM'));
  }

  const weekdays: string[] = [];
  for (let i = 0; i < 7; i++) {
    weekdays.push(dayjs().day(i).locale(locale).format('dd'));
  }

  return { monthNames, weekdays };
};

// Получаем дни месяцев
export const getDaysInMonth = (month: number, year: number): Day[] => {
  const days: Day[] = [];
  const startOfMonth = dayjs(`${year}-${month + 1}-01`);
  const endOfMonth = startOfMonth.endOf('month');
  const startDay = startOfMonth.day() || 7; 
  const numDays = endOfMonth.date();

  // Пустые ячейки
  for (let i = 1; i < startDay; i++) {
    const emptyDay: Day = { day: '', date: '' };
    days.push(emptyDay);
  }

  for (let i = 1; i <= numDays; i++) {
    const dateString = startOfMonth.date(i).format('YYYY-MM-DD');
    const dayObject: Day = { day: i, date: dateString };
    days.push(dayObject);
  }

  return days;
};

// Является ли дата сегодняшней
export const isToday = (date: string): boolean => {
  const today = dayjs().format('YYYY-MM-DD');
  return date === today;
};