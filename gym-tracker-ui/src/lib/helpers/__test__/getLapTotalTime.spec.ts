import { assert, expect, test } from 'vitest'
import { getLapTotalTime } from '../getLapTotalTime'

test('test getLapTotalTime', () => {
    const laps = [
        {
            id: 3,
            workoutId: 13,
            startTime: '2024-07-21T09:14:43.367Z',
            endTime: '2024-07-21T09:18:43.367Z',
        },
        {
            id: 4,
            workoutId: 13,
            startTime: '2024-07-21T09:18:47.478Z',
            endTime: '2024-07-21T09:18:51.489Z',
        },
    ]

    const result = getLapTotalTime(laps)
    expect(result).toEqual({
        hours: 0,
        minutes: 4,
        seconds: 4,
        miliseconds: 11,
    })
})
