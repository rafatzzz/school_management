// src/i18n.js
import { createI18n } from 'vue-i18n';

// Translation messages
const messages = {
    en: {
        navigation: {
            other_infor: 'other information',
            office_edu: 'Office of EDU',
            dashboard: 'Dashboard',
            teacher: 'Teacher',
            student: 'Student',
            class: 'Class / Room',
            subject: 'Subject',
            library: 'Library',
            planProject: 'Plan Project',
            setting: 'Setting',
        },
        footer: 'All rights reserved: @Rafat',
        logoutDialog: 'If you log out, you will no longer be able to see information on these pages',
        reject: 'Reject',
        save: 'Save',
    },
    kh: {
        navigation: {
            other_infor: 'ពត៌មានផ្សេងៗ',
            office_edu: 'ការិយាល័យសិក្សា',
            dashboard: 'ពត៌មានជាប្រចាំ',
            teacher: 'គ្រូបង្រៀន',
            student: 'សិស្ស',
            class: 'បន្ទប់ / ថ្នាក់រៀន',
            subject: 'មុខវិជ្ជា',
            library: 'បណ្ណាល័យ',
            planProject: 'គម្រោងផែនការ',
            setting: 'ការកំណត់',
        },
        footer: 'រក្សាសិទ្ធិដោយ ៖ @សោម រ៉ហ្វាត់',
        logoutDialog: 'ប្រសិនបើអ្នកចាកចេញអ្នកនិងពុំអាចឃើញនូវត៌មានអំពីទំព័រទាំងនេះទៀតទេ',
        reject: 'បដិសេធ',
        save: 'រក្សាទុក',
    }
};

const i18n = createI18n({
    locale: 'kh', // default locale
    messages,
});

export default i18n;
