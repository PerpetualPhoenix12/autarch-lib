<template>
    <v-app>
        <v-layout align-center justify-center class="mb-5">
            <v-flex xs10 md8 lg6>
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Signup form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email" :rules="rules.email"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="rules.password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat small router to="/login" :ripple="false">Already have an account?</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :loading="loading" :disabled=!valid @click="signup()">Signup</v-btn>
                    
                </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import { auth, db } from '@/fb'

export default {
	data() {
		return {
            loading: false,
			email: '',
            password: '',
            valid: false,
            rules: {
                email: [
                    v => !!v || 'Email required',
                    v => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'Must be a valid email'
                ],
                password: [
                    v => !!v || 'Password required',
                    v => v.length > 8 || 'Password must be longer than 8 characters'
                ]
            }
		}
	},
	methods: {
        signup() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                auth.createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    //const user = auth.currentUser;
                    //user.sendEmailVerification();
                    //auth.signOut();
                    this.$emit('signupSuccess');
                })
                .catch(err => {
                    this.clear();
                    this.$emit('signupError');
                })
                this.loading = false;
                
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    },
};

</script>