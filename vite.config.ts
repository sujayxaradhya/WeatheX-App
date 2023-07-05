import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		https: {
			key: "./.cert/localhost.key",
			cert: "./.cert/localhost.crt"
		}
	}
});
