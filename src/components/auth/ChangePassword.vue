<template>
    <HeaderVue />
    <div class="auth-form">
        <span class="auth-form-title">Change your password</span>
        <div class="auth-form-box">
            <div>
                <InputVue
                    title="Email"
                    type="text"
                    :value="info.password"
                    :onBlur="error.passwordError = ''"
                />
                <div class="auth-form-error">{{ error.passwordError }}</div>
            </div>
            <div :style="{ position: 'relative' }">
                <InputVue
                    title="Password"
                    :type="typeOfInput"
                    :value="info.newPassword"
                    :onBlur="newPasswordError = ''"
                />
                <div class="auth-form-error">{{ error.newPasswordError }}</div>
                <div @click="isShowPassword = !isShowPassword" class="auth-form-show">
                    <i v-if="isShowPassword" class="fas fa-eye-slash"></i>
                    <i v-else class="fas fa-eye"></i>
                </div>
            </div>
            <div :style="{ position: 'relative' }">
                <InputVue
                    title="Confirm Password"
                    :type="typeOfInput"
                    :value="info.newPasswordConfirm"
                    :onBlur="newPasswordConfirmError = ''"
                />
                <div class="auth-form-error">{{ error.newPasswordConfirmError }}</div>
                <div @click="isShowPasswordConfirm = !isShowPasswordConfirm" class="auth-form-show">
                    <i v-if="isShowPasswordConfirm" class="fas fa-eye-slash"></i>
                    <i v-else class="fas fa-eye"></i>
                </div>
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
                password: '',
                newPassword: '',
                newPasswordConfirm: ''
            },
            error: {
                passwordError: '',
                newPasswordError: '',
                newPasswordConfirmError: ''
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