<template>
    <HeaderVue />
    <div class="auth-form">
        <span
            class="auth-form-title"
        >Create an account for fast checkout, special coupon codes, wishlists, and order history.</span>
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
            <div :style="{ position: 'relative' }">
                <InputVue
                    title="Password"
                    :type="typeOfInput"
                    :value="info.password"
                    :onBlur="passwordError = ''"
                />
                <div class="auth-form-error">{{ error.passwordError }}</div>
                <div @click="isShowPassword = !isShowPassword" class="auth-form-show">
                    <i v-if="isShowPassword" class="fas fa-eye-slash"></i>
                    <i v-else class="fas fa-eye"></i>
                </div>
            </div>
            <div :style="{ position: 'relative' }">
                <InputVue
                    title="Confirm Password"
                    :type="typeOfInput"
                    :value="info.passwordConfirm"
                    :onBlur="passwordConfirmError = ''"
                />
                <div class="auth-form-error">{{ error.passwordConfirmError }}</div>
                <div @click="isShowPasswordConfirm = !isShowPasswordConfirm" class="auth-form-show">
                    <i v-if="isShowPasswordConfirm" class="fas fa-eye-slash"></i>
                    <i v-else class="fas fa-eye"></i>
                </div>
            </div>
            <div :style="{ padding: '20px 0', lineHeight: '1.5' }">
                By creating an account, you agree to Bookshop’s Privacy
                Notice and Terms of Use.
            </div>
            <ButtonVue text="Login" :backgroundColor="isValidate" @click="handleLogin" />
            <div :style="{ padding: '20px 0' }">
                Or
                <router-link class="auth-form-link" to="/login">Login</router-link>as Existing Customer
            </div>
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
                password: '',
                passwordConfirm: ''
            },
            error: {
                emailError: '',
                passwordError: '',
                passwordConfirmError: ''
            },
            isShowPassword: true,
            isShowPasswordConfirm: true,
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
            return this.info.email !== '' && this.info.password !== '' & this.info.passwordConfirm !== '' && this.error.emailError === '' && this.error.passwordError && this.error.passwordConfirmError === '' === '' ? '#de2454' : '#cc97a4'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";
</style>