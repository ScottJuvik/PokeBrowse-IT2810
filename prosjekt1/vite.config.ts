/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
    },
    test: {
        globals: true,
        environment: "jsdom",
        include: ['./src/tests/**/*.test.tsx', './src//tests/**/*.test.ts'],
        setupFiles: ['./src/tests/setup.ts'],
    }
});
