<template>
  <nav app>
    
    <v-snackbar v-model="snackbar" :timeout="4000" color="success" top>
        <span>New novel successfully added.</span>
        <v-btn flat color="white" @click="snackbar=false">Close</v-btn>
    </v-snackbar>

    <v-toolbar :flat="scrolledDown" app color="white">
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Autarch</span>
        <span>Library</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      
      <Popup @novelAdded="snackbar=true" />
      <v-btn @click="logout" flat>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>


    <v-bottom-nav fixed :value="e3" app>
        <v-btn flat v-for="item in bottomNavItems" :key="item.name" router :to="item.path" :ripple="false">
          <span>{{ item.name }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
    </v-bottom-nav>


  </nav>
</template>

<script>
import Popup from './popupAdd.vue'
import { auth } from '@/fb'

export default {
  components: {
    'Popup': Popup
  },
  data () {
    return {
      snackbar: false,
      scrolledDown: false,
      e3: true,
      bottomNavItems: [
        {name: 'Reading', path: '/reading', icon: 'done'},
        {name: 'Paused', path: '/paused', icon: 'help_outline'},
        {name: 'Dropped', path: '/dropped', icon: 'error_outline'},
        {name: 'Planned', path: '/planned', icon: 'schedule'},
        {name: 'Completed', path: '/completed', icon: 'grade'},
      ],
      bottomNav: 3
    }
  },
  methods: {
    logout() {
      auth.signOut()
      .then(() => {
        this.$emit('logout');
      })
    },
    handleScroll() {
        this.scrolledDown = window.pageYOffset ? false : true
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.scrolledDown = false;
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style>

.v-list__tile:hover {
  background-color: rgb(36, 31, 31, 0.3) !important;
}

.v-list__tile--active {
  background-color: rgb(31, 28, 28);
}

.v-list__tile--active:hover {
  background-color: rgb(31, 28, 28) !important;
}

.v-list__tile--active i, .v-list__tile--active .v-list__tile__title {
  color: white !important;
}

.no-hover:before {
  background-color: white !important;
}

#nav-icon1 span {
  position: absolute;
  width: 100%;
  background: black;
  border-radius: 10px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .4s ease-in-out;
}
</style>