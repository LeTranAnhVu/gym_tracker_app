import { defineStore } from 'pinia'
import { showConfirmDialog } from 'vant'
import { ref, watch } from 'vue'
import { useApiFetch } from '../../main'
import { WorkoutLap } from '../models/WorkoutLap'
import { getLapTotalTime } from '../helpers/getLapTotalTime'

export const useTimerStore = defineStore('timer', () => {
    const workoutId = ref<number | null>(null)
    const isFinished = ref<boolean | null>(null)
    // Counter
    const countMiliSeconds = ref(0)
    const countSeconds = ref(0)
    const countMinutes = ref(0)
    const countHours = ref(0)

    const isCounting = ref(false)

    const laps = ref<WorkoutLap[]>([])
    const openLap = ref<WorkoutLap | null>(null)

    watch(
        workoutId,
        async (val) => {
            if (val) {
                laps.value = await fetchLaps(workoutId.value!)
                updateCounting()
            }
        },
        { immediate: true },
    )

    function clearData() {
        workoutId.value = null
        isFinished.value = null
        countMiliSeconds.value = 0
        countSeconds.value = 0
        countMinutes.value = 0
        countHours.value = 0
        isCounting.value = false
        laps.value = []
        openLap.value = null
    }

    async function startCounting() {
        workoutIdRequired()

        laps.value = await fetchLaps(workoutId.value!)
        openLap.value = await getOpenLap(laps.value)
        if (openLap.value == null) {
            openLap.value = await createLap(workoutId.value!, new Date())
            laps.value = await fetchLaps(workoutId.value!)
        }

        updateCounting()
        isCounting.value = true
        isFinished.value = false
    }

    function updateCounting() {
        const { hours, minutes, seconds, miliseconds } = getLapTotalTime(laps.value)
        countHours.value = hours
        countMinutes.value = minutes
        countSeconds.value = seconds
        countMiliSeconds.value = miliseconds
    }

    let interval: number | null = null

    watch(isCounting, (val: boolean) => {
        if (val) {
            interval = setInterval(() => {
                countMiliSeconds.value += 10
                if (countMiliSeconds.value > 999) {
                    countMiliSeconds.value = 0
                    countSeconds.value++
                }
                if (countSeconds.value === 60) {
                    countSeconds.value = 0
                    countMinutes.value++
                }
                if (countMinutes.value === 60) {
                    countMinutes.value = 0
                    countHours.value++
                }
            }, 10)
        } else {
            if (interval) {
                clearInterval(interval)
            }
        }
    })

    async function pauseCounting() {
        workoutIdRequired()
        isCounting.value = false
        if (openLap.value) {
            await stopLap(workoutId.value!, openLap.value!.id, new Date())
        }
    }

    async function resetCount() {
        workoutIdRequired()
        const confirm = await confirmResetPopup()
        if (confirm) {
            await resetLap(workoutId.value!)
            countMiliSeconds.value = 0
            countSeconds.value = 0
            countMinutes.value = 0
            countHours.value = 0
            isCounting.value = false
            isFinished.value = false
        }
    }

    async function stopCounting() {
        workoutIdRequired()
        const confirm = await confirmStopPopup()
        if (confirm && openLap.value) {
            isFinished.value = true
        }
    }

    function workoutIdRequired() {
        if (workoutId.value == null) {
            throw new Error('There is no workout selected')
        }
    }

    function confirmStopPopup() {
        // open the confirm popup
        return new Promise((resolve, _) => {
            showConfirmDialog({
                title: 'Finish your workout?',
                message: 'Click "OK" to finish your workout',
            })
                .then(() => {
                    resolve(true)
                })
                .catch(() => {
                    resolve(false)
                })
        })
    }

    function confirmResetPopup() {
        // open the confirm popup
        return new Promise((resolve, _) => {
            showConfirmDialog({
                title: 'Reset the counter?',
                message: 'It will reset all your the progress in this workout',
            })
                .then(() => {
                    resolve(true)
                })
                .catch(() => {
                    resolve(false)
                })
        })
    }

    async function getOpenLap(laps: WorkoutLap[]): Promise<WorkoutLap | null> {
        return laps.find((lap) => lap.endTime == null) || null
    }
    async function fetchLaps(workoutId: number): Promise<WorkoutLap[]> {
        const { data, error } = await useApiFetch(`workouts/${workoutId}/laps`).get().json<WorkoutLap[]>()
        if (error.value) {
            console.error(error)
            return []
        }
        return data.value || []
    }

    async function createLap(workoutId: number, startTime: Date): Promise<WorkoutLap | null> {
        const { data, error } = await useApiFetch(`workouts/${workoutId}/laps`).post({ startTime }).json<WorkoutLap>()
        if (error.value) {
            throw new Error('Failed to create lap')
        }

        return data.value
    }

    async function stopLap(workoutId: number, lapId: number, endTime: Date): Promise<WorkoutLap | null> {
        const { data, error } = await useApiFetch(`workouts/${workoutId}/laps/${lapId}/stop`)
            .post({ endTime })
            .json<WorkoutLap>()
        if (error.value) {
            throw new Error('Failed to stop lap')
        }

        return data.value
    }

    async function resetLap(workoutId: number) {
        await useApiFetch(`workouts/${workoutId}/laps/reset`).post()
    }

    return {
        workoutId,
        isFinished,
        countMiliSeconds,
        countSeconds,
        countMinutes,
        countHours,
        isCounting,
        startCounting,
        pauseCounting,
        resetCount,
        stopCounting,
    }
})
