<template>
    <HeaderVue />

    <div class="result">
        <div class="result-content">
            <div class="result-name">Search for "{{ this.$route.params.keyword }}"</div>
            <div class="result-option">
                <template v-for="(query, index) in queries" :key="index">
                    <div :class="query.isActive === true ? 'result-item result-active' : 'result-item'"
                        @click="toggleSearch(query)">{{ query.query }}</div>
                </template>
            </div>
            <div class="result-list">
                <template v-for="result in results" :key="result.id">
                    <BookCardResultVue v-if="results.length > 0" :result="result" />
                    <div v-else>No results for "{{ this.$route.params.keyword }}"</div>
                </template>
            </div>
        </div>
    </div>
    <FooterVue />
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue"
import BookCardResultVue from "../BookCard/BookCardResult.vue";
import HeaderVue from "../Header/Header.vue"
import FooterVue from "../Footer/Footer.vue"
import { searchAuthorsAPI, searchBooksAPI } from "../../../api/apiServices";

export default {
    components: {
        ButtonVue,
        BookCardResultVue,
        HeaderVue,
        FooterVue
    },
    data() {
        return {
            results: [],
            queries: [
                {
                    id: 1,
                    isActive: false,
                    query: "Authors"
                },
                {
                    id: 2,
                    isActive: true,
                    query: "Books"
                }
            ]
        }
    },
    async created() {
        try {
            let response = await searchBooksAPI(this.$route.params.keyword);
            if (response.errCode === 0) {
                this.results = response.response.hits.hits;
            } else {
                this.results = [];
            }
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        async toggleSearch(query) {
            let newQueries = this.queries.map(queryItem => {
                if (queryItem.id === query.id) {
                    queryItem.isActive = true;
                } else {
                    queryItem.isActive = false;
                }
                return queryItem;
            });
            this.queries = newQueries;
            try {
                let authors = await searchAuthorsAPI(this.$route.params.keyword);
                let books = await searchBooksAPI(this.$route.params.keyword);
                if (query.query === "Authors") {
                    this.results = authors.response.hits.hits;
                }
                if (query.query === "Books") {
                    this.results = books.response.hits.hits;
                }
            } catch (e) {
                alert(e);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'SearchResult.scss'
</style>