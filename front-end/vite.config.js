import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{

  // 현재 모드를 출력하여 확인
  console.log(`Current mode: ${mode}`)

  const isProduction = mode === 'production';



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
          // target: "http://m2316homepc.ddns.net:7070/api",
          // target: isProduction 
          // ? "http://api.jealth.store/api" // 배포 환경 API 엔드포인트
          // : "http://m2316homepc.ddns.net:7070/api", // 로컬 개발 환경 API 엔드포인트,  
          target:"http://m2316homepc.ddns.net/api",
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
