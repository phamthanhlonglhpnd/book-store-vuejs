<template>
    <div class="home">
        <Carousel
            :navigation="true"
            :pagination="true"
            :startAutoPlay="false"
            :timeout="5000"
            class="carousel"
            v-slot="{ currentSlide }"
        >
            <Slide v-for="(slide, index) in carouselSlides" :key="index">
                <div v-show="currentSlide === index + 1" class="slide-info">
                    <img :src="require(`../../../assets/images/${slide}.jpg`)" alt />
                </div>
            </Slide>
        </Carousel>
    </div>
</template>

<script>
import Carousel from "../../../customs/Carousel/Carousel.vue";
import Slide from "../../../customs/Slide/Slide.vue";

export default {
    name: "Home",
    components: { Carousel, Slide },
    setup() {
        const carouselSlides = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6"];
        return { carouselSlides };
    },
};
</script>

<style lang="scss" scoped>
@import "Background.scss";
</style>