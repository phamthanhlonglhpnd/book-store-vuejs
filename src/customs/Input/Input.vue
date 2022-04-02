<template>
    <div class="box">
        <div class="box-title">{{ title }}</div>
        <input
            class="box-input"
            :type="type"
            :value="value"
            :disabled="disabled"
            @blur="onBlur"
            @change="onChange"
            @input="$emit('update:value', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: ['title', 'type', 'onBlur', 'value', 'onChange', 'disabled'],
    emits: ['update:value']
}
</script>

<style lang="scss" scoped>
@import "Input.scss";
</style>