import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPanel from '../components/LoginPanel/LoginPanel.vue'
import AddingPatient from '../components/Forms/Patient/AddingPatient.vue'
import PatientList from '../components/ListComponents/PatientList.vue'
import UsersList from '../components/ListComponents/UsersList.vue'
import AdminAddingHospital from '../components/Forms/Hospital/AdminAddingHospital.vue'
import AddingUser from '../components/Forms/Users/AddingUser.vue'
import WardManagmentView from '../views/WardManagmentView.vue'
import UserEditing from '../components/Forms/Users/UserEditing.vue'
import AdminHospitalEditing from '../components/Forms/Hospital/AdminHospitalEditing.vue'
import EditingPatient from '../components/Forms/Patient/EditingPatient.vue'
import PatientDetails from '../components/ListComponents/PatientDetails.vue'
import HospitalList from '../components/ListComponents/HospitalList.vue';
import AboutPage from '../views/AboutPage.vue';


const routes = [
    {
        path: '/hospitals',
        name: 'hospitals',
        component: HospitalList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/adding-hospital',
        name: 'AdminAddingHospital',
        component: AdminAddingHospital,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/edit-hospital/:id',
        name: 'AdminHospitalEditing',
        component: AdminHospitalEditing,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ward-management/:id',
        name: 'AdminWardManagement',
        component: WardManagmentView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users',
        name: 'Users',
        component: UsersList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/adding-user',
        name: 'AddingUser',
        component: AddingUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user-editing/:id',
        name: 'UserEditing',
        component: UserEditing,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/adding-patient',
        name: 'AddingPatient',
        component: AddingPatient,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/editing-patient/:id',
        name: 'EditingPatient',
        component: EditingPatient,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/patients',
        name: 'PatientList',
        component: PatientList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/patient-details/:id',
        name: 'PatientDetails',
        component: PatientDetails,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/archived-patients/',
        name: 'ArchiveList',
        component: PatientList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'LoginPanel',
        component: LoginPanel
    },
    {
        path: '/about',
        name: 'about',
        component: AboutPage,
        meta: {
            requiresAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router