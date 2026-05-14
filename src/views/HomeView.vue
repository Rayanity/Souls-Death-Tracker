<script setup lang="ts">
import { useDeathStore } from '@/stores/deathStore'

const store = useDeathStore()
</script>

<template>
  <main>
    <div v-if="store.games.length > 0">
      <RouterLink
        :to="{ name: 'game-detail', params: { id: game.id } }"
        v-for="game in store.games"
        :key="game.id"
      >
        <div>
          <p>{{ game.name }}</p>
          <p>Number of bosses : {{ game.bosses.length }}</p>
        </div>
      </RouterLink>
    </div>

    <div v-else>
      <p>No games have been added yet</p>
    </div>
  </main>
</template>
