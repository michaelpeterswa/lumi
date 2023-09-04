'use client' // Error components must be Client Components
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">Uh Oh!</h2>
          <p>It appears that we've encountered an issue.</p>
          
          <div className="card-actions justify-end">
            <button className="btn" onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>Reload</button>
          <a className="btn" href="/">Home</a>
          </div>
          
        </div>
      </div>
    </div>
  )
}