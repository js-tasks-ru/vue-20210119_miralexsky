export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonth"></button>
          <div>{{ currentMonthString }}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
          <div v-for="cell in calendarModel" 
          :key="cell.id" class="rangepicker__cell" 
          :class="{'rangepicker__cell_inactive': cell.inactive}">
            {{ cell.meetupDate.getDate() }}
            <a v-for="meetup in cell.meetups" :key="meetup.id" class="rangepicker__event">
              {{ meetup.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    let currentDate = new Date();
    currentDate.setDate(1);
    currentDate.setHours(0,0,0,0);

    return {
      currentDate,
      computedCalendar: {},
    };
  },

  computed: {
    currentMonthString() {
      return this.currentDate.toLocaleString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    sortedMeetups() {
      let sortedMeetups = {};

      for (let meetup of this.meetups) {
        let meetupDate = new Date(meetup.date);
        let meetupYear = meetupDate.getFullYear();
        let meetupMonth = meetupDate.getMonth();
        let meetupDay = meetupDate.getDate();

        let dayMeetups = this.getOrCreate(sortedMeetups, [], meetupYear, meetupMonth, meetupDay);
        dayMeetups.push(meetup);
      }

      return sortedMeetups;
    },

    calendarStart() {
      let newDate = new Date(this.currentDate);

      while (newDate.getDay() != 1) {
        newDate.setDate(newDate.getDate() - 1);
      }

      return newDate;
    },

    calendarFinish() {
      let newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      newDate.setDate(0);

      while (newDate.getDay() != 0) {
        newDate.setDate(newDate.getDate() + 1);
      }

      newDate.setHours(23, 59, 59, 59);
      return newDate;
    },

    currentMeetups() {
      let yearMeetups = this.sortedMeetups[ this.currentDate.getFullYear() ];
      let monthMeetups = yearMeetups ?  yearMeetups[ this.currentDate.getMonth() ] : [];
      return monthMeetups ?? [];
    },

    calendarModel() {
      let yearCalendar = this.computedCalendar[ this.currentDate.getFullYear() ];
      let monthCalendar = yearCalendar ? yearCalendar[ this.currentDate.getMonth() ] : null;
      if (monthCalendar) {
        console.log('Yep, we\'ve got stored calendar');
        return monthCalendar;
      }

      let calendar = [];
      let calendarDate = new Date(this.calendarStart);

      while (calendarDate <= this.calendarFinish) {
        let startDay = new Date(calendarDate);
        startDay.setHours(0, 0, 0, 0);

        let isCurrentMonth = startDay.getMonth() == this.currentDate.getMonth();

        calendar.push({
          id: startDay.getTime(),
          meetupDate: new Date(startDay),
          inactive: !isCurrentMonth,
          meetups: isCurrentMonth ? this.currentMeetups[startDay.getDate()] : [],
        });

        calendarDate.setDate(calendarDate.getDate() + 1);
      }

      this.getOrCreate(this.computedCalendar, calendar, this.currentDate.getFullYear(), this.currentDate.getMonth());

      return calendar;
    }
  },

  methods: {
    prevMonth() {
      let newDate = new Date(this.currentDate);
      newDate.setMonth(this.currentDate.getMonth() - 1);
      this.currentDate = newDate;
    },
    nextMonth() {
      let newDate = new Date(this.currentDate);
      newDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = newDate;
    },
    getOrCreate(obj, lastItem, ...props) {
      let stage = obj || {};

      for (let propsIndex = 0; propsIndex < props.length; propsIndex++) {
        let prop = props[propsIndex];
        if (!stage[prop]) propsIndex == props.length - 1 ? stage[prop] = lastItem : stage[prop] = {};
        stage = stage[prop];
      }

      return stage;
    },
  },
};
