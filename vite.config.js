import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite builds the site into dist/ as static files, served by nginx on Cloud Run.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
});
