<template>
    <div>
        <div class="title">Manage Languages</div>
        <div class="fields">
            <div class="fields-container fields-flex2">
                <InputVue type="text" title="Name" v-model:value.trim="info.name" />
            </div>
        </div>
        <ButtonVue
            :text="info.action === ACTIONS.CREATE ? 'Create' : 'Update'"
            backgroundColor="#C8E6F8"
            @click="handleSubmit"
        />
        <table class="table">
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading" class="table-tr">
                    <td class="table-td" colspan="4">
                        <LoadingSmallVue color="white" fontSize="20px" />
                    </td>
                </tr>
                <template v-for="language in languages" :key="language.id" v-else>
                    <tr>
                        <td :style="{ textAlign: 'center' }">{{ language.id }}</td>
                        <td>{{ language.name }}</td>
                        <td>
                            <i class="fas fa-pen" @click="handleUpdateLanguage(language)"></i>
                            <i class="fas fa-trash-alt" @click="handleDeleteLanguage(language.id)"></i>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue";
import InputVue from "@/customs/Input/Input.vue";
import LoadingSmallVue from "@/customs/LoadingSmall/LoadingSmall.vue";
import { getAllLanguagesAPI, createLanguageAPI, updateLanguageAPI, deleteLanguageAPI } from "@/api/apiServices";
import { ACTIONS } from "@/utils/constants";


export default {
    components: {
        ButtonVue,
        InputVue,
        LoadingSmallVue,

    },
    data() {
        return {
            ACTIONS,
            languages: [],
            info: {
                id: '',
                name: '',
                action: ACTIONS.CREATE
            },
            isLoading: true,

        }
    },
    async created() {
        try {
            let response = await getAllLanguagesAPI();
            if (response.errCode === 0) {
                this.languages = response.languages;
                this.isLoading = false
            } else {
                this.languages = [];
                this.isLoading = true;
            }
        } catch (e) {
            this.isLoading = true;
            this.languages = [];
            return e;
        }
    },
    methods: {
        async handleSubmit() {
            const data = this.info;
            if (this.info.action === ACTIONS.CREATE) {
                let resCreate = await createLanguageAPI(data);
                if (resCreate.errCode === 0) {
                    alert('Success!');
                    this.languages = [...this.languages, resCreate.language];
                } else {
                    alert(resCreate.errMessage);
                }
            }
            if (this.info.action === ACTIONS.UPDATE) {
                let resUpdate = await updateLanguageAPI(data);
                if (resUpdate.errCode === 0) {
                    alert("Success!");
                    this.languages =
                        this.languages.map(language => {
                            return language.id === id ? resUpdate.language : language
                        })

                } else {
                    alert(resUpdate.errMessage);
                }
            }
            this.info = {
                id: '',
                name: '',
                action: ACTIONS.CREATE
            }
        },
        handleUpdateLanguage(language) {
            this.info.action = ACTIONS.UPDATE;
            this.info.id = language.id;
            this.info.name = language.name;
        },
        async handleDeleteLanguage(id) {
            let response = await deleteLanguageAPI(id);
            if (response.errCode === 0) {
                alert('Success!')
            } else {
                alert(response.errMessage);
            }
            this.languages = this.languages.filter(language => language.id !== id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
</style>