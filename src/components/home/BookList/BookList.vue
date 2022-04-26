<template>
    <div v-if="books.length > 3" class="book-list">
        <div class="book-list-content">
            <div class="book-list-top">
                <div class="book-list-left">
                    <img :src="logo" alt="logo" class="book-list-logo" />
                    <div class="book-list-name">{{ this.name }}</div>
                </div>
                <router-link :to="`/type/${name}/${type}`">
                    <ButtonVue
                        :text="`View List (${books.length} books)`"
                        backgroundColor="#DE2454"
                    />
                </router-link>
            </div>
            <swiper
                :slidesPerView="4"
                :spaceBetween="30"
                :slidesPerGroup="3"
                :loop="false"
                :loopFillGroupWithBlank="true"
                :pagination="{
                    clickable: true,
                }"
                :navigation="true"
                :modules="modules"
                class="mySwiper"
            >
                <swiper-slide v-for="book in books" :key="book.id">
                    <router-link :to="`/book/${book.name}/${book.id}`">
                        <BookItemVue :image="book.image" :id="book.id" :name="book.name" />
                    </router-link>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <div v-else />
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import BookItemVue from "../BookItem/BookItem.vue";
import ButtonVue from "@/customs/Button/Button.vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { getBookByTypeAPI } from "@/api/apiServices";
import logo from '../../../assets/images/logo.jpg';

export default {
    components: {
        Swiper,
        SwiperSlide,
        BookItemVue,
        ButtonVue,

    },
    props: ['type', 'name'],
    data() {
        return {
            modules: [Pagination, Navigation],
            books: [],
            logo,

        };
    },
    async created() {
        try {
            let response = await getBookByTypeAPI(this.type)
            if (response.errCode === 0) {
                this.books = response.books;
            } else {
                this.books = [];
            }
        } catch (e) {
            this.books = [];
            alert(e);
        }

    }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/base";
@import "BookList.scss";
</style>