import { base_url } from "../../config";
import axios from "axios";
import { authEndPoint } from "./endPoints";
import toast from "react-hot-toast";

interface ILoginCredentials {
    username: string;
    password: string;
}

export const loginApi = (loginCred: ILoginCredentials) => {

    return new Promise<any>(async (resolve, reject) => {
        const toastId = toast.loading("Loading...");
        try {
            const response: any = {};
            await axios.post(`${base_url + authEndPoint.login}`, loginCred).then((res: any) => {
                if (res.data.authentication === true) {
                    response['userDetails'] = res.data.userDetails;
                    response['authToken'] = res.data.token;
                    toast.dismiss(toastId)
                    toast.success("Authenticated successfully!!")
                    resolve(response);
                } else {
                    toast.dismiss(toastId)
                    toast.error(res.data.message)
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

interface UserDetails {
    fullname: string
    username: string
    email: string
    password: string
}

export function addNewUser(userCredentials: UserDetails) {
    return new Promise<any>(async (resolve, reject) => {
        const toastId = toast.loading("Loading...");
        try {
            await axios.post(`${base_url + authEndPoint.signup}`, userCredentials).then((res: any) => {
                if (res.data.code  === 200) {
                    toast.dismiss(toastId)
                    toast.success("Account created successfully!! you could login with your credentials.")
                    resolve(true);
                } else {
                    toast.dismiss(toastId)
                    toast.error(res.data.message)
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