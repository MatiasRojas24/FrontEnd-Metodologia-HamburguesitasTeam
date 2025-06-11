import { useState } from "react"

export const useWaitingAction = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
  return {
    isLoading,
    setIsLoading
  }
}
