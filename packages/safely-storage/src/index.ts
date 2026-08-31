import { eslintCompatPlugin } from '@oxlint/plugins';
import ruleTryCatch from './rules/tryCatch.ts';

export default eslintCompatPlugin({
	meta: {
		name: 'oxlint-plugin-safely-storage',
	},
	rules: {
		'try-catch': ruleTryCatch,
	},
});
