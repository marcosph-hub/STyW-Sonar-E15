/// <reference types="vitest" />
import { setActivePinia, createPinia } from 'pinia'
import { useTimerStore } from '../src/stores/timer_store'

describe('Timer Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debería iniciar el temporizador', () => {
    const store = useTimerStore()
    store.startTimer(1, 1) // 1 minuto de trabajo, 1 minuto de descanso
    expect(store.currentTime).toBe(60)
    expect(store.isRunning).toBe(true)
  })

  it('debería detener el temporizador', () => {
    const store = useTimerStore()
    store.startTimer(1, 1)
    store.stopTimer()
    expect(store.isRunning).toBe(false)
    expect(store.currentTime).toBe(0)
  })
})
