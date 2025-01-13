export const getUrl = (route) => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_PATH : ''
    return `${baseUrl}${route}`
}

export const getApi = (route) => {
    const base = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_URL : process.env.PRODUCTION_API_URL
    return `${base}${route}`
}
