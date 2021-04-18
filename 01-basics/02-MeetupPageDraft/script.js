import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api/';
const apiUrls = {
  meetups: API_URL + 'meetups',
  meetup:  API_URL + 'meetups/',
  images:  API_URL + 'images/',
}
/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 1;  

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  if (imageId == null) return {}
  return apiUrls.images + imageId;
}

/**
 * Функция, возвращающая словарь заголовков по умолчанию для всех типов пунктов программы
 */
const getAgendaItemDefaultTitles = () => ({
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
});

/**
 * Функция, возвращая словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const getAgendaItemIcons = () => ({
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
});

export const app = new Vue({
  template: '#app',
  el: '#app',

  data() {
    return {
      meetupData: null,
    };
  },

  mounted() {
    this.loadMeetup()
  },

  computed: {

    isAgendaEmpty() {
      return this.meetupComputed.agenda.length == 0
    },

    meetupComputed() {
      if (!this.meetupData) return null
    
      return {
        ...this.meetupData,
        imageBGUrl: this.meetupData.imageId ? 
          this.getBGImage(getImageUrlByImageId(this.meetupData.imageId)) : {},
        date: this.localeDate(this.meetupData.date),
        agenda: this.meetupData.agenda.map((agendaItem) => {
          return {
            ...agendaItem,
            duration: this.agendaTime(agendaItem),
            icon: this.getAgendaIcon(agendaItem),
            defaultTitle: this.getDefaultTitle(agendaItem),
          }
        })
      }
    }
  },

  methods: {
    loadMeetup() {
      fetch(apiUrls.meetup + MEETUP_ID)
      .then(response => response.json()).then(responseObj => { this.meetupData = responseObj })   
    },

    getBGImage(url) {
      return {
        '--bg-url': 'url(' + url + ')' 
      }
    },

    agendaTime(agenda) {
      let {startsAt, endsAt} = agenda
      return `${startsAt} - ${endsAt}`;
    },

    localeDate(date) {
      return (new Date(date)).toLocaleDateString()
    },

    getAgendaIcon(agendaItem) {
      return getAgendaItemIcons()[agendaItem.type]
    },

    getDefaultTitle(agendaItem) {
      return getAgendaItemDefaultTitles()[agendaItem.type]
    }
  },
});
