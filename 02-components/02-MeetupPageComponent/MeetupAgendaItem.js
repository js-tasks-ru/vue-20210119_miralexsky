import { agendaItemIcons, agendaItemTitles } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="\`/assets/icons/icon-\${this.icon}.svg\`" />
      </div>
      <div class="meetup-agenda__item-col">{{ time }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <p>
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot" v-if="agendaItem.language"></span>
          <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      required: true,
      type: Object
    }
  },

  computed: {
    time() {
      return this.agendaItem.startsAt + ' - ' +  this.agendaItem.endsAt
    },
    title() {
      return this.agendaItem.title || agendaItemTitles[this.agendaItem.type]
    },
    icon() {
      return agendaItemIcons[this.agendaItem.type]
    }
  }
};
