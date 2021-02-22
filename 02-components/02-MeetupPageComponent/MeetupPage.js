import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup, getMeetupCoverLink } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<MeetupView v-if="meetup" :meetup="meetup"/>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: null,
    }
  },

  mounted() {
    this.getMeetup();
  },

  methods: {
    getMeetup() {
      fetchMeetup(MEETUP_ID).then((meetup) => {
        meetup.link = getMeetupCoverLink(meetup);
        meetup.date = new Date(meetup.date)
        this.meetup = meetup;
      });
    }
  },
};
