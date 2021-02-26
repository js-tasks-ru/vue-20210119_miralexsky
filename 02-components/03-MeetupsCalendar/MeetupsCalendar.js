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
    return {
      currentDate: Date.now(),
    };
  },

  created() {
    this.setCurrentDate();
  },

  computed: {
    currentMonthString() {
      return this.currentDate.toLocaleString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    sortedMeetups() {
      return this.meetups.sort((a, b) => a.date - b.date);
    },

    calendarStart() {
      let newDate = new Date(this.currentDate);

      while (newDate.getUTCDay() != 0) {
        newDate.setDate(newDate.getDate() - 1);
      }

      return newDate;
    },

    calendarFinish() {
      let newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      newDate.setDate(0);

      while (newDate.getUTCDay() != 6) {
        newDate.setDate(newDate.getDate() + 1);
      }

      newDate.setHours(23, 59, 59, 59);
      return newDate;
    },

    currentMeetups() {
      //let meetups = this.meetups.filter(meetup => (meetup.date >= this.calendarStart && meetup.date <= this.calendarFinish));
      let meetups = this.quickSearchAllMeetups(this.sortedMeetups, this.calendarStart, this.calendarFinish);
      return meetups;
    },

    calendarModel() {
      let calendar = [];
      let calendarDate = new Date(this.calendarStart);

      while (calendarDate <= this.calendarFinish) {
        let startDay = new Date(calendarDate);
        startDay.setHours(0, 0, 0, 0);

        let finishDay = new Date(calendarDate);
        finishDay.setHours(23, 59, 59, 59);

        calendar.push({
          id: startDay.getTime(),
          meetupDate: new Date(startDay),
          inactive: startDay.getMonth() !== this.currentDate.getMonth(),
          meetups: this.currentMeetups.filter(meetup => 
            meetup.date >= startDay.getTime() && 
            meetup.date <= finishDay.getTime()),
        });

        calendarDate.setDate(calendarDate.getDate() + 1);
      }

      return calendar;
    }
  },

  methods: {
    setCurrentDate() {
      let currentDate = new Date();
      currentDate.setDate(1);
      currentDate.setHours(0,0,0,0);

      this.currentDate = currentDate;
    },
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

    quickSearchAllMeetups(sortedMeetups, startDate, endDate) {
      
      let firstIndex = sortedMeetups.findIndex(meetup => meetup.date >= startDate.getTime());
      if (firstIndex == -1) return [];

      let lastIndex = sortedMeetups.findIndex(meetup => meetup.date > endDate.getTime());
      if (lastIndex == -1) 
        lastIndex = sortedMeetups.length - 1;
      else 
        lastIndex -= 1;

      return sortedMeetups.slice(firstIndex, lastIndex + 1);
    }
  },
};
