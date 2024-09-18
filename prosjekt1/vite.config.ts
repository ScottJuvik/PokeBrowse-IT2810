/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@interfaces': path.resolve(__dirname, './src/interfaces'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@mocks': path.resolve(__dirname, './src/mocks'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['./src/tests/**/*.test.tsx', './src/tests/**/*.test.ts'],
        setupFiles: ['./src/tests/setup.ts'],
    },
});
