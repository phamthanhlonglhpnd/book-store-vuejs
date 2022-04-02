<template>
    <div>
        <div class="title">Manage Authors</div>
        <div class="fields">
            <div class="fields-container fields-flex2">
                <InputVue type="text" title="Name" v-model:value.trim="info.name" />
            </div>
            <div class="description">
                <div class="description-title">Description of Author</div>
                <ckeditor :editor="editor" v-model="info.descriptionHTML" :config="editorConfig"></ckeditor>
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
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading" class="table-tr">
                    <td class="table-td" colspan="4">
                        <LoadingSmallVue color="white" fontSize="20px" />
                    </td>
                </tr>
                <template v-else v-for="author in authors" :key="author.id">
                    <tr>
                        <td :style="{ textAlign: 'center' }">{{ author.id }}</td>
                        <td>{{ author.name }}</td>

                        <td>{{ `${author?.descriptionMarkdown.substring(0, 50)}...` }}</td>
                        <td>
                            <i class="fas fa-pen" @click="handleUpdateAuthor(author)"></i>
                            <i class="fas fa-trash-alt" @click="handleDeleteAuthor(author.id)"></i>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <ButtonVue text="Load more" backgroundColor="#C8E6F8" @click="limit = limit + 3" />
    </div>
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue";
import InputVue from "@/customs/Input/Input.vue";
import LoadingSmallVue from "@/customs/LoadingSmall/LoadingSmall.vue";
import { ACTIONS } from "@/utils/constants";
import { createAuthorAPI, getAllAuthorsAPI, deleteAuthorAPI, updateAuthorAPI } from "@/api/apiServices";
import { convertBase64, convertToImage } from "@/utils/globalFunction";
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
    components: {
        ButtonVue,
        InputVue,
        LoadingSmallVue,
        ckeditor: CKEditor.component
    },
    data() {
        return {
            ACTIONS,
            authors: [],
            info: {
                id: '',
                name: '',
                descriptionHTML: '',
                action: ACTIONS.CREATE
            },
            limit: 3,
            isLoading: true,
            editor: ClassicEditor,
            editorConfig: {

            }
        }
    },
    created() {
        this.getAllAuthors(this.limit);
    },
    watch: {
        limit(newValue, oldValue) {
            this.getAllAuthors(newValue);
        }
    },
    methods: {
        async getAllAuthors(limit) {
            try {
                let response = await getAllAuthorsAPI(limit);
                if (response.errCode === 0) {
                    this.authors = response.authors;
                    this.isLoading = false
                } else {
                    this.authors = [];
                    this.isLoading = true;
                }
            } catch (e) {
                this.isLoading = true;
                this.authors = [];
                return e;
            }
        },
        async handleSubmit() {
            const data = this.info;
            if (this.info.action === ACTIONS.CREATE) {
                let resCreate = await createAuthorAPI(data);
                if (resCreate.errCode === 0) {
                    alert("Success!");
                    this.authors = [...this.authors, resCreate.author];
                } else {
                    alert(resCreate.errMessage);
                }
            }
            if (info.action === ACTIONS.UPDATE) {
                let resUpdate = await updateAuthorAPI(data);
                if (resUpdate.errCode === 0) {
                    alert("Success!");
                    this.authors =
                        this.authors.map(author => {
                            return author.id === id ? resUpdate.author : author
                        }
                        )
                } else {
                    alert(resUpdate.errMessage);
                }
            }
            this.info = {
                id: '',
                name: '',
                descriptionHTML: '',
                action: ACTIONS.CREATE
            }
        },
        handleUpdateAuthor(author) {
            this.info.id = author.id;
            this.info.name = author.name;
            this.info.descriptionHTML = author.descriptionHTML;
            this.info.action = ACTIONS.UPDATE;
        },
        async handleDeleteAuthor(id) {
            let response = await deleteAuthorAPI(id);
            if (response.errCode === 0) {
                alert('Success!')
            } else {
                alert(response.errMessage);
            }
            this.authors = this.authors.filter(author => author.id !== id);
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";
</style>