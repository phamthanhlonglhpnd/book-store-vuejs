<template>
    <div class="book">
        <img :src="this.image?.data?.length > 0 ? getImage : logo" class="book-image" />
    </div>
</template>

<script>
import { convertToImage } from "@/utils/globalFunction";
import logo from '../../../assets/images/logo.jpg';

export default {
    props: ['image'],
    data() {
        return {
            logo
        }
    },
    computed: {
        getImage() {
            return convertToImage(this.image);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "BookItem.scss";
</style>