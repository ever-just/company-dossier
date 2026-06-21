import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    mcp: 'src/mcp.ts',
  },
  format: ['esm'],
  target: 'node18',
  platform: 'node',
  dts: { entry: { index: 'src/index.ts' } },
  sourcemap: false,
  clean: true,
  splitting: false,
  shims: false,
  banner: {
    js: '',
  },
});
