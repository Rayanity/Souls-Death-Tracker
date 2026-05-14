import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDeathStore } from './deathStore'

describe('Death Tracker Store', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('ajoute un nouveau jeu correctement', () => {
    const store = useDeathStore()

    store.addGame('Elden Ring')

    expect(store.games.length).toBe(1)
    expect(store.games[0]!.name).toBe('Elden Ring')
    expect(store.games[0]!.id).toBeDefined()
  })

  it('empêche la création de jeux en doublon (insensible à la casse et aux espaces)', () => {
    const store = useDeathStore()

    store.addGame('Dark Souls')

    store.addGame('  dark souls  ')

    expect(store.games.length).toBe(1)
  })
})
