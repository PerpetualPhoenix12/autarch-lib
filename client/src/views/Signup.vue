<template>
  <div>
	<v-snackbar v-model="snackbarError" :timeout="4000" color="error" top>
          <span>Error signing up. Contact lewisclarke603@gmail.com</span>
          <v-btn flat color="white" @click="snackbarError=false">Close</v-btn>
    </v-snackbar>

    <signupForm @signupSuccess="$emit('signup')" @signupError="snackbarError=true" />
  </div>
</template>

<script>
import signupForm from '../components/signupForm';

export default {
	name: 'signup',
	data() {
	  return {
	    snackbarError: false
	  }
	},
	components: {
	  signupForm
	}
};
</script>
