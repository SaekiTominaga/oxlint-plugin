# oxlint-plugin-safely-storage

[![npm version](https://badge.fury.io/js/oxlint-plugin-safely-storage.svg)](https://www.npmjs.com/package/oxlint-plugin-safely-storage)
[![Workflow status](https://github.com/SaekiTominaga/oxlint-plugin/actions/workflows/ci.yml/badge.svg)](https://github.com/SaekiTominaga/oxlint-plugin/actions/workflows/ci.yml)

## Summary

Access to Web Storage API (`sessionStorage` or `localStorage`) can cause an exception in some user environments, so be sure to use it with `try`...`catch`.

- If the user blocks cookies in the browser settings (`SecurityError`)
- In `setItem()` method, if the storage run out of disk quota (`QuotaExceededError`)

```javascript
try {
  const storageKey = 'foo';

  sessionStorage.clear();
  sessionStorage.setItem(storageKey, 'x'.repeat(5242880 - storageKey.length + 1)); // Set data exceeding 5MB
} catch (e) {
  if (e instanceof DOMException) {
    console.warn(e.name); // `SecurityError` if cookies are blocked, otherwise `QuotaExceededError`
  }
}
```

After applying this plugin, an error will occur in places where `try`...`catch` is not used.

```javascript
/* 🆖 */
const foo = sessionStorage.getItem('foo');

doSomething(); // This process will not be reached if the browser blocks cookies
```

```javascript
/* 🆗 */
try {
  const foo = sessionStorage.getItem('foo');
} catch {}

doSomething(); // This process will run even if the browser blocks cookies
```

```javascript
/* 🆗 */
let mySessionStorage;
try {
  mySessionStorage = sessionStorage;
} catch {}

const foo = mySessionStorage?.getItem('foo');

doSomething(); // This process will run even if the browser blocks cookies
```

## Usage

```typescript
/* oxlint.config.ts */
import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    ...
  },
  plugins: [...],
  env: {
    browser: true,
  },
  jsPlugins: [
    {
      name: 'safely-storage',
      specifier: 'oxlint-plugin-safely-storage',
    },
  ],
  rules: {
    'safely-storage/try-catch': 'error',
  },
});
```
