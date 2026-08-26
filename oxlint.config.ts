import { defineConfig } from 'oxlint';

export default defineConfig({
	plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'jsdoc', 'node', 'promise'],
	categories: {
		correctness: 'error',
		suspicious: 'error',
		pedantic: 'error',
		perf: 'error',
		style: 'error',
		nursery: 'error',
	},
	rules: {
		'object-shorthand': ['error', 'methods'],
		'one-var': ['error', 'never'],
		'sort-imports': [
			'error',
			{
				ignoreDeclarationSort: true,
			},
		],
		'sort-keys': 'off',
		'typescript/no-unsafe-type-assertion': 'off',
		'typescript/prefer-readonly-parameter-types': 'off',
		'unicorn/filename-case': [
			'error',
			{
				case: 'camelCase',
			},
		],
		'unicorn/no-await-expression-member': 'off',
		'import/no-named-export': 'off',
		'import/no-nodejs-modules': 'off',
		'import/prefer-default-export': 'off',
	},
	overrides: [
		{
			files: ['**/*.test.ts'],
			rules: {
				'typescript/no-non-null-asserted-optional-chain': 'off',
			},
		},
	],
	options: {
		typeAware: true,
		typeCheck: true,
	},
});
