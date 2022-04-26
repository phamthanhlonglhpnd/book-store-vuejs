<template>
    <div class="address">
        <div class="title">Manage Address</div>
        <div class="contet">
            <div class="address-top">
                <span class="address-title">My address</span>
                <ButtonVue
                    text="+ Add new address"
                    backgroundColor="#FC5931"
                    :onClick="createAddress"
                />
            </div>

            <div class="address-bottom">
                <div class="address-select">
                    <div class="address-title">Province</div>
                    <v-select :options="provinces" v-model="address.provinceID" />
                </div>
                <div class="address-select">
                    <div class="address-title">District</div>
                    <v-select :options="districts" v-model="address.districtID" />
                </div>
                <div class="address-select">
                    <div class="address-title">Ward</div>
                    <v-select :options="wards" v-model="address.wardID" />
                </div>
                <div class="address-select">
                    <div class="address-title">Street</div>
                    <div class="address-box">
                        <input type="text" class="address-input" v-model="address.street" />
                    </div>
                </div>
                <div class="address-select">
                    <div class="address-title">Set Default</div>
                    <div class="address-box">
                        <input type="radio" />
                        <label for="contactChoice1">True</label>

                        <input type="radio" />
                        <label for="contactChoice2">Fasle</label>
                    </div>
                </div>
            </div>
            <template v-for="address in allAddress" :key="address.id">
                <div class="content">
                    <div class="address-item">
                        <div>
                            <div>Name: {{ getName }}</div>
                            <div>Phone: {{ getPhone }}</div>
                            <div>Address: {{ address.street }}, {{ address.ward }}, {{ address.district }}, {{ address.province }}</div>
                        </div>

                        <div
                            :style="{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }"
                        >
                            <ButtonVue text="Delete" backgroundColor="#C2ABA3" />
                            <ButtonVue text="Set up default" backgroundColor="#C2ABA3" />
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import ButtonVue from "@/customs/Button/Button.vue";
import InputVue from "@/customs/Input/Input.vue";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import axios from "axios";
import { createAddressAPI, getAllAddressAPI, deleteAddressAPI } from "@/api/apiServices";
const base_URL = 'https://vapi.vnappmob.com/api/province';

export default {
    components: {
        ButtonVue,
        InputVue,
        "v-select": vSelect,
    },
    data() {
        return {
            base_URL,
            provinces: [],
            districts: [],
            wards: [],
            address: {
                provinceID: '',
                districtID: '',
                wardID: '',
                street: '',
                checked: true
            },
            allAddress: [],
        }
    },
    async created() {
        await this.getProvinces();
        await this.getALlAddress();
    },
    methods: {
        async getProvinces() {
            try {
                let response = await axios.get(base_URL);
                if (response.status === 200) {
                    this.provinces = response.data.results.map(item => {
                        let newObject = {};
                        newObject.id = item.province_id;
                        newObject.label = item.province_name;
                        return newObject;
                    })
                } else {
                    this.provinces = []
                }
            } catch (e) {
                alert(e);
            }
        },
        async getDistricts(provinceID) {
            try {
                let response = await axios.get(`${base_URL}/district/${provinceID}`);
                if (response.status === 200) {
                    this.districts = response.data.results.map(item => {
                        let newObject = {};
                        newObject.id = item.district_id;
                        newObject.label = item.district_name;
                        return newObject;
                    })
                }
            } catch (e) {
                alert(e);
            }
        },
        async getWards(districtID) {
            try {
                let response = await axios.get(`${base_URL}/ward/${districtID}`);
                if (response.status === 200) {
                    this.wards = response.data.results.map(item => {
                        let newObject = {};
                        newObject.id = item.ward_id;
                        newObject.label = item.ward_name;
                        return newObject;
                    })
                }
            } catch (e) {
                alert(e);
            }
        },
        async createAddress() {
            try {
                let userID = JSON.parse(localStorage.getItem('userInfor')).id;
                let province = this.address.provinceID.label;
                let district = this.address.districtID.label;
                let ward = this.address.wardID.label;
                let street = this.address.street;

                const data = {
                    userID,
                    province,
                    district,
                    ward,
                    street,
                }
                let response = await createAddressAPI(data);
                if (response.errCode === 0) {
                    await this.getALlAddress();
                }
            } catch (e) {
                alert(e);
            }
            this.address = {
                provinceID: '',
                districtID: '',
                wardID: '',
                street: '',
            }
        },
        async getALlAddress() {
            try {
                let userID = JSON.parse(localStorage.getItem('userInfor')).id;
                let response = await getAllAddressAPI(userID);
                if (response.errCode === 0) {
                    this.allAddress = response.address;
                } else {
                    this.allAddress = []
                }
            } catch (e) {
                alert(e);
            }
        }
    },
    watch: {
        address: {
            handler(newValue, oldValue) {
                this.getDistricts(newValue.provinceID.id);
                this.getWards(newValue.districtID.id)
            },
            deep: true,
        }
    },
    computed: {
        getName() {
            return JSON.parse(localStorage.getItem('userInfor')).name;
        },
        getPhone() {
            return JSON.parse(localStorage.getItem('userInfor')).phone;
        }
    }
}
</script>

<style lang="scss" scoped>
/* @import "../../../styles/base"; */
@import "Address.scss";
</style>