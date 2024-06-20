<template>
    <v-app>
        <v-main class="bg-blue-grey-lighten-5">
            <div>
                <v-img class="mx-auto my-6 " max-width="100px"
                    src="../assets/Emblem_of_the_Ministry_of_Education,_Youth_and_Sport_(Cambodia).svg.png"></v-img>
                <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                    <h3 class="text-center">ចូលគណនី</h3>
                    <div class="text-subtitle-1 text-medium-emphasis"> <span class="font-custom">អាខោន</span> </div>
                    <v-text-field v-model="email" density="compact" placeholder="អុីមេល"
                        prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>
                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between ">
                        <span class="font-custom">ពាក្យសម្ងាត់</span>
                        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                            target="_blank"><span class="font-custom">ភ្លេចពាក្យសម្ងាត់?</span> </a>
                    </div>
                    <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" density="compact" placeholder="បញ្ចូលពាក្យសម្ងាត់ ៨ ខ្ទង់"
                        class="border-0" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        @click:append-inner="visible = !visible"></v-text-field>


                    <v-text-field v-model="repassword" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'repassword'" density="compact"
                        placeholder="បញ្ចូលពាក្យសម្ងាត់ ៨ ខ្ទង់ម្តងទៀត" class="border-0"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        @click:append-inner="visible = !visible"></v-text-field>

                    <v-card class="mb-12" color="surface-variant" variant="tonal">
                        <v-card-text class="text-medium-emphasis text-caption font-custom">
                            <span class="font-custom">
                                ចំណាំ ៖ ប្រសិនបើមានការចូលគណនីខុសចាប់ពី ៥ ដងឡើងទៅប្រព័ន្ធនិងធ្វើការចាក់សោរយៈពេល ១
                                ម៉ោងក្រោយការចូលគណនី
                                password.
                            </span>
                        </v-card-text>
                    </v-card>
                    <v-btn class="mb-8" color="blue" size="large" variant="tonal" block target="../authe/Login">
                        ចូលគណនី
                    </v-btn>
                    <v-card-text class="text-center">
                        <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                            ចុះឈ្មោះថ្មី <v-icon icon="mdi-chevron-right"></v-icon>
                        </a>
                    </v-card-text>
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
            // Hardcoded credentials for testing
            correctEmail: 'rafat',
            correctPassword: '123',
        };
    },
    methods: {
        attemptLogin() {
            if (this.email === this.correctEmail && this.password === this.correctPassword) {
                // Successful login
                localStorage.setItem('authenticated', 'true');
                this.$router.push({ name: 'Dashboard' });
                Swal.fire({
                    icon: 'success',
                    title: 'ចូលគណនីបានជោគជ័យ',
                    text: 'សូមស្វាគមន៍ម្ដងទៀត!',
                });
            } else {
                // Failed login
                Swal.fire({
                    icon: 'error',
                    title: 'ចូលគណនីបានបរាជ័យ',
                    text: 'អំពីអាសយដ្ឋានអ៊ីមែល ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ!',
                });
            }
        },
    },
};
</script>

<style>
* {
    font-family: khmer os siemreap;
}

.font-custom {
    font-family: khmer os siemreap;
}
</style>
