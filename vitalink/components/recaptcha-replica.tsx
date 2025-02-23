"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"

export function ReCaptchaReplica() {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false)
        setChecked(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const handleClick = () => {
    if (!checked && !loading) {
      setLoading(true)
    }
  }

  return (
    <div className="flex items-center justify-center border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-700">
      <div className="flex items-center space-x-3">
        <div
          className={`w-6 h-6 border ${
            checked ? "bg-primary border-primary" : "bg-white border-gray-300"
          } rounded cursor-pointer flex items-center justify-center relative`}
          onClick={handleClick}
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick()
            }
          }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {checked && !loading && <Check className="w-4 h-4 text-white" />}
        </div>
        <span className="text-sm">I'm not a robot</span>
      </div>
      <div className="ml-4 flex flex-col items-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 2ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
            fill="#4CAF50"
          />
        </svg>
        <span className="text-xs text-gray-500">reCAPTCHA</span>
        <span className="text-xs text-gray-500">Privacy - Terms</span>
      </div>
    </div>
  )
}

