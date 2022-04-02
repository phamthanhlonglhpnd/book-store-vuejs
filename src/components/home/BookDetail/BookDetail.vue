<template>
    <HeaderVue />
    <div class="book">
        <div class="book-content">
            <div class="book-top">
                <img :src="getImage" alt class="book-top-left" />
                <div class="book-top-right">
                    <span class="book-name">{{ book.name }}</span>
                    <div class="book-author">
                        <span>
                            <i>Author:</i>
                        </span>
                        <span v-for="author in book.Book_Authors" :key="author.id">
                            <router-link
                                :to="`/author/${author.Author.id}`"
                                class="book-authorName"
                            >{{ author.Author.name }}</router-link>
                        </span>
                    </div>
                    <div class="book-state">
                        <div v-if="book.count > 0" class="book-available">
                            <i class="fas fa-check-circle"></i>
                            <span>Available</span>
                        </div>
                        <div v-else class="book-unavailable">
                            <i class="fas fa-check-circle"></i>
                            <span>Unavailable</span>
                        </div>
                    </div>
                    <div class="book-button">
                        <ButtonVue text="Add to cart" backgroundColor="#de2454" />
                        <ButtonVue text="Add to wishlist" backgroundColor="#7D67B8" />
                    </div>
                    <div class="book-detail">
                        <div class="book-detail-title">Product Details</div>
                        <div class="book-item">
                            <span class="book-item-title">Price:</span>
                            <span>${{ book.price }}</span>
                        </div>
                        <div class="book-item">
                            <span class="book-item-title">Publisher:</span>
                            <span>{{ book.publisher.name }}</span>
                        </div>
                        <div class="book-item">
                            <span class="book-item-title">Language:</span>
                            <span>{{ book.language.name }}</span>
                        </div>
                        <div class="book-item">
                            <span class="book-item-title">Page:</span>
                            <span>{{ book.page }}</span>
                        </div>
                        <div class="book-item">
                            <span class="book-item-title">Dimension:</span>
                            <span>{{ book.dimension }}</span>
                        </div>
                        <div class="book-item">
                            <span class="book-item-title">Categories:</span>
                            <span v-for="type in book.Book_Types" :key="type.id">
                                <router-link
                                    :to="`/type/${type.Type_Of_Handbook.id}`"
                                    class="book-authorName"
                                >{{ type.Type_Of_Handbook.name }}</router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="book-bottom">
                <div class="book-bottom-item">
                    <span>About Author</span>
                    <div v-for="author in book.Book_Authors" :key="author.id">
                        <div v-html="author.Author.descriptionHTML"></div>
                        <br />
                    </div>
                </div>
                <div class="book-bottom-item">
                    <span>Description</span>
                    <div v-html="book.descriptionHTML"></div>
                </div>
            </div>
        </div>
    </div>
    <FooterVue />
</template>

<script>
import HeaderVue from "../Header/Header.vue";
import FooterVue from "../Footer/Footer.vue";
import ButtonVue from "@/customs/Button/Button.vue";
import { getBookByIDAPI } from "@/api/apiServices";
import { convertToImage } from "@/utils/globalFunction";

export default {
    components: {
        HeaderVue,
        ButtonVue,
        FooterVue,

    },
    data() {
        return {
            book: {},

        }
    },
    async created() {
        try {
            let response = await getBookByIDAPI(this.$route.params.id);
            if (response.errCode === 0) {
                this.book = response.book;
            } else {
                this.book = {};
            }
        } catch (e) {
            alert(e);
            this.book = {};
        }
    },
    computed: {
        getImage() {
            return convertToImage(this.book?.image);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "BookDetail.scss";
</style>