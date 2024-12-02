function ProgressBar({ value, name }: { value: number; name: string }) {
  return (
    <>
      <div className="mb-1 text-base font-medium text-black font-mono">
        {name}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(value / 255) * 100}%` }}
        ></div>
      </div>
    </>
  )
}

export default ProgressBar
