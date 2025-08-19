import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// imports para React
const icons = {
  arrowRight: FiArrowRight,
}

export const Button = ({
  type = 'button',
  className = '',
  disabled,
  children,
  showText = true, // si se muestra el texto del botón
  onClick,
  appearance = 'primary',
  icon = null, // nombre del ícono como string, ej: "arrowRight"
  iconPosition = 'right', // opcional: 'left' o 'right'
  href = null // Make href optional - if null, renders button instead of link
}) => {
  const appearances = {
    primary: "bg-primary-orange py-3 px-6 text-white rounded-lg cursor-pointer hover:bg-secondary-orange transition-all duration-300",
    secondary: "bg-transparent text-title-color border border-title-color px-5 py-2 rounded-lg cursor-pointer hover:bg-[#DEDEDE]/50 hover:border-[#E3E6E8] transition-all duration-300",
    logout: "bg-brandWhite text-[#FF0000] px-5 py-3.5 w-full border border-[#FF0000] rounded-lg cursor-pointer",
  };

  // Busca el ícono dinámicamente por nombre
  const Icon = icon ? icons[icon] : null;

  const buttonContent = (
    <>
      {iconPosition === 'left' && Icon && <Icon size={20} />}
      {showText === true && children}
      {iconPosition === 'right' && Icon && <Icon size={20} />}
    </>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={`${appearances[appearance]} ${className} inline-flex items-center justify-center gap-2`}>
        {buttonContent}
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${appearances[appearance]} ${className} inline-flex items-center justify-center gap-2`}
    >
      {buttonContent}
    </button>
  );
};