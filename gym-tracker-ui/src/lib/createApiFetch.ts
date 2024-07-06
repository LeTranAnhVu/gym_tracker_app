import { createFetch, CreateFetchOptions } from '@vueuse/core'

function createApiFetch(baseUrl: string, getToken: () => Promise<string>, logout: () => Promise<void>) {
    return createFetch({
        baseUrl,
        combination: 'overwrite',
        options: {
            // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
            async beforeFetch({ options }) {
                try {
                    const token = await getToken()
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    ;(options.headers as any).Authorization = `Bearer ${token}`
                    return { options }
                } catch (e) {
                    console.error('Failed to get token', e)
                    await logout()
                    throw e
                }
            },
            updateDataOnError: true,
            async onFetchError(ctx) {
                console.log('failed ')
                // ctx.data can be null when 5xx response
                if (ctx.response?.status === 401) {
                    await logout()
                }

                throw Error(ctx.error.message)
            },
        },
    } as CreateFetchOptions)
}

export default createApiFetch
