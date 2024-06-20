<template>
    <v-app>
        <!-- Navigation Drawer -->
        <v-navigation-drawer v-model="drawer" :width="260" :rail="rail" permanent class="shadow-sm bg-primary"
            @click="rail = false">
            <v-list-item>
                <div>
                    <img src="../assets/Emblem_of_the_Ministry_of_Education,_Youth_and_Sport_(Cambodia).svg.png"
                        class="w-50 d-block ml-auto mr-auto py-3" alt="">
                    <h6 class="text-center">វិទ្យាល័យសម្តេចឪ</h6>
                </div>
            </v-list-item>
            <v-divider></v-divider>

            <!-- Navigation Links -->
            <v-list>
                <v-list-item to="/Dashboard" prepend-icon="mdi-view-dashboard" v-tooltip:end="'ពត៌មានជាប្រចាំ'"
                    title="ពត៌មានថ្មីៗ"></v-list-item>
                <!-- Nested Items -->
                <v-list-group>
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-school" title="ការិយាល័យសិក្សា"></v-list-item>
                    </template>
                    <v-list-item link to="/Teacher" prepend-icon="mdi-plus">
                        <v-list-item-title class="fs-16">គ្រូបង្រៀន</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/Student" prepend-icon="mdi-plus">
                        <v-list-item-title>សិស្ស</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/Parent" prepend-icon="mdi-plus">
                        <v-list-item-title>អាណាព្យាបាលសិស្ស</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/Class" prepend-icon="mdi-plus">
                        <v-list-item-title>បន្ទប់ / ថ្នាក់រៀន</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/Subject" prepend-icon="mdi-plus">
                        <v-list-item-title>មុខវិជ្ជា</v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <!-- Non-Nested Items -->
                <v-list-item to="/Library" prepend-icon="mdi-book" title="បណ្ណាល័យ"></v-list-item>
                <v-list-item to="/Plan_project" prepend-icon="mdi-calendar-check-outline"
                    title="គម្រោងផែនការ"></v-list-item>
                <v-list-item to="/Setting" prepend-icon="mdi-cog" title="ការកំណត់"></v-list-item>
            </v-list>

            <!-- Footer Information -->
            <v-divider></v-divider>
            <p class="mx-3 text-grey-lighten-3">រក្សាសិទ្ធិដោយ ៖ @សោម រ៉ហ្វាត់</p>
        </v-navigation-drawer>

        <!-- Application Bar -->
        <v-app-bar color="white" prominent class="shadow-sm">
            <v-toolbar-title>
                <h3 class="font-title py-3 fs-5">ប្រព័ន្ធគ្រប់គ្រងទិន្ន័យសាលា</h3>
            </v-toolbar-title>

            <!-- Notification and User Icons -->
            <v-btn icon class="">
                <v-badge color="error" content="10">
                    <v-icon class="fs-4">mdi-bell-outline</v-icon>
                </v-badge>
            </v-btn>


            <!--   -->
            <div class="text-center">
                <v-menu v-model="menu" :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn icon class="" v-bind="props">
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

                        <v-list-item to="/Account" prepend-icon="mdi-account-outline">
                            អាខោន
                        </v-list-item>

                        <v-list-item to="/Switch" prepend-icon="mdi-account-switch-outline" class="my-2">
                            ប្តូរអាខោន
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item to="/Setting" prepend-icon="mdi-cog-outline" class="my-2">
                            ការកំណត់
                        </v-list-item>

                        <v-list-item prepend-icon="mdi-exit-to-app" class="my-2" @click="dialog = true">
                            ចាកចេញ
                        </v-list-item>
                        <v-divider></v-divider>

                        <div class="text-end mx-3">
                            <button class="btn btn-danger mx-2">បដិសេធ</button>
                            <button class="btn btn-primary my-3">រក្សាទុក</button>
                        </div>


                    </v-card>
                </v-menu>
            </div>
            <!--  -->


            <!-- Logout Button -->
            <!-- <v-btn append-icon="mdi-logout" class="bg-danger ml-2" color="white" @click="dialog = true">
                ចាកចេញ
            </v-btn> -->

            <!-- Logout Dialog -->
            <v-dialog v-model="dialog" width="auto">
                <v-card max-width="400" class="bg-white p-2" prepend-icon="mdi-update" append-icon="mdi-window-close">
                    <v-divider></v-divider>
                    <p class="mx-3">ប្រសិនបើអ្នកចាកចេញអ្នកនិងពុំអាចឃើញនូវត៌មានអំពីទំព័រទាំងនេះទៀតទេ</p>
                    <v-divider></v-divider>

                    <!-- Logout Dialog Actions -->
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
export default {
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
        };
    },
    methods: {
        handleLogoutDialog(confirm) {
            if (confirm) {
                localStorage.removeItem('authenticated');
                this.$router.push('/Login');
            }
            this.dialog = false;
        },
    },
};
</script>

<style scoped>
/* Ensure the drawer is fixed and main content area is scrollable */
.v-navigation-drawer {
    position: fixed !important;
    z-index: 1000;
    /* Adjust z-index as needed */
    height: 100%;
}

.v-app-bar {
    z-index: 1100;
    /* Ensure the app bar is above the main content */
}

.v-main {
    margin-left: 240px;
    /* Adjust based on drawer width */
    padding-top: 64px;
    /* Adjust based on app bar height */
    /* Ensure content doesn't go under app bar */
    padding-right: 0px;
    padding-left: 24px;
    overflow-y: auto;
}

.font-title {
    font-family: khmer os moul;
}
</style>