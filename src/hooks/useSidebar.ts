import { useState, useEffect } from "react";
import { useResponsive } from "./useResponsive";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lg } = useResponsive();

  useEffect(() => {
    if (lg) {
      setIsOpen(false);
    }
  }, [lg]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!lg && isOpen) {
        const sidebar = document.querySelector("[data-sidebar]");
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, lg]);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    open,
    close,
    isMobile: !lg,
  };
}
