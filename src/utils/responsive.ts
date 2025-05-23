export const responsive = {
  // Breakpoint checks
  isMobile: (width: number = window.innerWidth) => width < 768,
  isTablet: (width: number = window.innerWidth) => width >= 768 && width < 1024,
  isDesktop: (width: number = window.innerWidth) => width >= 1024,

  // Grid column calculations
  getGridCols: (totalItems: number, screenSize: "sm" | "md" | "lg" | "xl") => {
    const colMap = {
      sm: Math.min(totalItems, 1),
      md: Math.min(totalItems, 2),
      lg: Math.min(totalItems, 3),
      xl: Math.min(totalItems, 4),
    };
    return colMap[screenSize];
  },

  // Responsive class builder
  buildClasses: (
    baseClasses: string,
    responsiveClasses: Record<string, string>
  ) => {
    return [baseClasses, ...Object.values(responsiveClasses)].join(" ");
  },

  // Container padding based on screen size
  getContainerPadding: (size: "sm" | "md" | "lg") => {
    const paddingMap = {
      sm: "px-4",
      md: "px-4 sm:px-6",
      lg: "px-4 sm:px-6 lg:px-8",
    };
    return paddingMap[size];
  },
};
