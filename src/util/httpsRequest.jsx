import axios from "axios"

export const postRequest = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
}



export const getRequest = async (url) => {
    try {
        const data = await axios.get(url)
        return data
    } catch (error) {
        console.log(error)
    }
}