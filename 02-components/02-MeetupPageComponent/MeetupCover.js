export const MeetupCover = {
  template: `<div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{ title }} </h1>
    </div>`,

  props: {
    'link': String, 
    'title': String
  },

  computed: {
    coverStyle() {
      return {
        '--bg-url': this.link ? `url(${this.link})` : ''
      }
    }
  }
};
