<template>
    <div class="book-card">
        <div class="book-card-top">
            <img
                :src="this.book.image?.data?.length > 0 ? getImage : logo"
                alt
                class="book-card-image"
            />
        </div>
        <div class="book-card-bottom">
            <div class="book-card-name">{{ book.name }}</div>
            <div class="book-card-price">${{ book.price }}</div>
            <div class="book-card-page">{{ book.page }}</div>
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