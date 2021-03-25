<template>
    <v-container fill-height>
        <v-flex  v-if="!isMobile">
            <v-layout justify-center align-center>
                <EditForm @novelUpdated="$emit('novelUpdated')" />
            </v-layout>
        </v-flex>
        <MobileEditForm @novelUpdated="$emit('novelUpdated')" v-else />
    </v-container>   
</template>

<script>
import EditForm from '../components/editForm';
import MobileEditForm from '../components/mobile/editForm';

export default {
    components: {
        EditForm,
        MobileEditForm
    },
    props: ['isMobile']
}
</script>



