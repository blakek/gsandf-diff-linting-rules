import fs from 'fs';
import path from 'path';
import gsandfConfig from 'eslint-config-gsandf';
import gsandfReactConfig from 'eslint-config-gsandf-react';
import reactAppConfig from 'eslint-config-react-app';
import reactHooksConfig from 'eslint-plugin-react-hooks';
import standardConfig from 'eslint-config-standard';
import { difference, unionObjectKeys } from './set-utils.js';

const gsandfRules = unionObjectKeys(
  gsandfConfig.rules,
  gsandfReactConfig.rules,
  standardConfig.rules
);

const comparisons = [
  ['react-app', reactAppConfig.rules],
  ['react-hooks', reactHooksConfig.rules]
];

const differences = comparisons.reduce(
  (accum, [name, rules]) => ({
    ...accum,
    [name]: Array.from(difference(Object.keys(rules), gsandfRules))
  }),
  {}
);

const outputFile = path.resolve('./differences.json');

fs.writeFileSync(outputFile, JSON.stringify(differences, null, 2));

/*
possible rules to add:
  array-callback-return - Enforces return statements in callbacks of array’s methods
  no-extra-label - Disallow unnecessary Labels (catches incorrectly formed objects)
  no-native-reassign - Sets many (browser) globals as read-only
  no-restricted-syntax - ['warn', 'WithStatement'] Disallows `with`
  no-restricted-globals - Disallow some globals (e.g. `'no-restricted-globals': ['error'].concat(restrictedGlobals),`). See https://github.com/facebook/create-react-app/blob/next/packages/confusing-browser-globals/index.js
  no-unused-labels - Disallow unnecessary Labels (catches incorrectly formed objects)
  no-useless-concat - Disallows concatenation of short (e.g. non-multiline) string literals
  radix - ensures radix is specified (when using `as-needed`)
  require-yield - prevents useless generators without yield
  react/jsx-no-comment-textnodes - See https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
  react/jsx-no-target-blank - Stop potential security issue with using target="_blank" without rel="noopener noreferrer". See https://mathiasbynens.github.io/rel-noopener/
  react/jsx-pascal-case - Ensure components are using pascal case
  react/no-danger-with-children - Warn with children and dangerouslySetInnerHTML are both used
  react/no-deprecated - Prevent usage of deprecated methods
  react/no-direct-mutation-state - Enforce usage of `setState` to set state
  react/no-is-mounted - Prevent usage of `isMounted`
  react/require-render-return - Warns with nothing is returned from `render`
  react/style-prop-object - Ensure `style` prop is an object
  jsx-a11y/accessible-emoji - Ensure emojis work on screenreaders
  jsx-a11y/alt-text - Ensure elements that need alt text have it
  jsx-a11y/anchor-has-content - Enforce that anchors have content and that the content is accessible to screen readers
  jsx-a11y/aria-activedescendant-has-tabindex - If `aria-activedescendant` is set, ensure `tabIndex` is also set
  jsx-a11y/aria-props - Ensure `aria-*` props are correctly spelled
  jsx-a11y/aria-proptypes - Ensure `aria-*` prop values are correctly spelled
  jsx-a11y/aria-role - Elements with ARIA roles must use a valid, non-abstract ARIA role
  jsx-a11y/aria-unsupported-elements - Don't set `aria-*` props on elements on known DOM elements that can't have them
  jsx-a11y/heading-has-content - Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers
  jsx-a11y/iframe-has-title - `<iframe>` elements must have a unique title property to indicate its content to the user
  jsx-a11y/img-redundant-alt - Enforce img alt attribute does not contain the word image, picture, or photo. Screenreaders already announce img elements as an image. There is no need to use words such as image, photo, and/or picture.
  jsx-a11y/no-redundant-roles - Some HTML elements have native semantics that are implemented by the browser. This includes default/implicit ARIA roles. Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.
  jsx-a11y/role-has-required-aria-props - Elements with `aria-*` props must have all required aria props
  jsx-a11y/role-supports-aria-props - Elements with `aria-*` props must not have incompatible aria props
  jsx-a11y/scope
 */
