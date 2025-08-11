import { axiosInstance } from "@/app/config/axios";
import { create } from "zustand";


type State = {
    authUser: { id: string, email: string, password: string, isAnonymous: string, createdAt: string } | null
    isCheckingAuth: boolean
}

type Action = {
    checkAuth: () => void
}

export const useAuthStore = create<State & Action>((set) => ({
    authUser: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log(error)
            set({ authUser: null })
        } finally {
            set({
                isCheckingAuth: false
            })
        }
    },
}))