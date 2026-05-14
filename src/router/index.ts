import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/game/:id',
      name: 'game-detail',
      props: true,
      component: () => import('@/views/GameDetailView.vue'),
    },
  ],
})

export default router
