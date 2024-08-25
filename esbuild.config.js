const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

// Determine if we are in development mode
const isProduction = process.env.NODE_ENV === 'production';

console.log("ENV", process.env.NODE_ENV)

const buildOptions = {
    entryPoints: ["./app/javascript/application.js"],
    outdir: "./app/assets/builds",
    bundle: true,
    minify: isProduction, // Minify only in production
    allowOverwrite: true,
    sourcemap: !isProduction, // Enable sourcemap only in development
    format: 'esm',
    publicPath: '/assets',
    plugins: [sassPlugin({
        loadPaths: ['./node_modules']
    })],
    loader: {
        '.svg': 'dataurl',
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.woff': 'file',
        '.ttf': 'file',
        '.eot': 'file',
        '.gif': 'file',
        '.woff2': 'file'
    }
};

const build = async () => {
    try {
        if (!isProduction) {
            console.log('Starting watch mode...');
            const context = await esbuild.context(buildOptions);
            await context.watch();
            console.log('Watch mode started');
        } else {
            console.log('Starting build...');
            await esbuild.build(buildOptions);
            console.log('Build completed');
        }
    } catch (error) {
        console.error('Build failed with error:', error);
        process.exit(1);
    }
};

build();
