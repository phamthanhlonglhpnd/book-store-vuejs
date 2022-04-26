<template>
    <div class="menu">
        <div class="menu-header">
            <img :src="logo" alt="logo" class="menu-logo" />
            <router-link class="menu-homelink" to="/">Polarbear Bookshop</router-link>
        </div>
        <div class="menu-body">
            <template v-for="menuItem in menuApp" :key="menuItem.id">
                <div v-if="menuItem.menus.length > 1">
                    <div
                        :class="menuItem.isActive ? 'menu-item menu-active' : 'menu-item'"
                        @click="showActive(menuItem)"
                    >
                        <i :class="menuItem.menus[0].icon"></i>
                        <div class="menu-name">{{ menuItem.name }}</div>

                        <i
                            v-if="menuItem.isActive && menuItem.isShowDropdown"
                            class="fas fa-angle-down"
                            @click="showDropdown(menuItem)"
                        ></i>
                        <i v-else class="fas fa-angle-left" @click="showDropdown(menuItem)"></i>
                    </div>
                    <div class="menu-box">
                        <template v-for="item in menuItem.menus" :key="item.id">
                            <router-link
                                class="menu-box-item"
                                :to="item.link"
                                v-if="menuItem.isActive && menuItem.isShowDropdown"
                            >
                                <i :style="{ marginRight: '15px' }" :class="item.icon"></i>
                                <span>{{ item.name }}</span>
                            </router-link>
                            <div v-else></div>
                        </template>
                    </div>
                </div>

                <router-link
                    v-else
                    :class="menuItem.isActive ? 'menu-item menu-active' : 'menu-item'"
                    :to="menuItem.menus[0].link"
                    @click="showActive(menuItem)"
                >
                    <i :class="menuItem.menus[0].icon"></i>
                    <div class="menu-name">{{ menuItem.name }}</div>
                </router-link>
            </template>
        </div>
    </div>
</template>

<script>
import logo from '../../assets/images/logo.jpg';

export default {
    props: ['menus'],
    data() {
        return {
            menuApp: [],
            logo,

        }
    },
    created() {
        this.menuApp = this.menus.map((menuItem) => ({ ...menuItem, isActive: false, isShowDropdown: false }));
    },
    methods: {
        showActive(item) {
            let newMenu = this.menuApp.map(menuItem => {
                if (menuItem.id === item.id) {
                    menuItem.isActive = true;
                    menuItem.isShowDropdown = true;
                } else {
                    menuItem.isActive = false;
                    menuItem.isShowDropdown = false;
                }
                return menuItem;
            });
            this.menuApp = newMenu;
        },
        showDropdown(item) {
            let newMenu = this.menuApp.map(menuItem => {
                if (menuItem.id === item.id) {
                    menuItem.isShowDropdown = !menuItem.isShowDropdown;
                }
                return menuItem;
            });
            this.menuApp = newMenu;
        }
    },
    computed: {

    }

}
</script>

<style lang="scss" scoped>
@import "Navigation.scss";
</style>