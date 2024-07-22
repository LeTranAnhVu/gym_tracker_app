import { Exercise } from './Exercise'
import { Workout } from './Workout'

type ExerciseLink = {
    id: number
    workoutId: number
    exerciseId: number
    exercise: Exercise
}

export type WorkoutDetail = Workout & {
    exercises: ExerciseLink[]
}
