import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			// add this to cache all the imports
			workbox: {
				globPatterns: ["**/*"]
			},
			// add this to cache all the
			// static assets in the public folder
			includeAssets: ["**/*"],
			manifest: {
				name: "WeatheX App",
				short_name: "WeatheX",
				description: "A Modern Weather Application",
				start_url: "/",
				scope: "/",
				display: "standalone",
				background_color: "#151515",
				theme_color: "#151515",
				icons: [
					{
						src: "/icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/icons/icon-256x256.png",
						sizes: "256x256",
						type: "image/png"
					},
					{
						src: "/icons/icon-384x384.png",
						sizes: "384x384",
						type: "image/png"
					},
					{
						src: "/icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png"
					}
				]
			}
		})
	]
});
