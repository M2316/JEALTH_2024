import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{

  // 현재 모드를 출력하여 확인
  console.log(`Current mode: ${mode}`)

  // const PROXY = mode === 'production' ? 'https://api.jealth.store/' : 'http://m2316homepc.ddns.net:7070/';
  // const PROXY = 'https://api.jealth.store';
  const PROXY = 'http://m2316homepc.ddns.net:7070';

  return {
    plugins: [react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    })],
    server: {
      proxy: {
        "/api": {
          target: `${PROXY}/api`,
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
  }
})
