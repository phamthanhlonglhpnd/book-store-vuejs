<template>
    <HeaderVue />
    <div class="auth-form">
        <span
            class="auth-form-title"
        >Enter your email and a new password will be sent to your email.</span>
        <div class="auth-form-box">
            <div>
                <InputVue
                    title="Email"
                    type="text"
                    :value="info.email"
                    :onBlur="error.emailError = ''"
                />
                <div class="auth-form-error">{{ error.emailError }}</div>
            </div>
            <ButtonVue text="Submit" :backgroundColor="isValidate" @click="handleLogin" />
        </div>
    </div>
    <FooterVue />
</template>

<script>
import InputVue from "@/customs/Input/Input.vue";
import HeaderVue from "../home/Header/Header.vue";
import FooterVue from "../home/Footer/Footer.vue";
import ButtonVue from "@/customs/Button/Button.vue";
import { validateEmail, validatePassword, } from "@/utils/globalFunction";

export default {
    components: {
        InputVue,
        HeaderVue,
        FooterVue,
        ButtonVue,

    },
    data() {
        return {
            info: {
                email: '',
            },
            error: {
                emailError: '',
            },
        }
    },
    methods: {
        handleLogin() {

        }
    },
    computed: {
        typeOfInput() {
            return this.isShowPassword ? "password" : "text"
        },
        isValidate() {
            return this.info.email !== '' && this.error.emailError === '' ? '#de2454' : '#cc97a4'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";
</style>