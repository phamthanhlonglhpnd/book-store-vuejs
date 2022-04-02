<template>
    <div>
        <div class="title">Manage Books</div>
        <div class="fields">
            <div class="fields-container fields-flex2">
                <InputVue type="text" title="Name" v-model:value.trim="info.name" />
                <div class="manage-book-bottom">
                    <input type="file" id="image" hidden @input="e => handleChangeImage(e)" />
                    <label for="image" class="manage-book-field">Image</label>
                    <div
                        class="manage-book-avatar"
                        :style="{
                            backgroundImage: `url(${info.selectedImage})`
                        }"
                    ></div>
                </div>
            </div>
            <div class="fields-container fields-flex4">
                <InputVue type="text" title="Page" v-model:value.trim="info.page" />
                <InputVue type="text" title="Price" v-model:value.trim="info.price" />
                <InputVue type="text" title="Dimension" v-model:value.trim="info.dimension" />
                <InputVue type="text" title="Count" v-model:value.trim="info.count" />
            </div>
            <div class="fields-container fields-flex3">
                <div class="select">
                    <div class="select-title">Language</div>
                    <v-select :options="languages" v-model="info.languageID" />
                </div>
                <div class="select">
                    <div class="select-title">Publisher</div>
                    <v-select :options="publishers" v-model="info.publisherID" />
                </div>
                <!-- <div class="select">
            <div class="select-title">Store</div>
            <Select
              value={selectedOption}
              options={convertArrayToSelectedOpject(publishers)}
              onChange={handleChangeSelect}
              styles={customStyles}
            />
                </div>-->
            </div>
            <div class="fields-container fields-flex3">
                <div class="select">
                    <div class="select-title">Authors</div>
                    <v-select multiple :options="authors" v-model="info.authorID" />
                </div>
                <div class="select">
                    <div class="select-title">Categories</div>
                    <v-select multiple :options="types" v-model="info.typeID" />
                </div>
                <div class="select">
                    <div class="select-title">Publish Date</div>
                    <div class="select-box">
                        <div class="select-input" @click="isShowCalendar = !isShowCalendar">
                            <input
                                type="text"
                                :value="new Date(info.publishDate).toLocaleDateString('en-US')"
                                :style="{
                                    position: 'absolute',
                                    transform: 'translateY(-10px)',
                                    color: 'black'
                                }"
                            />
                            <i class="fas fa-angle-down select-icon"></i>
                        </div>

                        <div
                            @click="isShowCalendar = !isShowCalendar"
                            class="select-options"
                            v-if="isShowCalendar"
                        >
                            <DatePicker v-model="info.publishDate" />
                        </div>
                        <div v-else />
                    </div>
                </div>
            </div>
            <div class="description">
                <div class="description-title">Description of Book</div>
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
                    <th>Page</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Publish Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading" class="table-tr">
                    <td class="table-td" colspan="4">
                        <LoadingSmallVue color="white" fontSize="20px" />
                    </td>
                </tr>
                <template v-for="(book, index) in books" :key="book.id" v-else>
                    <tr>
                        <td :style="{ textAlign: 'center' }">{{ index + 1 }}</td>
                        <td>{{ book.name }}</td>
                        <td>{{ book.page }}</td>
                        <td>{{ `$${book.price}` }}</td>
                        <td>{{ book.count }}</td>
                        <td>{{ book["publish_date"] }}</td>
                        <td>
                            <i class="fas fa-pen" @click="handleUpdateBook(book)"></i>
                            <i class="fas fa-trash-alt" @click="handleDeleteBook(book.id)"></i>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <PaginationVue
            :currentPage="currentPage"
            :totalPage="totalPage"
            :previousPage="previousPage"
            :nextPage="nextPage"
            :setCurrentPage="setCurrentPage"
        />
    </div>
</template>

<script>
import ButtonVue from '@/customs/Button/Button.vue';
import InputVue from '@/customs/Input/Input.vue';
import LoadingSmallVue from '@/customs/LoadingSmall/LoadingSmall.vue';
import PaginationVue from '@/customs/Pagination/Pagination.vue';
import { store } from '@/store/store';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import 'v-calendar/dist/style.css';
import { ACTIONS } from '@/utils/constants';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { convertBase64, convertToImage } from '@/utils/globalFunction';
import { createBookAPI, getAllBooksAPI, deleteBookAPI, getBookByIDAPI, } from '@/api/apiServices';

