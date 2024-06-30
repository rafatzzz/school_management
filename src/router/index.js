// Import the necessary modules from Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Import the components for routing
import Login from '../authe/Login.vue'
import Layout from '../components/Layout/Layout.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue';
import Teacher from '../components/office_edu/teacher/Teacher.vue';
import Student from '../components/office_edu/Student.vue';
import Setting from '../components/Setting.vue';
import Plan_project from '../components/planProject/Plan_project.vue';
import Class from '../components/office_edu/Class.vue';
import Subject from '../components/office_edu/Subject.vue';
import Library from '../components/Library/Library.vue';



const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};


// Define your routes explicitly for the Login page and other pages
const routes = [
  { path: '/', redirect: '/Login' },
  { path: '/Login', component: Login, name: 'Login' },
  { path: '/Layout', component: Layout, name: 'Layout' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true }, },
  { path: '/Teacher', component: Teacher, name: 'Teacher' },
  { path: '/Student', component: Student, name: 'Student' },
  { path: '/Setting', component: Setting, name: 'Setting' },
  { path: '/Plan_project', component: Plan_project, name: 'PlanProject' },
  { path: '/Class', component: Class, name: 'Class' },
  { path: '/Subject', component: Subject, name: 'Subject' },
  { path: '/Library', component: Library, name: 'Library' },



];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protect routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login', });
  } else {
    next();
  }
});


export default router;
