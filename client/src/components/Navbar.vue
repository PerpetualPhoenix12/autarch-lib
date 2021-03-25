<template>
  <nav>
    
    <v-snackbar v-model="snackbar" :timeout="4000" color="success" top>
        <span>New novel successfully added.</span>
        <v-btn flat color="white" @click="snackbar=false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app color="white">
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Autarch</span>
        <span>Library</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      
      <Popup @novelAdded="snackbar=true" />
      <v-btn @click="logout" flat>
        <span>Leave</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer  
    app stateless v-model="drawer" 
    class="sidebar" 
    mini-variant
    width="200">

    <!-- Removing the class="" breaks the nav drawer design... keep it, and God bless -->

      <v-toolbar flat class="white text-xs-center">
        <v-list>
            <v-btn icon class="no-hover" :ripple="false" @click="toggle" style="display:none;">
              <div id="nav-icon1">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </v-btn>
        </v-list>
      </v-toolbar>
      <v-flex class="mt-5">
          <v-list>
            <v-list-tile v-for="link in topLinks" :key="link.name" router :to="link.path" class="mb-3">
              <v-list-tile-action>
                <v-layout column justify-center align-center>
                  <v-icon class="black--text">{{ link.icon }}</v-icon>
                  <span class="link-subtitle">{{ link.name }}</span>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
        </v-list>
      </v-flex>
      <v-layout style="height: calc(100% - 25em);" class="column justify-center">
        <v-list>
          <v-list-tile v-for="link in mainLinks" :key="link.name" router :to="link.path" class="mb-3">
            <v-list-tile-action>
              <v-layout column justify-center align-center>
                <v-icon class="black--text">{{ link.icon }}</v-icon>
                <span class="link-subtitle">{{ link.name }}</span>
              </v-layout>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-layout>
      <v-flex>
          <v-list>
            <v-list-tile router to="/import">
              <v-list-tile-action>
                <v-layout column justify-center align-center>
                  <v-icon class="black--text">label_important</v-icon>
                  <span class="pt-1 link-subtitle">Import</span>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
        </v-list>
      </v-flex>
    </v-navigation-drawer>
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
      topLinks: [
        {name: 'Dashboard', path: '/all', icon: 'home'},
        //{name: 'Autarchs', path: '/autarchs', icon: 'group'}
      ],
      mainLinks: [
        {name: 'Reading', path: '/reading', icon: 'done'},
        {name: 'Paused', path: '/paused', icon: 'help_outline'},
        {name: 'Dropped', path: '/dropped', icon: 'error_outline'},
        {name: 'Planned', path: '/planned', icon: 'schedule'},
        {name: 'Completed', path: '/completed', icon: 'grade'},
      ],
      drawer: true,
      mini: true,
      snackbar: false
    }
  },
  methods: {
    toggle() {
      this.mini = !this.mini;
      const ele = document.getElementById('nav-icon1');
      ele.classList.toggle('open');
    },
    logout() {
      auth.signOut()
      .then(() => {
        this.$emit('logout');
      })

    }
  }
};
</script>

<style>

.link-subtitle {
  font-size: 10px !important;
}

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

.v-list__tile--active > * {
  color: white !important;
}

.no-hover:before {
  background-color: white !important;
}

#nav-icon1 {
  width: 15px;
  height: 20px;
  transform: rotate(0deg);
  transition: .15s ease-in-out;
  margin-top: 30%;
}

#nav-icon1 span {
  position: absolute;
  height: 1px;
  width: 100%;
  background: black;
  border-radius: 10px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .4s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
  top: 0px;
}

#nav-icon1 span:nth-child(2) {
  top: 6px;
}

#nav-icon1 span:nth-child(3) {
  top: 12px;
}

#nav-icon1.open span:nth-child(1) {
  top: 6px;
  transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
  opacity: 0;
/*  left: -30px; */
}

#nav-icon1.open span:nth-child(3) {
  top: 6px;
  transform: rotate(-135deg);
}

@media only screen and (max-width: 1500px) {
  .sidebar .v-icon {
    font-size: 22px !important;
  }
  .sidebar .v-list__tile__title  {
    font-size: 14px !important;
  }
}

</style>