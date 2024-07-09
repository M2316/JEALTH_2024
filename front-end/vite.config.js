import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  })],
  server: {
    proxy: {
      "/api": {
        target: "http://m2316homepc.ddns.net:7070/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@img", replacement: "/src/assets/image" },
      { find: "@", replacement: "/src" },
    ],
  },
})
