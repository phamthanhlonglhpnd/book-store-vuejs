<template>
    <HeaderVue />
    <div class="content">
        <div class="cart">
            <div class="cart-title">Shopping Cart</div>
            <LoadingSmallVue v-if="isLoading" color="orange" fontSize="40px" />
            <div v-else v-for="book in books" :key="book.id" class="cart-list">
                <!-- <CartItemVue :book="book" @delete-book-in-cart="deleteBookInCart" /> -->
                <div class="cart-item">
                    <div class="cart-item-left">
                        <router-link :to="`/book/${book.name}/${book.id}`">
                            <img
                                :src="book.image?.data?.length > 0 ? getImage(book.image) : logo"
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
                            <template
                                v-for="type in book.Book_Types"
                                :key="type.id"
                                class="cart-item-author"
                            >
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
                                <input
                                    min="0"
                                    class="cart-item-quantity-input"
                                    type="number"
                                    v-model="book.Carts[0].quantity"
                                />
                            </div>
                            <div class="cart-item-price">
                                <span>Price:</span>
                                <b>${{ book.price }}</b>
                            </div>
                            <div class="cart-item-price">
                                <span>Total:</span>
                                <b>{{ `$${getTotalInOneItem(book.Carts[0].quantity, book.price)}` }}</b>
                            </div>
                        </div>
                        <i @click="deleteBookInCart(book.id)" class="fas fa-trash"></i>
                        <input
                            type="checkbox"
                            class="checked"
                            :checked="book.Carts[0].quantity ? true : false"
                            @click="setQuantityOfBook(book)"
                        />
                    </div>
                </div>
            </div>
            <div
                :style="{ display: 'flex', justifyContent: 'flex-end', paddingRight: '40px', gap: '15px' }"
            >
                <ButtonVue :text="`Total: $${getTotalOfAll(books)}`" backgroundColor="#de2454" />
                <ButtonVue text="Payment" backgroundColor="#de2454" @click="payment(books)" />
            </div>
        </div>
    </div>
    <template v-for="type in types" :key="type.id">
        <BookListVue :type="type.id" :name="type.name" />
    </template>
    <FooterVue />
</template>

<script>
import HeaderVue from "@/components/home/Header/Header.vue"
import FooterVue from "@/components/home/Footer/Footer.vue"
import ButtonVue from "@/customs/Button/Button.vue"
import BookListVue from "@/components/home/BookList/BookList.vue"
import CartItemVue from "../CartItem/CartItem.vue"
import LoadingSmallVue from "@/customs/LoadingSmall/LoadingSmall.vue"
import { getAllTypeAPI, getBooksInCartAPI, deleteBookInCartAPI } from '@/api/apiServices'
import { convertToImage } from "@/utils/globalFunction"
import logo from '../../../assets/images/logo.jpg'
export default {
    components: {
        ButtonVue,
        HeaderVue,
        FooterVue,
        BookListVue,
        CartItemVue,
        LoadingSmallVue,

    },
    data() {
        return {
            books: [],
            page: 0,
            limit: 5,
            types: [],
            isLoading: true,
            logo,

        }
    },
    async created() {
        await this.getBookByType();
        await this.getBooksInCart();

    },
    methods: {
        async getBookByType() {
            try {
                let response = await getAllTypeAPI(this.page, this.limit);
                if (response.errCode === 0) {
                    this.types = response.types;

                } else {
                    this.types = [];
                }
            } catch (e) {

                alert(e);
            }
        },
        async getBooksInCart() {
            try {
                let id = JSON.parse(localStorage.getItem('userInfor')).id;
                let response = await getBooksInCartAPI(id);
                if (response.errCode === 0) {
                    this.books = response.books;
                    this.isLoading = false;
                } else {
                    this.books = [];
                    this.isLoading = true;
                }
            } catch (e) {
                alert(e);
                this.isLoading = true;
            }
        },
        async deleteBookInCart(bookID) {
            try {
                let userID = JSON.parse(localStorage.getItem('userInfor')).id;
                let response = await deleteBookInCartAPI(bookID, userID);
                if (response.errCode === 0) {
                    await this.getBooksInCart();
                    alert(response.errMessage);
                } else {
                    alert(response.errMessage);
                }
            } catch (e) {
                alert(e);
            }

        },
        getImage(image) {
            return convertToImage(image);
        },
        getTotalInOneItem(quantity, price) {
            return (price * quantity).toFixed(2);
        },
        getTotalOfAll(books) {
            return books.reduce(function (total, book) {
                return total + Number((book.price * book.Carts[0].quantity).toFixed(2));
            }, 0)
        },
        payment(books) {
            let newBooks = books.filter(book => book.Carts[0].quantity !== 0);
            localStorage.setItem('order', JSON.stringify(Object.assign({}, newBooks)));
            this.$router.push({
                name: 'user-checkout',
            })

        },
        setQuantityOfBook(book) {
            book.Carts[0].quantity = 0;
        }
    },

    computed: {

    },
}
</script>

<style lang="scss" scoped>
@import "Cart.scss";
</style>