// src/stores/useAuthStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import useGeneralStore from './generalStore'
import { Backend_URL } from '../constants'

type User = {
    id: number
    name: string
    email: string
    role: string
}

type AuthState = {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: async (email, password) => {
                useGeneralStore.getState().setIsLoading(true);
                try {
                    const res = await axios.post(`${Backend_URL}/api/auth/login`, { email, password })

                    const { access_token, user } = res.data

                    // Set axios default header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

                    set({
                        token: access_token,
                        user,
                    })
                } catch (error) {
                    useGeneralStore.getState().setIsLoading(false);
                    throw error
                }
            },

            logout: () => {
                // Clear axios header
                delete axios.defaults.headers.common['Authorization']
                set({ user: null, token: null })
            },
        }),
        {
            name: 'auth-storage', // name in localStorage
            partialize: (state) => ({ token: state.token, user: state.user }), // persist only what you need
        }
    )
)
