<template>
    <div :style="{
        position: 'relative'
    }">
        <HeaderVue />
        <BackgroundVue />
        <template v-for="type in types" :key="type.id">
            <BookListVue :type="type.id" :name="type.name" />
        </template>
        <div :style="{ marginBottom: '140px' }" v-if="isLoading">
            <LoadingSmallVue color="orange" fontSize="40px" />
        </div>
        <div v-else />
        <FooterVue />
        <div
            v-if="isTop"
            :style="{
                position: 'fixed',
                bottom: '10px',
                right: '10px',
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                backgroundColor: '#FE6955',
                cursor: 'pointer',
                boxShadow: '0 0 10px 10px rgba(255, 255, 255, 0.3)'
            }"
            @click="scrollToTop()"
        >
            <i
                class="fas fa-arrow-alt-circle-up"
                :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '18px'
                }"
            ></i>
        </div>
        <div v-else />
    </div>
</template>

<script>
import HeaderVue from "./Header/Header.vue";
import BackgroundVue from "./Background/Background.vue";
import BookListVue from "./BookList/BookList.vue";
import LoadingSmallVue from "@/customs/LoadingSmall/LoadingSmall.vue";
import FooterVue from "./Footer/Footer.vue";
import { getAllTypeAPI } from '@/api/apiServices';

export default {
    components: {
        HeaderVue,
        BackgroundVue,
        BookListVue,
        FooterVue,
        LoadingSmallVue,

    },
    data() {
        return {
            types: [],
            isTop: false,
            page: 0,
            limit: 3,
            isLoading: false,
            typesLength: JSON.parse(localStorage.getItem('types')).length
        }
    },
    methods: {
        scroll() {
            if (window.scrollY > 50) {
                this.isTop = true;
            } else {
                this.isTop = false
            }
            const difference = document.documentElement.scrollHeight - window.innerHeight;
            const scrollposition = document.documentElement.scrollTop;
            if (difference - scrollposition <= 400) {
                if (this.limit >= this.typesLength) {
                    this.limit = this.typesLength;
                    this.isLoading = false
                } else {
                    this.isLoading = true;
                    this.limit = this.limit + 3;
                }
            } else {
                this.isLoading = false;
            }
        },
        scrollToTop() {
            this.isTop = false
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        async getAllTypes(page, limit) {
            try {
                let response = await getAllTypeAPI(page, limit);
                if (response.errCode === 0) {
                    this.types = response.types;
                } else {
                    this.types = [];
                }
            } catch (e) {
                alert(e);
                this.types = [];
            }
        }
    },
    async created() {
        await this.getAllTypes(this.page, this.limit);
    },
    mounted() {
        window.addEventListener('scroll', this.scroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.scroll);
    },
    watch: {
        limit(newValue, oldValue) {
            this.getAllTypes(this.page, newValue)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>