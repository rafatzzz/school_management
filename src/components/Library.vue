<template>
    <v-app>
        <v-main>
            <v-progress-linear v-if="loading" color="primary" indeterminate absolute top
                width="100%"></v-progress-linear>
            <div class="mx-3 my-3">
                <v-chip prepend-icon="mdi-circle" text="បណ្ណាល័យ" color="success"></v-chip>
            </div>

            <div class="row my-4 mx-3 gap-2" v-if="!loading">
                <div class="card col shadow-sm bg-blue-darken-1">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <v-chip color="white" class="custom-font mb-3">ចំនួនអ្នកខ្ចីប្រើប្រាស់</v-chip>
                                <h3 class="mx-5 mb-4">{{ bookBorrowed }}</h3>
                            </div>
                            <div class="col">
                                <v-icon icon="mdi-card-account-details-outline" color="blue-grey-lighten-4"
                                    class="icon-size"></v-icon>
                            </div>
                        </div>
                        <footer class="blockquote-footer col text-end my-2 mx-4 text-white">គិតចាប់ពីឆ្នាំ <cite
                                title="Source Title">២០២៣</cite></footer>
                    </div>
                </div>

                <div class="card col shadow-sm bg-indigo-darken-1">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <v-chip color="white" class="custom-font mb-3">ចំនួនសៀវភៅនៅសល់</v-chip>
                                <h3 class="mx-5 mb-4">{{ bookBorrowed }}</h3>
                            </div>
                            <div class="col">
                                <v-icon icon="mdi-book-open-page-variant-outline" color="blue-grey-lighten-4"
                                    class="icon-size"></v-icon>
                            </div>
                        </div>
                        <footer class="blockquote-footer col text-end my-2 mx-4 text-white">គិតចាប់ពីឆ្នាំ <cite
                                title="Source Title">២០២៣</cite></footer>
                    </div>
                </div>

                <div class="card col shadow-sm bg-teal-darken-1">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <v-chip color="white" class="custom-font mb-3">ចំនួនបុគ្គលិកគ្រប់គ្រង</v-chip>
                                <h3 class="mx-5 mb-4">{{ bookBorrowed }}</h3>
                            </div>
                            <div class="col">
                                <v-icon icon="mdi-account-clock-outline" color="blue-grey-lighten-4"
                                    class="icon-size"></v-icon>
                            </div>
                        </div>
                        <footer class="blockquote-footer col text-end my-2 mx-4 text-white">គិតចាប់ពីឆ្នាំ <cite
                                title="Source Title">២០២៣</cite></footer>
                    </div>
                </div>

                <div class="card col shadow-sm bg-green-darken-2">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <v-chip color="white" class="custom-font mb-3">សៀវភៅដែលខូចខាត</v-chip>
                                <h3 class="mx-5 mb-4">{{ bookBorrowed }}</h3>
                            </div>
                            <div class="col">
                                <v-icon icon="mdi-alert-circle-outline" color="blue-grey-lighten-4"
                                    class="icon-size"></v-icon>
                            </div>
                        </div>
                        <footer class="blockquote-footer col text-end my-2 mx-4 text-white">គិតចាប់ពីឆ្នាំ <cite
                                title="Source Title">២០២៣</cite></footer>
                    </div>
                </div>
            </div>

            <v-layout v-if="!loading" class="mx-3">
                <v-card class="w-100">
                    <v-tabs v-model="tab">
                        <v-tab v-for="num in 4" :key="num" :value="num">Tab {{ num }}</v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item v-for="num in 4" :key="num" :value="num">
                            <v-card>
                                <v-card-title>Card {{ num }}</v-card-title>
                                <v-card-text v-if="tab === num">Hello {{ num }}</v-card-text>
                            </v-card>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-layout>
        </v-main>
    </v-app>

</template>

<script setup>
import { ref, onMounted } from "vue";

const loading = ref(true);
const bookBorrowed = ref(30);
const tab = ref(1);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});
</script>




<style>
.icon-size {
    font-size: 100px !important;
    text-align: end;
}

.custom-font {
    font-family: khmer os moul;
    font-size: 15px;
}

.card {
    background-color: #f8f9fa;
    border: none;
    transition: transform 0.3s ease;
    cursor: pointer
}

.card:hover {
    transform: translateY(-5px);
}
</style>