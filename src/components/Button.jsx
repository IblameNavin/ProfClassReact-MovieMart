export const Button = ({onClick, type = "button", variant = "primary", disabled = false, children})=>{
      const baseStyles =
    "px-4 py-2 rounded font-medium transition"

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 cursor-pointer",
    outline: "border border-black hover:bg-gray-300 cursor-pointer",
    danger: "bg-red-600 text-white hover:bg-red-700 cursor-pointer",
    success: "bg-green-600 text-white hover:bg-green-700 cursor-pointer",
    blue: "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
  }
   return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  )
}
