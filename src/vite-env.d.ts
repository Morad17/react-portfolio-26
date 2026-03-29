/// <reference types="vite/client" />

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
