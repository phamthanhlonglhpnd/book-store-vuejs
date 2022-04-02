<template>
    <div class="loading-small">
        <i :style="{ color, fontSize }" class="fas fa-spinner loading-small-icon"></i>
    </div>
</template>

<script>
export default {
    props: ['color', 'fontSize']
}
</script>

<style lang="scss" scoped>
@import "LoadingSmall.scss";
</style>