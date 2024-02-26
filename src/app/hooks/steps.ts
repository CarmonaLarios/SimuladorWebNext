import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


interface Props {
    currentStep: number
}

export const useSteps = create(immer<Props>(() => {
    return {
        currentStep: 0
    }
}))
