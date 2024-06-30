<template>
    <v-app>
        <v-main>
            <v-progress-linear v-if="loading" color="primary" indeterminate absolute top
                width="100%"></v-progress-linear>
            <div class="mx-3 my-3">
                <v-chip prepend-icon="mdi-circle" color="success">{{ $t('navigation.library') }}</v-chip>
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
                        <v-tab v-for="(item, index) in tabsContent" :key="index" :value="index">
                            {{ item.title }}
                        </v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item v-for="(item, index) in tabsContent" :key="index" :value="index">
                            <v-card>
                                <v-card-title>{{ item.trending }}</v-card-title>
                                <v-card-text v-if="tab === index">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="card-title">
                                                <v-chip>{{ item.trending }}</v-chip>
                                                <div class="row gap-2 my-3 mx-2">
                                                    <div class="card col" v-for="(card, cardIndex) in item.cards"
                                                        :key="cardIndex">
                                                        <div class="card-body">
                                                            <div class="card-title">
                                                                <div class="d-flex justify-content-end mb-3 gap-3">
                                                                    <v-icon icon="mdi-printer" color="green"></v-icon>
                                                                    <v-icon icon="mdi-share-all" color="blue"></v-icon>
                                                                    <v-icon icon="mdi-dots-horizontal"
                                                                        color="blue"></v-icon>
                                                                </div>
                                                                <div class="book-center mb-4">
                                                                    <img :src="card.image" class="w-100" alt="" />
                                                                </div>
                                                                <div>
                                                                    <h5>សៀវភៅ ៖ {{ card.bookTitle }}</h5>
                                                                    <h5>ថ្នាក់ទី ៖ {{ card.grade }}</h5>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-card-text>
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
const tab = ref(0);
const tabsContent = ref([]);


onMounted(() => {
    // Simulate loading for a few seconds and fetch tabs content (replace with actual API call)
    loading.value = true;
    setTimeout(() => {
        tabsContent.value = [
            {
                title: 'ថ្នាក់ទី ៧',
                trending: 'សៀវភៅពុម្ព',
                cards: [
                    { bookTitle: 'គណិតវិទ្យា', grade: '7', image: './Book/math-7.jpg' },
                    { bookTitle: 'ភាសាខ្មែរ', grade: '7', image: './Book/math-7.jpg' },
                    { bookTitle: 'ប្រវត្តិ', grade: '7', image: './Book/math-7.jpg' },
                    { bookTitle: 'រូប', grade: '7', image: './Book/math-8.jpg' },
                ],


            },
            {
                title: 'ថ្នាក់ទី ៨',
                trending: 'សៀវភៅពុម្ព',
                cards: [
                    { bookTitle: 'ប្រវត្តិវិទ្យា', grade: '8', image: './Book/history-7.jpg' },
                    { bookTitle: 'ប្រវត្តិវិទ្យា', grade: '8', image: './Book/history-7.jpg' },
                    { bookTitle: 'ប្រវត្តិវិទ្យា', grade: '8', image: './Book/history-7.jpg' },
                    { bookTitle: 'ប្រវត្តិវិទ្យា', grade: '8', image: './Book/history-8.jpg' },
                ],
            },
            {
                title: 'ថ្នាក់ទី ៩',
                trending: 'សៀវភៅពុម្ព',
                cards: [
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '9', image: './Book/english-7.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '9', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '9', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '9', image: './Book/english-8.jpg' },

                ],
            },
            {
                title: 'ថ្នាក់ទី ១០',
                trending: 'សៀវភៅពុម្ព',
                cards: [
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '10', image: './Book/english-7.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '10', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '10', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '10', image: './Book/english-8.jpg' },
                ],
            },
            {
                title: 'ថ្នាក់ទី ១១',
                trending: 'សៀវភៅពុម្ព',
                cards: [
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '11', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '11', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '11', image: './Book/english-7.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '11', image: './Book/english-8.jpg' },
                ],
            },
            {
                title: 'ថ្នាក់ទី ១២',
                trending: 'សៀវភៅពុម្ព',
                cards: [
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '12', image: './Book/english-7.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '12', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '12', image: './Book/english-8.jpg' },
                    { bookTitle: 'ភាសាអង់គ្លេស', grade: '12', image: './Book/english-8.jpg' },
                ],
            },

        ];
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