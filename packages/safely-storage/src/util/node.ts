import type { ESTree } from '@oxlint/plugins';

export const wrappedTry = (node: ESTree.Node): boolean => {
	const { parent } = node;

	if (parent === null) {
		return false;
	}

	if (parent.type === 'TryStatement') {
		return true;
	}

	return wrappedTry(parent);
};
