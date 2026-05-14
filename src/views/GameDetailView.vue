<script setup lang="ts">
import { computed } from 'vue'
import { useDeathStore } from '@/stores/deathStore'

const props = defineProps<{ id: string }>()

const store = useDeathStore()

const game = computed(() => {
  return store.games.find((game) => game.id === props.id)
})
</script>

<template>
  <main>
    <div v-if="game">
      <h1>{{ game.name }}</h1>
    </div>
    <div v-else>
      <h1>Game not found</h1>
      <p>This game does not exist or has been removed.</p>
    </div>
    <RouterLink to="/">Return to home page</RouterLink>
  </main>
</template>
