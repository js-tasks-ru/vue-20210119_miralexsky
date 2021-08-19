<template>
  <div>
    <form class="form" @submit.prevent="auth">
      <p>
        <input type="text" placeholder="login" name="login" v-model="login">
      </p>
      <p>
        <input type="text" placeholder="password" name="pass" v-model="pass">
      </p>
      <input type="submit" name="Submit">
    </form>
    <router-link to="/register">Зарегистрироваться</router-link>
  </div>
</template>

<script>
import { login as loginApi } from '../data';

export default {
  name: 'LoginPage',
  data() {
    return {
      login: '',
      pass: '',
    }
  },
  methods: {
    auth() {
      let validated = this.validate();

      if (validated.error) {
        alert(validated.message)
        return
      }

      let response = loginApi(this.login, this.pass);
      response.then((data) => {
        if (data.fullname) {
          alert(data.fullname);
        } else {
          alert('Неверные учетные данные');
        }
      })
    },

    validate() {
      let message = '';

      if (!this.login) {
        message = 'Требуется ввести Email'
      } else if (!this.pass) {
        message = 'Требуется ввести пароль'
      }

      return {
        error: !!message,
        message: message,
      }
    }
  }
};
</script>

<style scoped></style>
