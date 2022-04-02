<template>
    <div class="title">Manage Type of Handbook</div>
    <div class="fields">
        <div class="fields-container fields-flex2">
            <InputVue type="text" title="Type of Handbook" v-model:value.trim="info.name" />
        </div>
    </div>
    <ButtonVue
        :text="info.action === ACTIONS.CREATE ? 'Create' : 'Update'"
        backgroundColor="#C8E6F8"
        @click="handleSubmit"
    />
    <div class="title">Tables of All Type of Handbook In System</div>
    <table class="table">
        <thead>
            <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Date created</th>
                <th>Date updated</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="isLoading" class="table-tr">
                <td class="table-td" colspan="4">
                    <LoadingSmallVue color="white" fontSize="20px" />
                </td>
            </tr>
            <template v-else v-for="type in types" :key="type.id">
                <tr>
                    <td :style="{ textAlign: 'center' }">{{ type.id }}</td>
                    <td>{{ type.name }}</td>
                    <td>{{ new Date(Date.parse(type.createdAt)).toLocaleString() }}</td>
                    <td>{{ new Date(Date.parse(type.updatedAt)).toLocaleString() }}</td>
                    <td>
                        <i class="fas fa-pen" @click="handleUpdateType(type)"></i>
                        <i class="fas fa-trash-alt" @click="handleDeleteType(type.id)"></i>
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
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue";
import InputVue from "@/customs/Input/Input.vue";
import LoadingSmallVue from "@/customs/LoadingSmall/LoadingSmall.vue";
import PaginationVue from "@/customs/Pagination/Pagination.vue";
import { ACTIONS } from "@/utils/constants";
import { getAllTypeAPI, createTypeAPI, updateTypeAPI, deleteTypeAPI } from "@/api/apiServices";

export default {
    components: {
        ButtonVue,
        InputVue,
        LoadingSmallVue,
        PaginationVue,

    },
    data() {
        return {
            types: [],
            info: {
                id: '',
                name: '',
                action: ACTIONS.CREATE
            },
            isLoading: true,
            currentPage: 1,
            totalPage: 1,
            pageSize: 5,
            ACTIONS,

        }
    },
    created() {
        this.getAllTypes(this.currentPage, this.pageSize);
    },
    methods: {
        async getAllTypes(currentPage, pageSize) {
            try {
                let response = await getAllTypeAPI(currentPage, pageSize);
                if (response.errCode === 0) {
                    this.types = response.types;
                    this.totalPage = Math.ceil(response.count / pageSize);
                    this.isLoading = false;
                } else {
                    this.types = [];
                    this.isLoading = true;
                }
            } catch (e) {
                this.isLoading = true;
                this.types = []
            }
        },
        async handleSubmit() {
            const data = this.info;
            if (this.info.action === ACTIONS.CREATE) {
                let resCreate = await createTypeAPI(data);
                if (resCreate.errCode === 0) {
                    alert('Success!');
                    this.types = [...this.types, resCreate.types];
                } else {
                    alert(resCreate.errMessage);
                }
            }
            if (this.info.action === ACTIONS.UPDATE) {
                let resUpdate = await updateTypeAPI(data);
                if (resUpdate.errCode === 0) {
                    alert("Success!");
                    this.types =
                        this.types.map(type => {
                            return type.id === id ? resUpdate.type : type
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
        handleUpdateType(type) {
            this.info.action = ACTIONS.UPDATE;
            this.info.id = type.id;
            this.info.name = type.name;
        },
        async handleDeleteType(id) {
            let response = await deleteTypeAPI(id);
            if (response.errCode === 0) {
                alert('Success!')
            } else {
                alert(response.errMessage);
            }
            this.types = this.types.filter(type => type.id !== id);
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
            this.getAllTypes(newValue, this.pageSize)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";
.router-link-active {
    color: rgb(207, 154, 56) !important;
}
</style>