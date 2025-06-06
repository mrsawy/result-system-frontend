
import { create } from "zustand"

type GeneralStore = {
    isLoading: boolean
    setIsLoading: (isWin: boolean) => void
}
const useGeneralStore = create<GeneralStore>()((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
})
)


export default useGeneralStore
