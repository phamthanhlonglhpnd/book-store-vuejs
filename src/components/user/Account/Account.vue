<template>
    <div class="account">
        <div class="account-top">
            <div class="title">My Account</div>
            <div class="account-title">Manage profile information for account security</div>
        </div>
        <div class="account-bottom">
            <div class="account-bottom-left">
                <div class="account-item">
                    <span class="account-title">Username</span>
                    <span class="account-name">{{ user.name }}</span>
                </div>
                <div class="account-item">
                    <span class="account-title">Name</span>
                    <InputVue type="text" v-model:value.trim="user.name" />
                </div>
                <div class="account-item">
                    <span class="account-title">Email</span>
                    <InputVue type="text" v-model:value.trim="user.email" :disabled="true" />
                </div>
                <div class="account-item">
                    <span class="account-title">Phone</span>
                    <InputVue type="text" v-model:value.trim="user.phone" />
                </div>
            </div>
            <div class="account-bottom-right">
                <div class="account-bottom-right-content">
                    <input type="file" id="image" hidden @input="e => handleChangeImage(e)" />
                    <div
                        class="account-avartar"
                        :style="{
                            backgroundImage: `url(${getImage})`
                        }"
                    ></div>
                    <ButtonVue backgroundColor="wheat">
                        <label for="image">Chose Avatar</label>
                    </ButtonVue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputVue from "@/customs/Input/Input.vue";
import ButtonVue from "@/customs/Button/Button.vue";
import { getUserByIDAPI } from "@/api/apiServices";
import { convertToImage } from "@/utils/globalFunction";

export default {
    components: {
        InputVue,
        ButtonVue
    },
    data() {
        return {
            user: {}
        }
    },
    async created() {
        try {
            let id = JSON.parse(localStorage.getItem('userInfor')).id;
            let response = await getUserByIDAPI(id);
            if (response.errCode === 0) {
                this.user = response.user;
            } else {
                this.user = {};
            }
        } catch (e) {
            alert(e);
        }
    },
    computed: {
        getImage() {
            return convertToImage(this.user.image);
        }
    },
    methods: {
        async handleChangeImage(e) {
            let file = e.target.files[0];
            if (file) {
                let img = URL.createObjectURL(file);
                let fileBase64 = await convertBase64(file);
                this.info.selectedImage = img;
                this.info.image = fileBase64;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/* @import "../../../styles/base"; */
@import "Account.scss";
</style>