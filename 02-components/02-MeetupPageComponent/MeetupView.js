import { getMeetupCoverLink } from './data.js';
import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
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
            <meetup-info :date="meetup.date" :place="meetup.place" :organizer="meetup.organizer"/>
          </div>
        </div>
      </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
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
    }
  }
};
