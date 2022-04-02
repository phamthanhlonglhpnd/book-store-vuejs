<template>
    <div class="manage-user">
        <div class="title">Manage Users</div>
        <div class="fields">
            <div class="fields-container fields-flex2">
                <InputVue
                    type="text"
                    title="Email"
                    v-model:value.trim="info.email"
                    :disabled="action === ACTIONS.UPDATE ? true : false"
                />
                <InputVue
                    type="password"
                    title="Password"
                    v-model:value.trim="info.password"
                    :disabled="true"
                />
            </div>
            <div class="fields-container fields-flex3">
                <InputVue type="text" title="Name" v-model:value.trim="info.name" />
                <InputVue type="text" title="Phone" v-model:value.trim="info.phone" />
                <InputVue type="text" title="RoleID" v-model:value.trim="info.roleID" />
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
        <ButtonVue
            :text="info.action === ACTIONS.CREATE ? 'Create' : 'Update'"
            backgroundColor="#C8E6F8"
            @click="handleSubmit"
        />
        <div class="title">Tables of All Users In System</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>RoleID</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading" class="table-tr">
                    <td class="table-td" colspan="4">
                        <LoadingSmallVue color="white" fontSize="20px" />
                    </td>
                </tr>
                <template v-else v-for="user in users" :key="user.id">
                    <tr>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.roleID }}</td>
                        <td>{{ user.phone }}</td>
                        <td>
                            <i class="fas fa-pen" @click="handleUpdateUser(user)"></i>
                            <i class="fas fa-trash-alt" @click="handleDeleteUser(user.id)"></i>
                            <i class="fas fa-eye"></i>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue"
import InputVue from "@/customs/Input/Input.vue"
import LoadingSmallVue from "@/customs/LoadingSmall/LoadingSmall.vue"
import { ACTIONS } from "@/utils/constants"
import { convertBase64, convertToImage } from "@/utils/globalFunction"
import { getAllUsersAPI, createUserAPI, deleteUserAPI, updateUserAPI } from "@/api/apiServices";


export default {
    components: {
        ButtonVue,
        InputVue,
        LoadingSmallVue
    },
    data() {
        return {
            ACTIONS,
            users: [],
            info: {
                id: '',
                name: '',
                image: '',
                selectedImage: '',
                roleID: '',
                email: '',
                password: '123456',
                phone: '',
                action: ACTIONS.CREATE,

            },
            isLoading: true,
        }
    },
    async created() {
        try {
            let response = await getAllUsersAPI();
            if (response.errCode === 0) {
                this.users = response.users;
                this.isLoading = false
            } else {
                this.users = [];
                this.isLoading = true;
            }
        } catch (e) {
            this.isLoading = true;
            this.users = [];
            return e;
        }
    },
    methods: {
        async handleSubmit() {
            const data = this.info;
            if (this.info.action === ACTIONS.CREATE) {
                let resCreate = await createUserAPI(data);
                if (resCreate.errCode === 0) {
                    alert('Success!');
                    this.users = [...this.users, resCreate.user];
                } else {
                    alert(resCreate.errMessage);
                }
            }
            if (this.info.action === ACTIONS.UPDATE) {
                let resUpdate = await updateUserAPI(data);
                if (resUpdate.errCode === 0) {
                    alert("Success!");
                    this.users =
                        this.users.map(user => {
                            return user.id === id ? { ...data } : language
                        })

                } else {
                    alert(resUpdate.errMessage);
                }
            }
            this.info = {
                id: '',
                name: '',
                image: '',
                selectedImage: '',
                roleID: '',
                email: '',
                password: '123456',
                phone: '',
                action: ACTIONS.CREATE,

            }
        },
        handleUpdateUser(user) {
            this.info.action = ACTIONS.UPDATE;
            this.info.id = user.id;
            this.info.name = user.name;
            this.info.email = user.email;
            this.info.selectedImage = convertToImage(user.image);
            this.info.image = user.image;
            this.info.phone = user.phone;
            this.info.roleID = user.roleID;
        },
        async handleDeleteUser(id) {
            let response = await deleteUserAPI(id);
            if (response.errCode === 0) {
                alert('Success!')
            } else {
                alert(response.errMessage);
            }
            this.users = this.users.filter(user => user.id !== id);
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
@import "../../styles/base";
</style>