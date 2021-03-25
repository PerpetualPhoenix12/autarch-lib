<template>
    <v-container fluid>
        <h1 class="black--text text-xs-center mb-4">{{ upperStatus }} Novels ({{ filteredNovels.length }})</h1>
        <v-tabs fixed-tabs slider-color="black" color="#fafafa" v-model="model">
            <v-tab v-for="type in types" :key="type.abb" :ripple="false">
                {{ type.full }}
            </v-tab>
        </v-tabs>

         <v-layout justify-center class="mt-3">
            <v-flex xs8 md6 lg4>
                <v-text-field label="Search novel..." color="black" append-icon="search" v-model="search" single-line></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
                <v-pagination
                v-model="pagination.page"
                :length="pagination.length"
                :total-visible="pagination.visible"
                color="black"
                ></v-pagination>
        </v-layout>
        <div class="text-xs-center mt-5">
            <div v-if="filteredNovels.length == 0 && !search">
                <span style="font-size:2.75em;font-weight:bold;font-style:italic;">It's looking a little empty...</span><br /><br />
                <span style="" class="headline">Add a novel or import from an existing NovelUpdates list</span>
            </div>
            <div style="font-size:2.75em;font-weight:bold;font-style:italic;" v-if="filterSearch.length == 0 && search">
                No results match your search
            </div>
        </div>

        <v-layout row wrap>
            <v-flex xs12 md6 lg4 v-for="novel in paginatedList" :key="novel.id">
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 3 : 0}`" class="text-xs-center ma-4 rounded">
                        <novelCard :novel="novel" @novelUpdated="$emit('novelUpdated');" />
                    </v-card>
                </v-hover>
            </v-flex>
        </v-layout>
    </v-container> 
</template>

<script>
import novelCard from './Card.vue'

export default {                    
    data() {
        return {
            model: 0,
            search: '',
            types: [{abb:'CN', full:'Chinese'}, {abb:'KR', full:'Korean'}, {abb:'JP', full:'Japanese'}],
            status: '',
            colors: {
                reading: 'rgb(33,150,243, 0.15)',
                paused: 'rgb(255,235,59, 0.15)',
                completed: 'rgb(76,175,80, 0.15)',
                dropped: 'rgb(244,67,54, 0.15)',
                planned: 'rgb(156,39,176, 0.15)'
            },
            pagination: {
                page: 1,
                length: 0,
                visible: 9
            }
        }
    },
    components: {
        'novelCard': novelCard
    },
    computed: {
        filteredNovels() {
            return this.$store.getters.filterList(this.status).filter(novel => novel.type.match(this.types[this.model].abb));
        },
        upperStatus() {
            return this.status.charAt(0).toUpperCase() + this.status.slice(1);
        },
        paginatedList() {
            return !this.search ? this.filteredNovels.slice((this.pagination.page-1)*6, ((this.pagination.page-1)*6)+6) : this.filterSearch.slice((this.pagination.page-1)*6, ((this.pagination.page-1)*6)+6);
        },
        filterSearch() {
            return this.filteredNovels.filter(novel => novel.title.toLowerCase().match(this.search.toLowerCase()));
        }
    },
    methods: {
        updatePaginationLength(watcher) {
            let paginationLength;
            if (!this.search) {                                                                     // HANDLE DEFAULT FILTERED PAGINATION 
                if (this.filteredNovels.length % 6 == 0 && this.filteredNovels.length != 0) {
                    paginationLength = this.filteredNovels.length / 6
                } else {
                    paginationLength = Math.floor(this.filteredNovels.length / 6) + 1 
                }
            } else {                                                                               // HANDLE SEARCH-FILTERED PAGINATION
                if (watcher == 'search') {
                    if (this.filterSearch.length % 6 == 0) {
                        paginationLength = this.filterSearch.length / 6;
                    } else {
                        paginationLength = Math.floor(this.filterSearch.length / 6) + 1
                    }
                } else {
                    paginationLength = this.pagination.length;
                }
            }
            this.pagination.length = paginationLength;
        }
    },
    watch: {
        '$route' () {
            this.status = this.$route.params.status.toLowerCase();
            this.pagination.page = 1;
            this.updatePaginationLength();
            this.search = '';
        },
        'model' () {
            this.search = '';
            this.updatePaginationLength();
            this.pagination.page = 1;
        },
        'search' () {
            this.updatePaginationLength('search');
            this.pagination.page = this.pagination.page > this.pagination.length ? 1 : this.pagination.page
        }
    },
    created() {
        this.status = this.$route.params.status.toLowerCase();
        this.updatePaginationLength();
    },
    updated() {
        this.updatePaginationLength();
    }
};
</script>

<style>
.rounded {
    border-radius: 5px;
}

.v-tabs__item--active {
    font-weight: bold;
}


</style>
