<template>
  <div>
    <form class="form" @submit.prevent="register">
      <p>
        <input type="text" placeholder="login" name="login" v-model="login">
      </p>
      <p>
        <input type="text" placeholder="full name" name="full_name" v-model="fullName">
      </p>
      <p>
        <input type="text" placeholder="password" name="pass" v-model="pass">
      </p>
      <p>
        <input type="text" placeholder="password again" name="pass-repeat" v-model="passRepeat">
      </p>
      <p>
        <label>
          <input type="checkbox" v-model="isAgree"/> Я согласен со всем, только дайте мне войти!
        </label>
      </p>
      <input type="submit" name="Submit">
    </form>
    <router-link to="/login">Войти</router-link>
  </div>
</template>

<script>
import { register as registerApi } from '../data';

export default {
  name: 'RegisterPage',
  data() {
    return {
      login: '',
      fullName: '',
      pass: '',
      passRepeat: '',
      isAgree: false,
    }
  },
  methods: {
    register() {
      let validated = this.validate();

      if (validated.error) {
        alert(validated.message)
        return
      }

      let response = registerApi(this.login, this.fullName, this.pass);
      response.then((data) => {
        if (data.id) {
          alert(data.id);
        } else {
          alert(data.message);
        }
      })
    },

    validate() {
      let message = '';

      if (!this.login) {
        message = 'Требуется ввести Email'
      } else if (!this.fullName) {
        message = 'Требуется ввести полное имя'
      } else if (!this.pass) {
        message = 'Требуется ввести пароль'
      } else if (this.pass !== this.passRepeat) {
        message = 'Пароли не совпадают'
      } else if (!this.isAgree) {
        message = 'Требуется согласиться с условиями'
      }

      return {
        error: !!message,
        message: message,
      }
    },
  },
};
</script>

<style scoped></style>
