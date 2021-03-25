<template>
	<v-layout row class="card">
        <v-flex>
                <a :href="`https://www.novelupdates.com/series/${formatLink(novel.title)}`" target="_blank"><v-img :src="novel.coverUrl" width="140px" height="190px" class="rounded">
                    <v-layout column fill-height class="white--text">
                        <div class="fill-height grad"></div>
                     <!--   
                            <v-flex shrink style="background-color: rgba(53, 49, 49, 0.9);" class="pa-1">
                            <a :href="`https://www.novelupdates.com/nauthor/${formatLink(novel.author)}`" target="_blank">
                                <div class="caption orange--text darken-4 font-weight-medium font-italic">{{ novel.author }}</div>
                            </a>
                        </v-flex> 
                      -->
                    </v-layout>
                </v-img></a>
        </v-flex>
        <v-card-text class="text">
            <div class="subheading font-weight-bold">
                <span v-if="novel.title.length > 53"> {{ novel.title.slice(0, 50) }}... </span>
                <span v-else> {{ novel.title }} </span>
                </div>
            <p color="grey" class="subheading pt-4">
            <b>Your progress:</b> <br />
            <span v-if="novel.chapters > 0 || (typeof novel.chapters == 'string' && novel.chapters != 'Planned' && !novel.chapters.includes('completion'))"> Chapter </span> <span v-if="novel.chapters > 0 || typeof novel.chapters == 'string'">{{ novel.chapters }} <br /></span> 
            <span v-if="novel.volumes > 0">Volume {{novel.volumes}}</span>
            </p>
        </v-card-text>
        <v-btn flat icon router :to="'/edit/'+novel.id" class="spin">
            <v-icon >edit</v-icon>
        </v-btn>
    </v-layout>
</template>

<script>

export default {
    props: ['novel'],
    methods: {
        formatLink: title => title.replace("’", "").split(" ").join("-")
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Overpass&display=swap');

.card {
    font-family: 'Overpass';
}

.grad {
    opacity: 0;
    background-image: linear-gradient(to top right, rgba(100,115,201,.33), rgba(25,32,72,.7));
    transition: opacity 0.3s ease-out;
}

.grad:hover {
    opacity: 0.3;
}

.no-hover:before {
  background-color: white !important;
}

.spin {
	transition: transform .5s; 
}

.spin:hover {
	transform: rotate(360deg) scale(1.1);
}

</style>


