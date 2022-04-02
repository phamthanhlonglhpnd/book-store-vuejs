<template>
    <div class>
        <div class="title">Manage Account</div>
        <div class="fields">
            <div class="fields-container fields-flex2">
                <InputVue type="text" title="Email" :value="user.email" :disabled="true" />
                <InputVue type="password" title="Password" value="123456" :disabled="true" />
            </div>
            <div class="fields-container fields-flex3">
                <InputVue type="text" title="Name" v-model:value.trim="info.name" />
                <InputVue type="text" title="Phone" v-model:value.trim="info.phone" />
                <InputVue type="text" title="RoleID" :value="user.roleID" :disabled="true" />
            </div>
            <div class="manage-user-bottom">
                <input type="file" id="image" hidden @input="e => handleChangeImage(e)" />
                <label for="image" class="manage-user-field">Avatar</label>
                <div
                    class="manage-user-avatar"
                    :style="{
                        backgroundImage: `url(${info.selectedImage})`
                    }"
                ></div>
            </div>
        </div>
        <ButtonVue text="Update" backgroundColor="#C8E6F8" @click="handleSubmit" />
    </div>
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue"
import InputVue from "@/customs/Input/Input.vue"
import LoadingSmallVue from "@/customs/LoadingSmall/LoadingSmall.vue"
import { getUserByIDAPI, updateUserAPI } from "@/api/apiServices"
import { convertBase64, convertToImage } from "@/utils/globalFunction"

export default {
    components: {
        ButtonVue,
        InputVue,
        LoadingSmallVue
    },
    data() {
        return {
            user: {},
            info: {
                id: JSON.parse(localStorage.getItem('userInfor')).id,
                name: '',
                selectedImage: '',
                image: '',
            }
        }
    },
    async created() {
        try {
            let response = await getUserByIDAPI(this.info.id);
            this.user = response.user;
            this.info.selectedImage = convertToImage(response.user?.image);
            this.info.name = response.user?.name;
            this.info.phone = response.user?.phone;
            this.info.image = response.user?.image;
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        async handleSubmit() {
            const data = this.info;
            let resUpdate = await updateUserAPI(data);
            if (resUpdate.errCode === 0) {
                alert("Success!");
                this.user = data;
            } else {
                alert(resUpdate.errMessage);
            }
        },
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
@import "ManageAccount.scss";
</style>