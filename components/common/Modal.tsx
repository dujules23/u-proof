import { useEffect } from "react";

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 m-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
        <div className="bg-white p-5 rounded-md shadow-lg max-w-sm md:max-w-md mx-auto">
          <button className="text-black hover:underline" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
