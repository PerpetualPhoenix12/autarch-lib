<!-- 
 Page to test Vuetify+VueJS functionality.
 TODO: Create a better Autarchs page?
-->

<template>
    <div>
        <h1 class="subheading grey--text">Autarchs</h1>

    <v-container fluid class="my-4">
      
      <v-layout row wrap justify-space-around>
        <v-flex xs12 sm6 md4 lg3 v-for="autarch in autarchs" :key="autarch.name">
          <v-card flat class="text-xs-center ma-4 rounded">
            <v-responsive class="pt-4">
              <v-avatar size="130" class="grey lighten-2">
                <v-img :src="autarch.avatar" aspect-ratio="1" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ autarch.name }}</div>
              <div :class="`${autarch.color}--text font-weight-bold`">{{ autarch.role }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container> 
    </div>    
</template>

<script>
export default {
    data() {
        return {
            autarchs: [
                { name: 'Perpetual Phoenix', role: 'Autarch of Procrastination', color: 'text--accent-4 deep-purple', avatar: '/avatars/phoenix.jpg' },
                { name: 'Neverfire7', role: 'Autarch of Lords', color: 'text--darken-4 blue', avatar: '/avatars/neverfire.jpg' },
                { name: 'Billdoor', role: 'Autarch of Jingshi', color: 'text--darken-4 teal', avatar: '/avatars/billdoor.jpg' },
                { name: 'Millman97', role: 'Autarch of Real Newz', color: 'text--accent-4 red', avatar: '/avatars/millman.jpg' },
                { name: 'Tugster', role: 'Autarch of Autarchs', color: 'orange', avatar: '/avatars/tugster.jpg' },
                { name: 'Saint', role: 'Autarch of Cuteness', color: 'light-blue', avatar: '/avatars/saint.jpg' },
                { name: 'Miya', role: 'Autarch of Dreams', color: 'text--accent-4 yellow', avatar: '/avatars/miya.jpg' },
                { name: 'Prawnxia', role: 'Autarch of Joseph', color: 'text--lighten-1 teal', avatar: '/avatars/prawnxia.jpg' },
                { name: 'Litarius', role: 'Autarch of Tatsuya', color: 'text--lighten-1 deep-purple', avatar: '/avatars/litarius.jpg' },
                { name: 'Chrissy', role: 'Autarch of Wizardry', color: 'text--lighten-1 cyan', avatar: '/avatars/chrissy.jpg' },
                { name: 'Lonelytree', role: 'Autarch of Natural Slavery', color: 'text--accent-4 green', avatar: '/avatars/lonelytree.jpg' },
            ]
        }
    }
};
</script>

<style scoped>

.quote {
  display: inline-block;
  width: 80%;
  font-family: 'Raleway';
}

.rounded {
  border-radius: 80px;
}

</style>


