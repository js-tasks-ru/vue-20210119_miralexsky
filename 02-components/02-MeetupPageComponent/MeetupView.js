import { getMeetupCoverLink } from './data.js';
import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <component-slot>
        <template #[pers1]="{ dialogue }"><div>{{ dialogue }}</div></template>
        <template #[pers2]="slot">{{ slot.dialogue }}</template>
      </component-slot>
      <component-single-slot #default="{ dialogue, otherDi }">
        <div>{{ dialogue + ' ' + otherDi }}</div>
      </component-single-slot>
      <meetup-cover :link="coverLink" :title="meetup.title"/>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="meetup.description"/>

            <h3>Программа</h3>
            <meetup-agenda :agenda="meetup.agenda"/>
          </div>
          <div class="meetup__aside">
            <meetup-info :date="new Date(meetup.date)" :place="meetup.place" :organizer="meetup.organizer"/>
          </div>
        </div>
      </div>
    </div>`,

  components: {
    componentSlot: {
      template: `<div>Garry: <slot name="garry" :dialogue="garryDialogue">Somthing magical here</slot> Ron: <slot name="ron" :dialogue="ronDialogue">Yes, you are right</slot></div>`,
      props: {

      },
      data() {
        return {
          ronDialogue: 'I\'m redhead!!',
          garryDialogue: 'You are redhead',
        }
      },
    },
    componentSingleSlot: {
      template: `<div>Ron: <slot dialogue="I'm single!!!" otherDi="Fuck you Garry">Give me my rat!!</slot></div>`,
    },
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  data() {
    return {
      pers1: 'garry',
      pers2: 'ron',
    }
  },

  props: {
    meetup: {
      required: true,
      type: Object
    }
  },

  computed: {
    coverLink() {
      return getMeetupCoverLink(this.meetup)
    },
  }
};
