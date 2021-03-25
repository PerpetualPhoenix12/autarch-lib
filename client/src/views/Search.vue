<template>
    <v-container fill-height>
        <v-flex class="mb-5">
            <v-layout justify-center align-center>
                <v-autocomplete
                v-model="select"
                :loading="loading"
                :items="items"
                :search-input.sync="searchTitle"
                flat
                label="Search for a novel..."
                solo-inverted
                ></v-autocomplete>
            </v-layout>
        </v-flex>
    </v-container>
</template>

<script>
const request = require('request');

export default {
    data() {
        return {
            searchTitle: null,
            loading: false,
            items: [],
            results: [],
            select: null
        }
    },
    watch: {
        searchTitle() {
            this.loading = true;
            console.log(this.searchTitle);
            const options = { 
                method: 'POST',
                url: window.location.origin + '/api/novel/search',
                body: {title: this.searchTitle},
                json: true
            };
            request(options, (error, response, body) => this.updateResults(body));
        }
    },
    methods: {
        updateResults(results) {
            this.loading = false;
            this.items = results;
        }
    }
}
</script>



