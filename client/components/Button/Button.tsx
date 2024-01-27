interface Props {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}
export default function Button(props: Props) {
  const {
    type = "button",
    children,
    onClick,
    className = "",
    color = " bg-slate-800 hover:bg-indigo-500",
  } = props;

  return (
    <button
      className={`${color}font-bold  py-2 px-4 rounded ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
