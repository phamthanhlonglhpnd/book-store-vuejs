<template>
    <div class="cart-item">
        <div class="cart-item-left">
            <router-link :to="`/book/${book.name}/${book.id}`">
                <img
                    :src="this.book.image?.data?.length > 0 ? getImage : logo"
                    alt
                    class="cart-item-image"
                />
            </router-link>
            <div class="cart-item-detail">
                <router-link
                    :to="`/book/${book.name}/${book.id}`"
                    class="cart-item-name"
                >{{ book.name }}</router-link>
                <span :style="{ color: '#B59A88', marginRight: '5px' }">Author:</span>
                <template
                    v-for="author in book.Book_Authors"
                    :key="author.id"
                    class="cart-item-author"
                >
                    <span>{{ author.Author.name }}</span>
                    -
                </template>
                <br />
                <span :style="{ color: '#B59A88', marginRight: '5px' }">Categories:</span>
                <template v-for="type in book.Book_Types" :key="type.id" class="cart-item-author">
                    <span>{{ type.Type_Of_Handbook.name }}</span>
                    -
                </template>
                <div v-if="book.count > 0" class="cart-item-available">
                    <i class="fas fa-check-circle"></i>
                    <span>Available</span>
                </div>
                <div v-else class="cart-item-unavailable">
                    <i class="fas fa-check-circle"></i>
                    <span>Unavailable</span>
                </div>
            </div>
        </div>
        <div class="cart-item-right">
            <div>
                <div class="cart-item-quantity">
                    <span>Quantity:</span>
                    <input min="0" class="cart-item-quantity-input" type="number" v-model="value" />
                </div>
                <div class="cart-item-price">
                    <span>Price:</span>
                    <b>${{ book.price }}</b>
                </div>
                <div class="cart-item-price">
                    <span>Total:</span>
                    <b>{{ `$${getTotalInOneItem}` }}</b>
                </div>
            </div>
            <i @click="$emit('deleteBookInCart', book.id)" class="fas fa-trash"></i>
        </div>
    </div>
</template>

<script>
import { convertToImage } from "@/utils/globalFunction"
import logo from '../../../assets/images/logo.jpg'

export default {
    components: {

    },
    props: ['book'],
    emits: ['deleteBookInCart'],
    data() {
        return {
            logo,
            value: 1,

        }
    },
    computed: {
        getImage() {
            return convertToImage(this.book.image);
        },
        getTotalInOneItem() {
            return (this.value * this.book.price).toFixed(2);
        },
        getTotalOfAll() {
            return
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import "CartItem.scss";
</style>