export default {
    components: {
        "v-select": vSelect,
        ButtonVue,
        InputVue,
        LoadingSmallVue,
        PaginationVue,
        ckeditor: CKEditor.component,

    },
    data() {
        return {
            ACTIONS,
            books: [],
            authors: JSON.parse(localStorage.getItem('authors')),
            publishers: JSON.parse(localStorage.getItem('publishers')),
            types: JSON.parse(localStorage.getItem('types')),
            languages: JSON.parse(localStorage.getItem('languages')),
            info: {
                id: '',
                name: '',
                image: '',
                selectedImage: '',
                descriptionHTML: '',
                dimension: '',
                page: '',
                price: '',
                count: '',
                publishDate: new Date(),
                action: ACTIONS.CREATE,
                authorID: [],
                typeID: [],
                publisherID: [],
                languageID: [],
                action: ACTIONS.CREATE
            },
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            isShowCalendar: false,
            isLoading: true,
            editor: ClassicEditor,
            editorConfig: {

            }
        }
    },
    async created() {
        await store.getAllAuthors();
        await store.getAllLanguages();
        await store.getAllPublishers();
        await store.getAllTypes();
        await this.getAllBooks(this.currentPage);
    },
    methods: {
        async getAllBooks(currentPage) {
            try {
                let response = await getAllBooksAPI(currentPage);
                if (response.errCode === 0) {
                    this.books = response.books;
                    this.totalPage = Math.ceil(response.count / this.pageSize);
                    this.isLoading = false;
                } else {
                    this.isLoading = true;
                    this.books = [];
                }
            } catch (e) {
                this.isLoading = true;
                this.books = [];
                return e;
            }
        },
        async handleSubmit() {
            let typeID = Object.entries(this.info.typeID).map(item => item[1].id);
            let authorID = Object.entries(this.info.authorID).map(item => item[1].id);
            let languageID = this.info.languageID.id;
            let publisherID = this.info.publisherID.id;
            let publishDate = new Date(this.info.publishDate).toLocaleDateString('en-US');
            const data = {
                ...this.info,
                typeID,
                languageID,
                authorID,
                publishDate,
                publisherID
            }
            if (this.info.action === ACTIONS.CREATE) {
                let resCreate = await createBookAPI(data);
                if (resCreate.errCode === 0) {
                    alert("Success!");
                    this.books = [...this.books, resCreate.book]
                } else {
                    alert(resCreate.errMessage);
                }
            }
            this.info = {
                id: '',
                name: '',
                image: '',
                selectedImage: '',
                descriptionHTML: '',
                dimension: '',
                page: '',
                price: '',
                count: '',
                publishDate: new Date(),
                action: ACTIONS.CREATE,
                authorID: [],
                typeID: [],
                publisherID: [],
                languageID: [],
                action: ACTIONS.CREATE
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
        },
        async handleUpdateBook(book) {

        },
        async handleDeleteBook(id) {
            let response = await deleteBookAPI(id);
            if (response.errCode === 0) {
                alert('Success!')
            } else {
                alert(response.errMessage);
            }
            this.books = this.books.filter(book => book.id !== id);
        },
        previousPage() {
            if (this.currentPage <= 1) {
                this.currentPage = 1;
            } else {
                this.currentPage--;
            }

        },
        nextPage() {
            if (this.currentPage >= this.totalPage) {
                this.currentPage = this.totalPage;
            } else {
                this.currentPage++;
            }
        },
        setCurrentPage() {
            console.log(this.currentPage);
        }
    },
    watch: {
        currentPage(newValue, oldValue) {
            this.getAllBooks(newValue)
        }
    }
}
</script>

<style lang="scss" scoped>
.manage-book {
    &-bottom {
        margin: 15px 0;
    }
    &-field {
        color: white;
        font-size: 18px;
        text-align: center;
        display: block;
    }
    &-avatar {
        margin: 15px auto;
        width: 200px;
        height: 250px;
        // border-radius: 50%;
        box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.15);
        border: 3px solid orange;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
}
@import "../../styles/variable";
</style>