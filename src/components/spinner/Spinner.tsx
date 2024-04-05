function Spinner() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh_-_50px)] w-full">
      <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="animate-spin w-20 h-20">
        <circle
          cx="400"
          cy="400"
          fill="none"
          className="stroke-secondary"
          r="200"
          strokeWidth="50"
          strokeDasharray="700 1400"
          strokeLinecap="round"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  )
}

export default Spinner
