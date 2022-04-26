<template>
    <HeaderVue />
    <!-- <BackgroundVue /> -->
    <div class="type">
        <div class="type-content">
            <div class="type-name">{{ $route.params.name }}</div>
            <div class="type-list">
                <template v-for="book in books" :key="book.id">
                    <BookCardVue :book="book" />
                </template>
            </div>
        </div>
    </div>
    <FooterVue />
</template>

<script>
import ButtonVue from "../../../customs/Button/Button.vue";
import HeaderVue from "../Header/Header.vue";
import FooterVue from "../Footer/Footer.vue";
import BackgroundVue from "../Background/Background.vue";
import BookCardVue from "../BookCard/BookCard.vue";
import { getBookByTypeAPI } from '@/api/apiServices';
export default {
    components: {
        ButtonVue,
        HeaderVue,
        FooterVue,
        BackgroundVue,
        BookCardVue,

    },
    data() {
        return {
            books: [],
        }
    },
    async created() {
        try {
            let response = await getBookByTypeAPI(this.$route.params.id);
            if (response.errCode === 0) {
                this.books = response.books
            } else {
                this.books = [];
            }
        } catch (e) {
            alert(e);
        }
    },
}
</script>

<style lang="scss" scoped>
@import "Type.scss";
</style>