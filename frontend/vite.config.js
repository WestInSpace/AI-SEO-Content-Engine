import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig(({ mode }) => {
	//load env variables from the parent
	const envDir = path.resolve(__dirname, '..');
	const env = loadEnv(mode, envDir, '');
	const FRONTEND_PORT = parseInt(env.VITE_FRONTEND_PORT) || 3000;

	return{
		plugins: [react()],
		envDir: envDir,
		server: {
			port: FRONTEND_PORT,
			strictPort: true, //Prevents vite from using another port if this one is busy
		},
	};
});
