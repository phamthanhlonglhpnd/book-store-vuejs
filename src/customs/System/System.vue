<template>
    <div class="system">
        <div class="system-left">
            <NavigationVue :menus="getMenuApp" />
        </div>
        <div class="system-right">
            <HeaderAccountVue />
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavigationVue from "../Navigation/Navigation.vue";
import HeaderAccountVue from "../../components/share/HeaderAccount/HeaderAccount.vue";
import { store } from "@/store/store";
import { adminMenu, employeeMenu, userMenu } from "@/utils/menuApp";
import { ROLES } from "@/utils/constants";


export default {
    components: {
        NavigationVue,
        HeaderAccountVue,

    },
    data() {
        return {
            menus: [],
            userInfor: JSON.parse(localStorage.getItem('userInfor')),
            store,
        }
    },
    computed: {
        getMenuApp() {
            if (this.userInfor?.roleID === ROLES.ADMIN) {
                this.menus = adminMenu;
            }
            if (this.userInfor?.roleID === ROLES.EMPLOYEE) {
                this.menus = employeeMenu;
            }
            if (this.userInfor?.roleID === ROLES.USER) {
                this.menus = userMenu;
            }
            return this.menus;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "System.scss";
</style>