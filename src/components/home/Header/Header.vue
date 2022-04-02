<template>
    <div class="header">
        <div class="header-top">
            <div class="header-left">
                <img :src="logo" alt="logo" class="header-logo" />
                <router-link to="/" class="header-name">POLARBEAR BOOKSTORE</router-link>
            </div>
            <div class="header-middle">
                <SearchVue />
            </div>
            <div class="header-right">
                <div class="header-choose">Choose a Bookstore</div>

                <div v-if="isLoggin" :style="{ position: 'relative' }">
                    <img
                        :src="account"
                        alt="account"
                        class="header-user"
                        @click="isShowAccount = !isShowAccount"
                    />
                    <div v-if="isShowAccount" class="header-user-info">
                        <router-link to="/system/start" class="header-user-item">My Account</router-link>
                        <div class="header-user-item">My Wishlists</div>
                        <router-link to="change-password" class="header-user-item">Change Password</router-link>
                        <div class="header-user-item" @click="handleLogout">Logout</div>
                    </div>
                    <div v-else></div>
                </div>
                <div v-else class="header-choose">
                    <router-link to="/login">Sign in</router-link>
                </div>
                <div :style="{ position: 'relative' }">
                    <img :src="cart" alt="cart" class="header-cart" />
                    <div class="header-box">
                        <span class="header-count">{{ count }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-bottom">
            <div class="header-bottom-item">Gift cards</div>
            <div class="header-bottom-item">Best Sellers</div>
            <div class="header-bottom-item">New Releases</div>
            <div class="header-bottom-item">Fiction</div>
            <div class="header-bottom-item">Nonfiction</div>
            <div class="header-bottom-item">YA</div>
            <div class="header-bottom-item">Kids</div>
            <div class="header-bottom-item">Games and Puzzles</div>
        </div>
    </div>
</template>

<script>
import SearchVue from '@/customs/Search/Search.vue';
import logo from '../../../assets/images/logo.jpg';
import cart from '../../../assets/images/cart.svg';
import account from '../../../assets/images/account.svg';
import { store } from '@/store/store';

export default {
    components: {
        SearchVue
    },
    data() {
        return {
            count: 3,
            isShowAccount: false,
            logo,
            cart,
            account,
            store,
            isLoggin: JSON.parse(localStorage.getItem('isLoggin'))
        }
    },
    methods: {
        async handleLogout() {
            await store.logout();
        }
    }
}

</script>

<style lang="scss" scoped>
@import "Header.scss";
</style>