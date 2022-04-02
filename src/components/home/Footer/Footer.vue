<template>
    <div>
        <div class="footer">
            <div class="footer-top">
                <div class="footer-top-container">
                    <div class="footer-top-left">
                        <h1>Sign up for our Newsletter</h1>
                        <div>Tell us what books you love.</div>
                    </div>
                    <div class="footer-top-right">
                        <ButtonVue text="Sign Up" backgroundColor="#573BA3" />
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <div class="footer-bottom-info">
                        <div class="footer-bottom-item">
                            <h1>POLARBEAR BOOKSTORE</h1>
                            <div class="footer-bottom-icon">
                                <span>Follow us:</span>
                                <i class="fab fa-twitter"></i>
                                <i class="fab fa-facebook"></i>
                                <i class="fab fa-instagram"></i>
                            </div>
                            <div>
                                <span>Payments Accepted: American Express, Discover, Mastercard and Visa</span>
                            </div>
                        </div>
                        <div class="footer-bottom-item">
                            <div class="footer-bottom-list">About</div>
                            <div class="footer-bottom-list">Support/Help</div>
                            <div class="footer-bottom-list">Become a Affiliate</div>
                            <div class="footer-bottom-list">Gift Cards</div>
                            <div class="footer-bottom-list">Bookshop for Authors</div>
                            <div class="footer-bottom-list">Bookshop for Bookstores</div>
                            <div class="footer-bottom-list">Contact</div>
                            <div class="footer-bottom-list">Return and Refund Policy</div>
                        </div>
                        <div class="footer-bottom-item">
                            <span :style="{ fontSize: '20px' }">Trustpilot</span>
                            <div>
                                <img :src="star" alt="star" class="footer-bottom-star" />
                            </div>
                            <div>
                                <img :src="neutral" alt="neutral" class="footer-bottom-neutral" />
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom-copyright">
                        <span>© 2022 All Rights Reserved</span>
                        <span>Terms of Use</span>
                        <span>Privacy Notice</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../../../assets/images/stars-5.svg';
import neutral from '../../../assets/images/neutral.png';
import ButtonVue from '@/customs/Button/Button.vue';

export default {
    components: {
        ButtonVue,

    },
    data() {
        return {
            star, neutral
        }
    }
}
</script>

<style lang="scss" scoped>
@import "Footer.scss";
</style>