<template>
    <div>
        <CardList @novelUpdated="$emit('novelUpdated')" v-if="!isMobile" />
        <MobileCardList @novelUpdated="$emit('novelUpdated')" v-else />
    </div>
</template>

<script>
import CardList from '../components/CardList.vue'
import MobileCardList from '../components/mobile/CardList.vue'

export default {
    data() {
        return {
            isMobile: this.$store.getters.isMobile
        }
    },
    components: {
        'CardList': CardList,
        'MobileCardList': MobileCardList
    },
};
</script>

