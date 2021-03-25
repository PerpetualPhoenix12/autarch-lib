<template>
    <v-container fill-height>
        <v-layout align-center>
            <v-flex>
                <ImportList v-if="!isMobile" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ImportList from '../components/Import';

export default {   
    data() {
        return {
            isMobile: null
        }
    },
    components: {
        ImportList
    },
    mounted() {
    this.isMobile = this.$store.getters.isMobile;
    if (this.isMobile) {
        window.location.href = '/reading';
    }
	},
};
</script>

