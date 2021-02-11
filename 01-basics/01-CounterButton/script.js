import Vue from './vue.esm.browser.js';

const app = new Vue({
    template: '#vue-counter',
    el: '#vue-counter',
    data() {
        return {
            counter: 0,
        }
    },
})
