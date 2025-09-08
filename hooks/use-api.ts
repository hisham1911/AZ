"use client"

import { useState, useCallback } from "react"

/**
 * Custom hook for making API calls with loading and error states
 */
export function useApi() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Execute an API call with loading and error handling
   */
  const execute = useCallback(
    async <T>(apiCall: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await apiCall(...args)
        return result
      } catch (err: any) {
        setError(err.message || "An error occurred")
        throw err
    } finally {
      setIsLoading(false)
    }
    },
    []
  )

  return { execute, isLoading, error }
}
