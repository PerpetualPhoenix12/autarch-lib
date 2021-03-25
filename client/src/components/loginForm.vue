<template>
        <!--<v-layout align-center justify-center class="mb-5">
            <v-flex xs10 md8 lg6>
                <v-card flat class="transparent">
                    <v-toolbar flat class="transparent">
                        <v-toolbar-title>
                            Autarch Library
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email" class="white--text" :rules="rules.email"></v-text-field>
                        <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" class="white--text" :rules="rules.password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat small :ripple="false" disabled>Don't have an account?</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn flat :disabled=!valid :loading="loading" @click="login()">Enter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout> -->

    <v-app>
        <v-layout align-center justify-center class="mb-5">
            <v-flex xs10 md8 lg6>
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email" :rules="rules.email"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="rules.password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat small router to="/signup" :ripple="false">Don't have an account?</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :loading="loading" :disabled=!valid @click="login()">Login</v-btn>
                    
                </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-app>

</template>

<script>
import { auth } from '@/fb'

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
                    //v => v.length > 8 || 'Password must be longer than 8 characters'
                ]
            }
		}
	},
	methods: {
        login() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                auth.signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.$emit('loginSuccess');
                    this.loading = false;
                })
                .catch(error => {
                    this.$emit('loginFail', error.message)
                    this.loading = false;
                })

            }
        },
        clear() {
            this.$refs.form.reset();
        }
    }
};

</script>

