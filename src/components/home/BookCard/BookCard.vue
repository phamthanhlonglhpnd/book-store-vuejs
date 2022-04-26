<template>
    <div class="book-card">
        <router-link :to="`/book/${book.name}/${book.id}`" class="book-card-top">
            <img
                :src="this.book.image?.data?.length > 0 ? getImage : logo"
                alt
                class="book-card-image"
            />
        </router-link>
        <div class="book-card-content">
            <div class="book-card-name">{{ book.name }}</div>
            <div class="book-card-content-bottom">
                <div v-for="author in book.Book_Authors" :key="author.id" class="book-card-author">
                    <span>{{ author.Author.name }}</span>
                </div>
                <h4 class="book-card-price">Price: ${{ book.price }}</h4>
                <div class="book-card-page">Page: {{ book.page }}</div>
            </div>
        </div>
        <div class="book-card-bottom">
            <ButtonVue text="Add to card" backgroundColor="#de2454" />
        </div>
    </div>
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue";
import { convertToImage } from "@/utils/globalFunction";
import logo from '../../../assets/images/logo.jpg';
export default {
    components: {
        ButtonVue,

    },
    data() {
        return {
            logo
        }
    },
    props: ['book'],
    computed: {
        getImage() {
            return convertToImage(this.book.image);
        }
    }
}   
</script>

<style lang="scss" scoped>
@import "BookCard.scss";
</style>