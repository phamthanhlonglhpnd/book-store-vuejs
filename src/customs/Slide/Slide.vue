<template>
    <div class="slide">
        <transition name="slide">
            <slot />
        </transition>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "Slide.scss";
</style>