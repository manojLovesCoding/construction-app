//export const apiUrl = 'http://localhost:8000/api/'
//export const fileUrl = 'http://localhost:8000/'

export const apiUrl = 'https://vayuhu.fun/api/'
export const fileUrl = 'https://vayuhu.fun/'

export const token = () => {
    const userInfo = localStorage.getItem('userInfo')

    if (!userInfo) return null

    try {
        const data = JSON.parse(userInfo)
        return data?.token || null
    } catch (error) {
        return null
    }
}
