export type AggregatedExercise = {
    date: string
    workoutId: number
    exerciseId: number
    sets: number
    totalReps: number
    avgWeight: number
    avgReps: number
    progress: 'up' | 'down' | 'neutral' | 'best'
}
