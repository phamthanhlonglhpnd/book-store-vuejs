<template>
    <button
        class="button"
        :disabled="disabled"
        :style="{
            backgroundColor,
            cursor
        }"
        @click="onClick"
    >
        <div class="button-text">{{ text }}</div>
    </button>
</template>

<script>
export default {
    props: ['onClick', 'disabled', 'backgroundColor', 'cursor', 'text', 'colorHover']
}
</script>

<style lang="scss" scoped>
@import "Button.scss";
</style>