<template>
    <v-app :class="theme">
        <!-- Navigation Drawer -->
        <v-navigation-drawer v-model="drawer" :width="260" :rail="rail" permanent class="shadow-sm bg-primary"
            @click="rail = false">
            <v-list-item>
                <div>
                    <img src="../Layout/ministrylogo.png" class="w-50 d-block ml-auto mr-auto py-3" alt="">
                    <h6 class="text-center">វិទ្យាល័យសម្តេចឪ</h6>
                </div>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Navigation Links -->
            <v-list>
                <v-list-item to="/Dashboard" prepend-icon="mdi-view-dashboard" v-tooltip:end="'ពត៌មានជាប្រចាំ'">{{
                    $t('navigation.dashboard') }}</v-list-item>
                <!-- Nested Items -->
                <v-list-group>
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-school"
                            v-tooltip:end="'កន្លែងគ្រប់គ្រងការសិក្សា'">{{ $t('navigation.office_edu') }}</v-list-item>
                    </template>
                    <v-list-item link to="/Teacher" prepend-icon="mdi-plus" v-tooltip:end="'ពត៌មានគ្រូបង្រៀន'">
                        <v-list-item-title class="fs-16">{{ $t('navigation.teacher') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/Student" prepend-icon="mdi-plus" v-tooltip:end="'ពត៌មានសិស្ស'">
                        <v-list-item-title>{{ $t('navigation.student') }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item link to="/Class" prepend-icon="mdi-plus" v-tooltip:end="'ពត៌មានបន្ទប់'">
                        <v-list-item-title>{{ $t('navigation.class') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/Subject" prepend-icon="mdi-plus" v-tooltip:end="'ពត៌មានមុខវិជ្ជា'">
                        <v-list-item-title>{{ $t('navigation.subject') }}</v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <!-- Non-Nested Items -->
                <v-list-item to="/Library" prepend-icon="mdi-book" v-tooltip:end="'ការគ្រប់គ្រងសៀវភៅ'">{{
                    $t('navigation.library')
                    }}</v-list-item>
                <v-list-item to="/Plan_project" prepend-icon="mdi-calendar-check-outline"
                    v-tooltip:end="'ការគ្រប់គ្រងគម្រោង'">{{
                        $t('navigation.planProject') }}</v-list-item>
                <v-list-item to="/Setting" prepend-icon="mdi-cog" v-tooltip:end="'ការកំណត់របស់អ្នកប្រើប្រាស់'">{{
                    $t('navigation.setting') }}</v-list-item>
            </v-list>
            <!-- Footer Information -->
            <v-divider></v-divider>
            <v-list>
                <v-list-item class="text-grey-lighten-3">{{ $t('footer') }}</v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Application Bar -->
        <v-app-bar color="white" prominent class="shadow-sm">
            <v-toolbar-title>
                <h3 class="font-title py-3 fs-5">ប្រព័ន្ធគ្រប់គ្រងទិន្ន័យសាលា</h3>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- Theme Toggle Button -->



            <!-- Seatch -->
            <v-card-title class="d-flex align-center pe-2 w-25">
                <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line></v-text-field>
            </v-card-title>

            <!-- Language Menu -->
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" icon="mdi-translate"></v-btn>
                </template>
                <v-list>
                    <v-list-item @click="changeLocale('kh')" class="list-item">
                        <v-row align="center">
                            <v-col cols="auto">
                                <v-icon>mdi-web</v-icon>
                            </v-col>
                            <v-col>
                                <v-list-item-title>Khmer</v-list-item-title>
                            </v-col>
                        </v-row>
                    </v-list-item>
                    <v-list-item @click="changeLocale('en')" class="list-item">
                        <v-row align="center">
                            <v-col cols="auto">
                                <v-icon>mdi-web</v-icon>
                            </v-col>
                            <v-col>
                                <v-list-item-title>English</v-list-item-title>
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-list>
            </v-menu>
            <!-- Notification and User Icons -->
            <v-btn icon>
                <v-badge color="error" content="10">
                    <v-icon class="fs-4">mdi-bell-outline</v-icon>
                </v-badge>
            </v-btn>
            <v-menu v-model="menu" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-icon class="fs-3">mdi-account-circle-outline</v-icon>
                    </v-btn>
                </template>
                <v-card min-width="300">
                    <v-list>
                        <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" subtitle="Admin"
                            title="Rafatz">
                            <template v-slot:append>
                                <v-btn :class="fav ? 'text-red' : ''" icon="mdi-heart" variant="text"
                                    @click="fav = !fav"></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list-item to="/Account" prepend-icon="mdi-account-outline">អាខោន</v-list-item>
                    <v-list-item to="/Switch" prepend-icon="mdi-account-switch-outline"
                        class="my-2">ប្តូរអាខោន</v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/Setting" prepend-icon="mdi-cog-outline" class="my-2">ការកំណត់</v-list-item>
                    <v-list-item prepend-icon="mdi-exit-to-app" class="my-2" @click="dialog = true">ចាកចេញ</v-list-item>
                    <v-divider></v-divider>

                </v-card>
            </v-menu>

            <!-- Logout Dialog -->
            <v-dialog v-model="dialog" width="auto">
                <v-card max-width="400" class="bg-white p-2" prepend-icon="mdi-update" append-icon="mdi-window-close">
                    <v-divider></v-divider>
                    <p class="mx-3">ប្រសិនបើអ្នកចាកចេញអ្នកនិងពុំអាចឃើញនូវត៌មានអំពីទំព័រទាំងនេះទៀតទេ</p>
                    <v-divider></v-divider>
                    <template v-slot:actions>
                        <v-btn color="white" class="bg-primary" text="បដិសេធ"
                            @click="handleLogoutDialog(false)"></v-btn>
                        <v-btn color="white" class="bg-danger" text="យល់ព្រម" @click="handleLogoutDialog(true)"></v-btn>
                    </template>
                </v-card>
            </v-dialog>
        </v-app-bar>

        <!-- Main Content Area -->
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'Layout',
    data() {
        return {
            fav: true,
            menu: false,
            message: false,
            hints: true,
            drawer: true,
            rail: false,
            dialog: false,
            search: '',
        };
    },
    methods: {
        changeLocale(locale) {
            this.$i18n.locale = locale;
        },
        handleLogoutDialog(confirm) {
            if (confirm) {
                localStorage.removeItem('authenticated');
                this.$router.push('/Login');
            }
            this.dialog = false;
        },
    },
});
</script>

<style scoped>
/* Ensure the drawer is fixed and main content area is scrollable */
.v-navigation-drawer {
    position: fixed !important;
    z-index: 1000;
    height: 100%;
}

.v-app-bar {
    z-index: 1100;
}

.v-main {
    margin-left: 235px;
    padding-top: 64px;
    padding-right: 0px;
    padding-left: 24px;
    overflow-y: auto;
}

.font-title {
    font-family: khmer os moul;
}

/* Light and Dark Theme Styles */
.light {
    background-color: white;
    color: black;
}

.dark {
    background-color: black;
    color: white;
}

.v-btn {
    color: inherit;
}
</style>