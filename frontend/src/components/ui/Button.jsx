export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",

    secondary: "bg-slate-800 hover:bg-slate-700 text-white",

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
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
