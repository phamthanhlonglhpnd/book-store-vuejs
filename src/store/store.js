// store.js
import { reactive } from 'vue'
import { getAllAuthorsAPI, loginAPI, logoutAPI, getAllPublishersAPI, getAllLanguagesAPI, getAllTypeAPI } from '@/api/apiServices';

export const store = reactive({
    isLoggin: false,
    userInfor: {},
    async login({email, password}) {
        try {
            let response = await loginAPI({email, password});
            if(response.errCode === 0) {
                this.isLoggin = true;
                localStorage.setItem('isLoggin', JSON.stringify(this.isLoggin));
                const { id, email, name, phone, roleID, Zipcodes } = response.userData;
                this.userInfor = { id, email, name, phone, roleID, Zipcodes };
                localStorage.setItem('userInfor', JSON.stringify(this.userInfor));
            } else {
                this.isLoggin = false;
                this.userInfor = {};
            }
            return response;
        } catch(e) {
            this.isLoggin = false;
            this.userInfor = {};
            return e;
        }
    },
    async logout() {
        try {
            let response = await logoutAPI();
            if(response.errCode === 0) {
                this.isLoggin = false;
                this.userInfor = {};
                localStorage.removeItem('isLoggin');
                localStorage.removeItem('userInfor');
                location.reload();
            }
            return response;
        } catch(e) {
            return e;
        }
    },
    async getAllAuthors() {
        try {
            let response = await getAllAuthorsAPI();
            if(response.errCode === 0) {
                let newAuthors = response.authors && response.authors.length > 0 && response.authors.map(item => {
                    let newObject = {};
                    newObject.id = item.id;
                    newObject.label = item.name;
                    return newObject;
                });
                localStorage.setItem('authors', JSON.stringify(newAuthors))
            }
        } catch(e) {
            return e;
        }
    },
    async getAllPublishers() {
        try {
            let response = await getAllPublishersAPI();
            if(response.errCode === 0) {
                let newPublishers = response.publishers && response.publishers.length > 0 && response.publishers.map(item => {
                    let newObject = {};
                    newObject.id = item.id;
                    newObject.label = item.name;
                    return newObject;
                });
                localStorage.setItem('publishers', JSON.stringify(newPublishers))
            }
        } catch(e) {
            return e;
        }
    },
    async getAllLanguages() {
        try {
            let response = await getAllLanguagesAPI();
            if(response.errCode === 0) {
                let newLanguages = response.languages && response.languages.length > 0 && response.languages.map(item => {
                    let newObject = {};
                    newObject.id = item.id;
                    newObject.label = item.name;
                    return newObject;
                });
                localStorage.setItem('languages', JSON.stringify(newLanguages))
            }
        } catch(e) {
            return e;
        }
    },
    async getAllTypes() {
        try {
            let response = await getAllTypeAPI();
            if(response.errCode === 0) {
                let newTypes = response.types && response.types.length > 0 && response.types.map(item => {
                    let newObject = {};
                    newObject.id = item.id;
                    newObject.label = item.name;
                    return newObject;
                });
                localStorage.setItem('types', JSON.stringify(newTypes))
            }
        } catch(e) {
            return e;
        }
    }
})