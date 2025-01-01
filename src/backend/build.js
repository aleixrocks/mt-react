const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Paths
const entryFile = './src/onInit.ts'; // Adjust if your entry point is different
const outDir = './dist';

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

// Build with esbuild
console.log('Building with esbuild...');
esbuild.build({
	entryPoints: [entryFile],
	bundle: true,
	format: 'cjs',
	platform: 'node',
	target: 'es2020',
	outdir: outDir,
	sourcemap: true,
	tsconfig: './tsconfig.json',
}).then(() => {
	console.log('Build completed successfully.');
}).catch((error) => {
	console.error('Build failed:', error);
	process.exit(1);
});

