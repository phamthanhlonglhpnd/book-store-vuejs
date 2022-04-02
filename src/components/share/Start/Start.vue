<template>
    <div class="start">
        <div class="start-title">Welcome to POLARBEAR BOOKSHOP!</div>
        <div :style="{ backgroundImage: `url(${logo})` }" alt class="start-logo"></div>
        <div class="start-box">
            <p class="start-comment">
                “Thanks to Polarbear Bookshop, there is no reason to buy books on Amazon
                anymore.”
            </p>
            <span class="start-author">— Inside Hook</span>
            <p
                class="start-comment"
            >“PolarbearBookshop.org hopes to play Rebel Alliance to Amazon’s Empire.”</p>
            <span class="start-author">— Chicago Tribune</span>
        </div>
        <div class="start-content">
            <div class="title">About Polarbear Bookshop</div>
            <div v-html="handbook.descriptionHTML"></div>
        </div>
    </div>
</template>

<script>
import { getHandbookByIDAPI } from '@/api/apiServices';
import logo from '../../../assets/images/logo.jpg';

export default {
    data() {
        return {
            handbook: {},
            logo
        }
    },
    async created() {
        try {
            let response = await getHandbookByIDAPI(1);
            if (response.errCode === 0) {
                this.handbook = response.handbook
            } else {
                this.handbook = {};
            }
        } catch (e) {
            this.handbook = {};
            return e;
        }
    }
}   
</script>

<style lang="scss" scoped>
@import "Start.scss";
</style>