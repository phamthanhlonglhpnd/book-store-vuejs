<template>
    <HeaderVue />
    <div class="checkout">
        <div class="checkout-title">Checkout</div>
        <div class="content">
            <div class="checkout-top">
                <div class="checkout-top-left">
                    <div class="checkout-top-left-title">
                        <div>Name's Receiver</div>
                        <div>Phone's Receiver</div>
                        <div>Address's Receiver</div>
                    </div>
                    <div class="checkout-top-left-key">
                        <input type="text" v-model="info.name_receiver" />
                        <input type="text" v-model="info.phone_receiver" />
                        <input type="text" v-model="info.address_receiver" />
                    </div>
                </div>
                <div class="checkout-top-right">
                    <ButtonVue text="Change" backgroundColor="#de2454" />
                </div>
            </div>
            <div class="checkout-bottom">
                <div class="checkout-bottom-title">List Books</div>
                <template v-for="book in books" :key="book.id">
                    <div v-if="books.length > 0" class="checkout-bottom-item">
                        <div class="checkout-bottom-item-left">
                            <img :src="getImage(book.image)" alt class="checkout-bottom-item-image" />
                            <div class="checkout-bottom-item-name">{{ book.name }}</div>
                        </div>
                        <div class="checkout-bottom-item-right">
                            <div>
                                <span class="checkout-bottom-item-price">${{ book.price }}</span>
                                <span
                                    class="checkout-bottom-item-quantity"
                                >{{ book.Carts[0].quantity }}</span>
                            </div>
                            <div class="checkout-bottom-item-total">${{ getTotalItem(book) }}</div>
                        </div>
                    </div>
                    <div v-else>Empty</div>
                </template>
                <div class="checkout-bottom-payment">
                    <div>
                        <div>
                            <b>Shipping fee:</b>
                            ${{ info.shipping_fee }}
                        </div>
                        <div>
                            <b>Total:</b>
                            <span>${{ getTotal() }}</span>
                        </div>
                        <ButtonVue text="Checkout" backgroundColor="#de2454" :onClick="payment" />
                    </div>
                </div>
            </div>
            <!-- <div class="checkout-payment">
                <div class="checkout-bottom-title">Payment</div>
                <div class="checkout-payment-top">
                    <div class="checkout-top-left-title">
                        <div>Discount</div>
                        <div>Payment methods</div>
                        <div>Shipping fee</div>
                    </div>
                    <div class="checkout-top-left-key">
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                    </div>
                </div>
                <div class="checkout-payment-bottom"></div>
            </div>-->
        </div>
    </div>
    <FooterVue />
</template>

<script>
import HeaderVue from "@/components/home/Header/Header.vue"
import ButtonVue from "@/customs/Button/Button.vue"
import FooterVue from "@/components/home/Footer/Footer.vue"
import InputVue from "@/customs/Input/Input.vue"
import { convertToImage } from "@/utils/globalFunction"
import { orderAPI } from "@/api/apiServices"
const user = JSON.parse(localStorage.getItem('userInfor'))

export default {
    components: {
        HeaderVue,
        ButtonVue,
        FooterVue,
        InputVue,
    },
    data() {
        return {
            books: JSON.parse(localStorage.getItem('order')),
            info: {
                name_receiver: user.name,
                phone_receiver: user.phone,
                address_receiver: `${user.Zipcodes[0].street}, ${user.Zipcodes[0].ward}, ${user.Zipcodes[0].district}, ${user.Zipcodes[0].province}`,
                shipping_fee: 2,
                paymentID: "P1"
            },

        }
    },
    created() {
        this.books = Object.keys(this.books).map(item => ({ name: item, ...this.books[item] }));

    },
    methods: {
        getImage(image) {
            return convertToImage(image);
        },
        getTotalItem(book) {
            return (book.price * book.Carts[0].quantity).toFixed(2);
        },
        getTotal() {
            let amount = this.books.reduce(function (total, book) {
                return total + Number((book.price * book.Carts[0].quantity).toFixed(2));
            }, 0)

            return amount + this.info.shipping_fee;
        },
        async payment() {
            try {
                const userID = user.id;
                const books = this.books.map(({ Carts, id, price }) => ({ Carts, id, price }));
                const amount = this.getTotal();

                const data = {
                    userID,
                    books,
                    amount,
                    ...this.info
                }

                let response = await orderAPI(data);
                alert(response.errMessage);

            } catch (e) {
                alert(e);
            }
        }
    },
    computed: {
        // getTotal() {
        //     return this.books.reduce(function (total, book) {
        //         return total + Number((book.price * book.Carts[0].quantity).toFixed(2));
        //     }, 0)
        // }
    }
}
</script>

<style lang="scss" scoped>
@import "Checkout.scss";
</style>