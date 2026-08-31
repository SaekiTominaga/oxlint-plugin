import type { Rule } from '@oxlint/plugins';
import { wrappedTry } from '../util/node.ts';

const rule: Rule = {
	meta: {
		type: 'suggestion',
		messages: {
			sessionStorage: 'Access to `sessionStorage` can cause an exception, so be sure to use it with try...catch',
			localStorage: 'Access to `localStorage` can cause an exception, so be sure to use it with try...catch',
		},
	},
	createOnce(context) {
		return {
			Identifier(node) {
				switch (node.name) {
					case 'sessionStorage':
					case 'localStorage': {
						if (!wrappedTry(node)) {
							context.report({
								node: node,
								messageId: node.name,
							});
						}

						break;
					}
					default:
				}
			},
		};
	},
};

export default rule;
