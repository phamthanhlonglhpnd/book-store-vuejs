<template>
    <div>
        <div class="title">Manage Publishers</div>
        <div class="fields">
            <div class="fields-container fields-flex2">
                <InputVue type="text" title="Name" v-model:value.trim="info.name" />
                <div class="manage-user-bottom">
                    <input type="file" id="image" hidden @input="e => handleChangeImage(e)" />
                    <label for="image" class="manage-user-field">Image</label>
                    <div
                        class="manage-user-avatar"
                        :style="{ backgroundImage: `url(${info.selectedImage})` }"
                    ></div>
                </div>
            </div>
            <div class="description">
                <div class="description-title">Description of Publisher</div>
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
                <template v-else v-for="publisher in publishers" :key="publisher.id">
                    <tr>
                        <td :style="{ textAlign: 'center' }">{{ publisher.id }}</td>
                        <td>{{ publisher.name }}</td>

                        <td>{{ `${publisher?.descriptionMarkdown.substring(0, 50)}...` }}</td>
                        <td>
                            <i class="fas fa-pen" @click="handleUpdatePublisher(publisher)"></i>
                            <i
                                class="fas fa-trash-alt"
                                @click="handleDeletePublisher(publisher.id)"
                            ></i>
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
import { createPublisherAPI, getAllPublishersAPI, deletePublisherAPI, updatePublisherAPI } from "@/api/apiServices";
import { convertBase64, convertToImage } from "@/utils/globalFunction";
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

// ClassicEditor
//     .create(document.querySelector('#editor'), {
//         plugins: [SimpleUploadAdapter],
//         toolbar: [],
//         simpleUpload: {
//             // Feature configuration.
//         }
//     })
//     .then()
//     .catch();


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
            publishers: [],
            info: {
                id: '',
                name: '',
                image: '',
                selectedImage: '',
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
        this.getAllPublishers(this.limit);
    },
    watch: {
        limit(newValue, oldValue) {
            this.getAllPublishers(newValue);
        }
    },
    methods: {
        async getAllPublishers(limit) {
            try {
                let response = await getAllPublishersAPI(limit);
                if (response.errCode === 0) {
                    this.publishers = response.publishers;
                    this.isLoading = false
                } else {
                    this.publishers = [];
                    this.isLoading = true;
                }
            } catch (e) {
                this.isLoading = true;
                this.publishers = [];
                return e;
            }
        },
        async handleSubmit() {
            const data = this.info;
            if (this.info.action === ACTIONS.CREATE) {
                let resCreate = await createPublisherAPI(data);
                if (resCreate.errCode === 0) {
                    alert("Success!");
                    this.publishers = [...this.publishers, resCreate.publisher];
                } else {
                    alert(resCreate.errMessage);
                }
            }
            if (info.action === ACTIONS.UPDATE) {
                let resUpdate = await updatePublisherAPI(data);
                if (resUpdate.errCode === 0) {
                    alert("Success!");
                    this.publishers =
                        this.publishers.map(publisher => {
                            return publisher.id === id ? resUpdate.publisher : publisher
                        }
                        )
                } else {
                    alert(resUpdate.errMessage);
                }
            }
            this.info = {
                id: '',
                name: '',
                image: '',
                selectedImage: '',
                descriptionHTML: '',
                action: ACTIONS.CREATE
            }
        },
        handleUpdatePublisher(publisher) {
            this.info.id = publisher.id;
            this.info.name = publisher.name;
            this.info.image = publisher.image;
            this.info.selectedImage = convertToImage(publisher.image);
            this.info.descriptionHTML = publisher.descriptionHTML;
            this.info.action = ACTIONS.UPDATE;
        },
        async handleDeletePublisher(id) {
            let response = await deletePublisherAPI(id);
            if (response.errCode === 0) {
                alert('Success!')
            } else {
                alert(response.errMessage);
            }
            this.publishers = this.publishers.filter(publisher => publisher.id !== id);
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