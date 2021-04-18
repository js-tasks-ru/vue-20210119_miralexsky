import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <div class="meetup-agenda__item" v-for="agendaItem in agenda" :key="agendaItem.id">
        <meetup-agenda-item :agendaItem="agendaItem"/>
      </div>
    </div>`,

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      required: true,
      type: Array
    }
  }
};
