import axios from "axios";
import toast from "react-hot-toast";
import { base_url } from "../../config";
import moment from "moment";
import { imageEndPoint } from "./endPoints";


export function getImages(authToken: string) {
    return new Promise<any>(async (resolve, reject) => {
        const toastId = toast.loading("Loading...");
        try {
            await axios.get(`${base_url + imageEndPoint.get}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then((res: any) => {
                if (res.data) {
                    toast.dismiss(toastId)
                    toast.success("Images retrieved successfully")
                    resolve(res.data);
                }
            }).catch((err: any) => {
                toast.dismiss(toastId)
                toast.error(err?.response?.data?.message || "Something unexpected happened, please try again later")
            })
        } catch (err: any) {
            toast.dismiss(toastId)
            toast.error(err?.message || "Something unexpected happened, please try again later")
        }
    })
}


export async function uploadImage(url: string, authToken: string) {
    return new Promise<any>(async (resolve, reject) => {
        const toastId = toast.loading("Loading...");
        try {
            await axios.post(`${base_url + imageEndPoint.upload}`, {
                url,
                uploadat: moment().format('YYYY-MM-DD HH:mm')
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then((res: any) => {
                if (res.data) {
                    toast.dismiss(toastId)
                    resolve(res)
                }
            }).catch((err: any) => {
                toast.dismiss(toastId)
                toast.error(err?.response?.data?.message || "Something unexpected happened, please try again later")
            })
        } catch (err: any) {
            toast.dismiss(toastId)
            toast.error(err?.message || "Something unexpected happened, please try again later")
        }
    })
}

export async function deleteImage(id: string, authToken: string) {
    const toastId = toast.loading("Loading...")
    try {
        await axios.delete(`${base_url + imageEndPoint.delete}`.replace(':id', id), {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then((res: any) => {
            if (res) {
                toast.dismiss(toastId)
                toast.success("Image deleted successfully")
            }
        })
    } catch (error: any) {
        throw new Error(error.message || "Something unexpected happened, please try again later");
    }
}


