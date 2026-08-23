import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint.configs.recommended,

	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: true,
			},
		},
		extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
	},
	{
		files: ['packages/*/src/**/*.ts'],
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				project: 'packages/*/tsconfig.lint.json',
			},
		},
	},
	{
		files: ['**/*.test.ts'],
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
		},
	},
);
