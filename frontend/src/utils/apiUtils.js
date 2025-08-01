import axios from './axiosConfig'

export const getRequest = async ({url, params = {}}) => {
    try {
        const res = await axios.get(url, {params});
        return res.data
    }
    catch (error) {
        return error;
    }
}

export const postRequest = async ({url, data={}, params={}}) => {
    try {
        const res = await axios.post(url, data, {params})
        return res.data
    }
    catch (error) {
        return error;
    }
}

export const deleteRequest = async ({url, params={}}) => {
    try {
        const res = await axios.delete(url, {params});
        return res.data
    }
    catch (error) {
        return error;
    }
}