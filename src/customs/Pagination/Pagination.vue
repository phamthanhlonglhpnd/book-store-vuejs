<template>
    <div class="page">
        <div class="page-content">
            <button class="page-previous" @click="previous" :disabled="currentPage <= 1">Previous</button>
            <button
                v-for="(item, index) in totalPage"
                :key="item"
                :class="currentPage === index + 1 ? 'page-item page-active' : 'page-item'"
                @click="setCurrent"
            >{{ index + 1 }}</button>
            <button class="page-next" @click="next" :disabled="currentPage >= totalPage">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['currentPage', 'totalPage', 'previousPage', 'nextPage', 'setCurrentPage'],
    methods: {
        previous() {
            this.previousPage();
        },
        next() {
            this.nextPage();
        },
        setCurrent() {
            this.setCurrentPage();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "Pagination.scss";
</style>