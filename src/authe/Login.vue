<template>
    <v-app>
        <v-main class="bg-img">
            <div>
                <v-img class="mx-auto my-2 " max-width="100px" src="../assets/ministrylogo.png"></v-img>
                <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                    <h3 class="text-center font-custom-2 py-4">ចូលប្រព័ន្ធ</h3>


                    <!-- Email Input -->
                    <div class="mb-3">
                        <div class="text-subtitle-1 text-medium-emphasis my-2">
                            <span class="font-custom">អាខោន</span>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="mdi mdi-account-circle-outline"></i>
                            </span>
                            <input type="text" class="form-control shadow-none" placeholder="ឈ្មោះ" v-model="email">
                        </div>

                    </div>

                    <div class="mb-4">
                        <!-- Password Input with Toggle Button -->
                        <div class="d-flex justify-content-between my-2">
                            <span class="font-custom">ពាក្យសម្ងាត់</span>

                            <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                                target="_blank">
                                <span class="font-custom">ភ្លេចពាក្យសម្ងាត់?</span>
                            </a>

                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="mdi mdi-lock-outline"></i>
                            </span>
                            <input id="passwordInput" type="password" class="form-control shadow-none"
                                v-model="password" placeholder="ពាក្យសម្ងាត់">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" @click="togglePasswordVisibility">
                                    <i id="eyeIcon" :class="visible ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
                                </button>
                            </div>
                        </div>
                    </div>






                    <!-- Additional Information -->
                    <v-alert
                        text="ចំណាំ ៖ ប្រសិនបើមានការចូលគណនីខុសចាប់ពី ៥ ដងឡើងទៅប្រព័ន្ធនិងធ្វើការចាក់សោរយៈពេល ១ម៉ោងក្រោយការចូលគណនី password."
                        class="my-3"> </v-alert>
                    <!-- Login Button -->
                    <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="attemptLogin">
                        ចូលគណនី
                    </v-btn>


                </v-card>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            visible: false,
            correctEmail: 'admin',
            correctPassword: 'admin@123',
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.visible = !this.visible;
            const passwordField = document.getElementById('passwordInput');
            const eyeIcon = document.getElementById('eyeIcon');

            if (this.visible) {
                passwordField.type = 'text';
                eyeIcon.classList.remove('mdi-eye');
                eyeIcon.classList.add('mdi-eye-off');
            } else {
                passwordField.type = 'password';
                eyeIcon.classList.remove('mdi-eye-off');
                eyeIcon.classList.add('mdi-eye');
            }
        },

        attemptLogin() {
            if (this.email === this.correctEmail && this.password === this.correctPassword) {
                // Successful login
                localStorage.setItem('authenticated', 'true');
                this.$router.push({ name: 'Dashboard' });
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });
            } else {
                // Failed login
                Swal.fire({
                    icon: 'error',
                    title: 'ចូលគណនីបានបរាជ័យ',
                    text: 'ពាក្យសម្ងាត់ ឫ អុីមេលមិនត្រឹមត្រូវ',
                });
            }
        },
    },
};
</script>

<style scoped>
.font-custom {
    font-family: 'khmer os siemreap';
}

.font-custom-2 {
    font-family: 'Khmer os moul';
    font-size: 25px;
}

.bg-img {
    background-image: url('../assets/background-2.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>