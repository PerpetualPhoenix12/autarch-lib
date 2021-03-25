<template>
  <v-app>

    <v-snackbar v-model="snackbarLogin" :timeout="4000" color="success" top>
            <span>Successfully logged in</span>
            <v-btn flat color="white" @click="snackbarLogin=false">Close</v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbarLogout" :timeout="4000" color="error" top>
            <span>Goodbye, come again!</span>
            <v-btn flat color="white" @click="snackbarLogout=false">Close</v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbarSignup" :timeout="4000" color="success" top>
            <span>Successfully signed up!</span>
            <v-btn flat color="white" @click="snackbarSignup=false">Close</v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbarUpdate" :timeout="4000" color="success" top>
            <span>Successfully updated novel!</span>
            <v-btn flat color="white" @click="snackbarUpdate=false">Close</v-btn>
      </v-snackbar>
      
    <div v-if="!isMobile">
      <v-app>
        <Navbar v-if="!(['login', 'signup'].indexOf($route.name) > -1) && !isBottomNav" @logout="snackbarLogout=true" />
        <mobileNavbar v-if="!(['login', 'signup'].indexOf($route.name) > -1) && isBottomNav" @logout="snackbarLogout=true" />
        <v-content>
          <router-view @login="snackbarLogin=true" @signup="snackbarSignup=true" @novelUpdated="snackbarUpdate=true" />
        </v-content>
      </v-app>
      <v-footer class="justify-center" v-if="!isBottomNav" inset app>
        <strong>Autarch</strong>Library © - {{new Date().getFullYear()}} 
      </v-footer>
    </div>

    <div class="container" v-else>
      <!--<v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <h1>Hey mobile <span style="color:purple;">u</span>se<span style="color:purple;">r</span>!</h1>
            <v-img src='/mobile_construction.jpg' max-height="400" contain></v-img> <br />
            <h3>Bob is workin<span style="color:purple;">g</span> as h<span style="color:purple;">a</span>rd as he can to build the mobile website for <span style="color:purple;">y</span>ou all. <br/><br/><span style="color:red;">ETA: Soon™</span><br /> <br /> </h3>
          </v-flex>
        </v-layout>
      </v-container>-->

    <mobileNavbar v-if="!(['login', 'signup'].indexOf($route.name) > -1)" @logout="snackbarLogout=true" />
    <v-content>
        <router-view @login="snackbarLogin=true" @signup="snackbarSignup=true" @novelUpdated="snackbarUpdate=true" />
    </v-content>

    </div>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import Navbar from './components/Navbar'
import mobileNavbar from './components/mobile/Navbar'
import { db, auth } from '@/fb'

export default {
  data() {
    return {
      snackbarLogin: false,
      snackbarLogout: false,
      snackbarSignup: false,
      snackbarUpdate: false,
      isMobile: false,
      isBottomNav: false
    }
  },
  components: {
    Navbar,
    mobileNavbar
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 650;
      this.isBottomNav = window.innerHeight < 670;
      this.$store.commit('setMobile', this.isMobile);
      this.$store.commit('setBottomNav', this.isBottomNav);
    }
  },
  beforeDestroy() {
    if (typeof window !=='undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true })
  }, 
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(`User is logged in as ${user.email}`);
        this.$store.commit('clear');

        db.collection('users').doc(user.uid).collection('novels')
          .onSnapshot(res => {
          const changes = res.docChanges();
          changes.forEach(change => {
            if (change.type === 'added') {
              this.$store.commit('add', change);
            } else if (change.type === 'modified') {
              this.$store.commit('modify', change);
            }
          });
        }, () => console.log("Listener detached"))
        this.$store.commit('setUID', user.uid);

      } else {
        console.log("User is not logged in.")
      }
    });
  },
};
</script>

<style>



</style>
