<template>

    <div class="book-card">
        <router-link :to="`/book/${result._source.name}/${result._source.id}`" class="book-card-top">
            <img :src="result._source.image ? result._source.image : logo" alt class="book-card-image" />
        </router-link>
        <div class="book-card-content">
            <div class="book-card-name">{{ result._source.name }}</div>
            <div class="book-card-content-bottom">

                <h4 class="book-card-price">Price: ${{ result._source.price }}</h4>
                <div class="book-card-page">Page: {{ result._source.page }}</div>
            </div>
        </div>
        <div class="book-card-bottom">
            <ButtonVue text="Add to card" backgroundColor="#de2454" />
        </div>
    </div>

</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue";
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
    props: ['result'],
}   
</script>

<style lang="scss" scoped>
@import "BookCard.scss";
</style>