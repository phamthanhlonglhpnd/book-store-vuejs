<template>
    <HeaderVue />
    <div class="search-result">
        Search Result
        <template v-for="book in books" :key="book.id">
            <BookCardVue :book="book" />
        </template>
    </div>
    <FooterVue />
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue"
import BookCardVue from "../BookCard/BookCard.vue"
import HeaderVue from "../Header/Header.vue"
import FooterVue from "../Footer/Footer.vue"
import { searchBooksAPI } from "../../../api/apiServices";

export default {
    components: {
        ButtonVue,
        BookCardVue,
        HeaderVue,
        FooterVue
    },
    data() {
        return {
            books: []
        }
    },
    async created() {
        try {
            let response = await searchBooksAPI(this.$route.params.keyword)
            if (response.errCode === 0) {
                this.books = response.hits.hits
            } else {
                this.books = [];
            }
        } catch (e) {
            alert(e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'SearchResult.scss'
</style>