import { RuleTester } from 'oxlint/plugins-dev';
import rule from './tryCatch.ts';

const ruleTester = new RuleTester();

ruleTester.run('safely-storage/try-catch', rule, {
	valid: [
		{
			name: 'Parent try',
			code: `
try {
	sessionStorage.setItem('key', 'value');
} catch {
}
`,
		},
		{
			name: 'Ancestor try',
			code: `
try {
	const func = () => {
		localStorage.setItem('key', 'value');
	}
} catch {
}
`,
		},
		{
			name: 'Assign to variable',
			code: `
let mySessionStorage;
try {
	mySessionStorage = sessionStorage;
} catch {
}

mySessionStorage?.setItem('key', 'value');
`,
		},
	],
	invalid: [
		{
			name: 'Property only',
			code: `
sessionStorage;
`,
			errors: [
				{
					messageId: 'sessionStorage',
					line: 2,
					column: 0,
					endColumn: 14,
				},
			],
		},
		{
			name: 'Method',
			code: `
localStorage.setItem('key', 'value');
`,
			errors: [
				{
					messageId: 'localStorage',
					line: 2,
					column: 0,
					endColumn: 12,
				},
			],
		},
		{
			name: 'Assign to variable (AssignmentExpression)',
			code: `
const mySessionStorage = sessionStorage;
`,
			errors: [
				{
					messageId: 'sessionStorage',
					line: 2,
					column: 25,
					endColumn: 39,
				},
			],
		},
		{
			name: 'Assign to variable (VariableDeclarator)',
			code: `
let myLocalStorage;
myLocalStorage = localStorage;
`,
			errors: [
				{
					messageId: 'localStorage',
					line: 3,
					column: 17,
					endColumn: 29,
				},
			],
		},
	],
});
