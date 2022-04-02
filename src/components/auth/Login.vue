<template>
    <HeaderVue />
    <div class="auth-form">
        <span class="auth-form-title">Login as Existing Customer</span>
        <div class="auth-form-box">
            <div>
                <InputVue
                    title="Email"
                    type="text"
                    v-model:value.trim="info.email"
                    :onBlur="error.emailError = ''"
                />
                <div class="auth-form-error">{{ error.emailError }}</div>
            </div>
            <div :style="{ position: 'relative' }">
                <InputVue
                    title="Password"
                    :type="typeOfInput"
                    v-model:value.trim="info.password"
                    :onBlur="error.passwordError = ''"
                />
                <div class="auth-form-error">{{ error.passwordError }}</div>
                <div @click="isShowPassword = !isShowPassword" class="auth-form-show">
                    <i v-if="isShowPassword" class="fas fa-eye-slash"></i>
                    <i v-else class="fas fa-eye"></i>
                </div>
            </div>
            <div :style="{ padding: '20px 0', lineHeight: '1.5' }">
                By creating an account, you agree to Bookshop’s Privacy
                Notice and Terms of Use.
            </div>
            <ButtonVue
                text="Login"
                :backgroundColor="backGround"
                :onClick="handleLogin"
                :disabled="!isValidate"
            />
            <div :style="{ padding: '20px 0' }">
                or
                <router-link class="auth-form-link" to="/register">Create a new account</router-link>|
                <router-link class="auth-form-link" to="/forgot-password">Forgot Password?</router-link>
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
import { store } from "@/store/store";

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
            },
            error: {
                emailError: '',
                passwordError: '',
            },
            isShowPassword: true,
            // isValidate: this.info.email !== '' && this.info.password !== '' && this.error.emailError === '' && this.error.passwordError === '',
            store,
        }
    },
    methods: {
        async handleLogin() {
            try {
                let response = await store.login(this.info);
                if (response.errCode === 0) {
                    this.$router.push("/");
                }
                if (response.errCode === 1) {
                    this.error.emailError = response.errMessage;
                }
                if (response.errCode === 2) {
                    this.error.passwordError = response.errMessage;
                }
            } catch (e) {
                alert(e);
            }
        },
    },
    computed: {
        typeOfInput() {
            return this.isShowPassword ? "password" : "text"
        },
        backGround() {
            return this.info.email !== '' && this.info.password !== '' && this.error.emailError === '' && this.error.passwordError === '' ? '#de2454' : '#cc97a4'
        },
        isValidate() {
            return this.info.email !== '' && this.info.password !== '' && this.error.emailError === '' && this.error.passwordError === '' ? true : false
        }
    },
    watch: {
        // info: {
        //     handler(newValue) {
        //         console.log(newValue);
        //     },
        //     deep: true
        // }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";
</style>