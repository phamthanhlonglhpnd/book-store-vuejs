import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/store/store';

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: () => import ('../components/home/HomePage.vue')
  },
  {
    path: '/book/:name/:id',
    name: 'book',
    component: () => import ('../components/home/BookDetail/BookDetail.vue')
  },
  {
    path: '/search/keyword=:keyword',
    name: 'search',
    component: () => import ('../components/home/SearchResult/SearchResult.vue')
  },
  {
    path: '/author/:name/:id',
    name: 'author',
    component: () => import ('../components/home/AuthorDetail/AuthorDetail.vue')
  },
  {
    path: '/type/:name/:id',
    name: 'type',
    component: () => import ('../components/home/Type/Type.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../components/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import ('../components/auth/Register.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import ('../components/auth/ForgotPassword.vue')
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import ('../components/auth/ChangePassword.vue')
  },
  {
    path: '/user/my-cart',
    name: 'user-cart',
    component: () => import ('../components/user/Cart/Cart.vue'),
  },
  {
    path: '/user/checkout',
    name: 'user-checkout',
    props: true,
    component: () => import ('../components/user/Checkout/Checkout.vue'),
  },
  {
    path: '/system',
    name: 'system',
    component: () => import ('../customs/System/System.vue'),
    meta:{
      requiresAuth: true,
    },
    children: [
      {
        path: 'start',
        name: 'start',
        component: () => import('../components/share/Start/Start.vue'),
      },
      // Admin
      {
        path: 'admin/manage-books',
        name: 'manage-books',
        component: () => import ('../components/admin/ManageBooks.vue'),
      },
      {
        path: 'admin/manage-users',
        name: 'manage-users',
        component: () => import ('../components/admin/ManageUsers.vue'),
      },
      {
        path: 'admin/manage-comments',
        name: 'manage-comments',
        component: () => import ('../components/admin/ManageComments.vue'),
      },
      {
        path: 'admin/manage-orders',
        name: 'manage-orders',
        component: () => import ('../components/admin/ManageOrders.vue'),
      }, 
      {
        path: 'admin/manage-handbooks',
        name: 'manage-handbooks',
        component: () => import ('../components/admin/ManageHandbooks.vue'),
      }, 
      {
        path: 'admin/manage-stores',
        name: 'manage-stores',
        component: () => import ('../components/admin/ManageStores.vue'),
      }, 
      {
        path: 'admin/manage-authors',
        name: 'manage-authors',
        component: () => import ('../components/admin/ManageAuthors.vue'),
      },
      {
        path: 'admin/manage-publishers',
        name: 'manage-publishers',
        component: () => import ('../components/admin/ManagePublishers.vue'),
      }, 
      {
        path: 'admin/manage-languages',
        name: 'manage-languages',
        component: () => import ('../components/admin/ManageLanguage.vue'),
      },
      {
        path: 'admin/manage-type-of-handbook',
        name: 'manage-type-of-handbook',
        component: () => import ('../components/admin/ManageTypeOfHandbook.vue'),
      },
      {
        path: 'manage-account',
        name: 'manage-account',
        component: () => import ('../components/share/ManageAccount/ManageAccount.vue'),
      },
      // Employee
      {
        path: 'employee/manage-orders',
        name: 'employee-order',
        component: () => import ('../components/employee/EmployeeOrders.vue'),
      },
      {
        path: 'employee/manage-comments',
        name: 'employee-comments',
        component: () => import ('../components/employee/EmployeeComments.vue'),
      },
      {
        path: 'employee/manage-discounts',
        name: 'employee-discount',
        component: () => import ('../components/employee/EmployeeDiscounts.vue'),
      },
      // User
      {
        path: 'user/my-account',
        name: 'user-account',
        component: () => import ('../components/user/Account/Account.vue'),
      },
      {
        path: 'user/my-payment',
        name: 'user-payment',
        component: () => import ('../components/user/Payment/Payment.vue'),
      },
      {
        path: 'user/my-address',
        name: 'user-address',
        component: () => import ('../components/user/Address/Address.vue'),
      },
      {
        path: 'user/change-password',
        name: 'user-change-password',
        component: () => import ('../components/user/ChangePassword/ChangePassword.vue'),
      },
      {
        path: 'user/my-orders',
        name: 'user-orders',
        component: () => import ('../components/user/Orders/Orders.vue'),
      },
      {
        path: 'user/my-wishlist',
        name: 'user-wishlist',
        component: () => import ('../components/user/Comments/Comments.vue'),
      },
      {
        path: 'user/my-comments',
        name: 'user-comments',
        component: () => import ('../components/user/Wishlist/Wishlist.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise((resolve)=>{
      setTimeout(()=> resolve({ top:0 }), 300)
    })
  }
})

export default router
