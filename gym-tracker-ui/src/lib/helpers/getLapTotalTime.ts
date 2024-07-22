import { WorkoutLap } from '../models/WorkoutLap'

export function getLapTotalTime(laps: WorkoutLap[]): {
    hours: number
    minutes: number
    seconds: number
    miliseconds: number
} {
    let hours = 0
    let minutes = 0
    let seconds = 0
    let miliseconds = 0
    let diff = 0
    laps.forEach((lap) => {
        const startTime = new Date(lap.startTime)
        const endTime = lap.endTime ? new Date(lap.endTime) : new Date()
        diff += endTime.getTime() - startTime.getTime()
    })

    const diffHour = diff / 1000 / 60 / 60
    hours = Math.floor(diffHour)
    const diffMinutes = (diffHour - hours) * 60
    minutes = Math.floor(diffMinutes)
    const diffSeconds = (diffMinutes - minutes) * 60
    seconds = Math.floor(diffSeconds)
    const diffMiliseconds = (diffSeconds - seconds) * 1000
    miliseconds = Math.ceil(diffMiliseconds)

    return { hours, minutes, seconds, miliseconds }
}
