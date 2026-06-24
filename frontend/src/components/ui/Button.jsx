export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30",

    secondary: "bg-slate-700 hover:bg-slate-600 text-white",

    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      className={`
        px-4
        py-2
        rounded-xl
        transition-all
        duration-300
        font-medium
        hover:scale-[1.02]
        active:scale-[0.98]
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
