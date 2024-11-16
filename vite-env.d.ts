interface ImportMetaEnv {
  VITE_APPLICATION_URL: string; // Add any other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
