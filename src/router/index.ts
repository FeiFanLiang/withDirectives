import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    name: "index",
    path: "/index",
    component: () => import("@/pages/index.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

router.beforeEach(async (to, from) => {

})
router.afterEach(() => {

})

export default router
