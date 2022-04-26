<template>
    <input type="text" v-model="keyword" class="input" placeholder="Search books, author, ISBNs" />
    <i @click="gotoSearchResult" class="fas fa-search input-icon"></i>
</template>

<script>
export default {
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        gotoSearchResult() {
            this.$router.push(`/search/keyword=${this.keyword}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "Search.scss";
</style>