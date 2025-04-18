declare module "toastify-js" {
  interface ToastifyOptions {
    text: string;
    duration?: number;
    destination?: string;
    newWindow?: boolean;
    close?: boolean;
    gravity?: "top" | "bottom";
    position?: "left" | "center" | "right";
    stopOnFocus?: boolean;
    onClick?: () => void;
    style?: Partial<CSSStyleDeclaration>;
    className?: string;
  }

  function Toastify(options: ToastifyOptions): {
    showToast: () => void;
  };

  export default Toastify;
}
