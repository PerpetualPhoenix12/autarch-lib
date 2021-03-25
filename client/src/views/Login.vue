<template>
  <v-app>

    <v-snackbar v-model="snackbarFail" :timeout="4000" color="error" top>
          <span>{{ msg }}</span>
          <v-btn flat color="white" @click="snackbarFail=false">Close</v-btn>
    </v-snackbar>
    <loginForm @loginFail="snackbarFail=true; msg=$event" @loginSuccess="$emit('login')" />

  </v-app>
    
    
</template>

<script>
import loginForm from '../components/loginForm';

export default {
	name: 'login',
	data() {
	  return {
	    snackbarFail: false,
      snackbarSuccess: false,
      msg: '',
	  }
	},
	components: {
	  loginForm
  },
};
</script>