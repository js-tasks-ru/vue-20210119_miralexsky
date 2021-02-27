export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="dateLocal">{{ dateString }}</time>
      </li>
    </ul>`,

  props: {
    organizer: {
      required: true,
      type: String,
    },
    place: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: Date,
    },
  },

  computed: {
    dateString() {
      return this.date.toLocaleString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'})
    },
    dateLocal() {
      return this.date.toISOString().substr(0, 10)
    },
    
  }
};
