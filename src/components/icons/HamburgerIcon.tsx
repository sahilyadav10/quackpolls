type HamburgerIconProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  return (
    <button className="p-2" onClick={onClick}>
      <div className="w-6 h-5 relative flex flex-col justify-between z-50">
        <span
          className={`absolute w-full h-0.5 bg-neutral-900 transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : "translate-y-0"
          }`}
        />
        <span
          className={`absolute w-full h-0.5 bg-neutral-900 transform transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0 translate-x-3" : "translate-y-2 opacity-100"
          }`}
        />
        <span
          className={`absolute w-full h-0.5 bg-neutral-900 transform transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 translate-y-2" : "translate-y-4"
          }`}
        />
      </div>
    </button>
  );
}
