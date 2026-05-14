import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Boss {
  id: string
  name: string
  deathCount: number
  isDefeated: boolean
}

interface Game {
  id: string
  name: string
  bosses: Boss[]
}

export const useDeathStore = defineStore(
  'deathTracker',
  () => {
    const games = ref<Game[]>([])

    const addGame = (name: string): void => {
      const cleanName = name.trim()

      const gameExists = games.value.some(
        (game) => game.name.toLowerCase() === cleanName.toLowerCase(),
      )

      if (gameExists) {
        console.warn(`The game "${cleanName}" already exists.`)
        return
      }

      games.value.push({
        id: crypto.randomUUID(),
        name: cleanName,
        bosses: [],
      })
    }

    const removeGame = (gameId: string): void => {
      const gameExists = games.value.some((game) => game.id === gameId)

      if (gameExists) {
        games.value = games.value.filter((game) => game.id !== gameId)
      } else {
        console.warn(`The game you are trying to remove does not exists yet.`)
        return
      }
    }

    const addBossToGame = (name: string, gameId: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const cleanName = name.trim()

      const bossExists = game.bosses.some(
        (boss) => boss.name.toLowerCase() === cleanName.toLowerCase(),
      )

      if (bossExists) {
        console.warn('The boss you are trying to add already exists.')
        return
      }

      const boss: Boss = {
        id: crypto.randomUUID(),
        name: cleanName,
        deathCount: 0,
        isDefeated: false,
      }

      game.bosses.push(boss)
    }

    const removeBossFromGame = (bossId: string, gameId: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const bossExists = game.bosses.some((boss) => boss.id === bossId)

      if (bossExists) {
        game.bosses = game.bosses.filter((boss) => boss.id !== bossId)
      } else {
        console.warn('The boss you are trying to remove does not exists')
        return
      }
    }

    const addDeathToBoss = (gameId: string, bossId: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const boss = game.bosses.find((boss) => boss.id === bossId)

      if (boss) {
        boss.deathCount++
      }
    }

    const removeDeathFromBoss = (gameId: string, bossId: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const boss = game.bosses.find((boss) => boss.id === bossId)

      if (boss) {
        if (boss.deathCount > 0) boss.deathCount--
      }
    }

    const toggleBossDefeated = (gameId: string, bossId: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const boss = game.bosses.find((boss) => boss.id === bossId)

      if (boss) {
        boss.isDefeated = !boss.isDefeated
      }
    }

    const resetBossDeath = (gameId: string, bossId: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const boss = game.bosses.find((boss) => boss.id === bossId)

      if (boss) {
        boss.deathCount = 0
      }
    }

    const resetGameProgress = (gameId: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      game.bosses.forEach((boss) => {
        boss.deathCount = 0
        boss.isDefeated = false
      })
    }

    const renameGame = (gameId: string, newName: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const cleanName = newName.trim()

      const nameAlreadyExists = games.value.some(
        (g) => g.id !== gameId && g.name.toLowerCase() === cleanName.toLowerCase(),
      )

      if (nameAlreadyExists) {
        console.warn(`The game name "${cleanName}" is already taken.`)
        return
      }

      game.name = cleanName
    }

    const renameBoss = (gameId: string, bossId: string, newName: string): void => {
      const game = games.value.find((game) => game.id === gameId)

      if (!game) return

      const cleanName = newName.trim()

      const nameAlreadyExists = game.bosses.some(
        (b) => b.id !== bossId && b.name.toLowerCase() === cleanName.toLowerCase(),
      )

      if (nameAlreadyExists) {
        console.warn(`The boss name "${cleanName}" is already taken.`)
        return
      }

      const boss = game.bosses.find((boss) => boss.id === bossId)

      if (boss) {
        boss.name = cleanName
      }
    }

    return {
      games,
      addGame,
      removeGame,
      renameGame,
      addBossToGame,
      removeBossFromGame,
      renameBoss,
      addDeathToBoss,
      removeDeathFromBoss,
      toggleBossDefeated,
      resetBossDeath,
      resetGameProgress,
    }
  },
  {
    persist: true,
  },
)
