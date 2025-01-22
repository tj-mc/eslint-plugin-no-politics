# eslint-plugin-no-politics

An ESLint plugin to disallow certain political names in string literals. This helps maintain neutrality and avoid the unintended inclusion of controversial names in your codebase.


## Features
- Default list: Many political figures included
- Customisation: Expand the list with extra names via config

## Installation
`yarn add eslint-plugin-no-politics -d`

`npm install eslint-plugin-no-politics --save-dev`

## Usage
```javascript
module.exports = {
  plugins: ["no-politics"], 
  rules: {
    "no-politics/no-political-names": "error", // Enable the name rule. You may also prefer "warning"
  },
};
```

## Adding more banned names
```javascript
module.exports = {
  plugins: ["no-political-names"],
  rules: {
    "no-political-names/no-political-names": [
      "error",
      {
        bannedNames: ["Trump", "Hitler", "Stalin"],
      },
    ],
  },
};

```

## Adding allowed names - overrides ban list
```javascript
module.exports = {
  plugins: ["no-political-names"],
  rules: {
    "no-political-names/no-political-names": [
      "error",
      {
        allowedNames: ["Macron", "Rudd", "Hawke"],
      },
    ],
  },
};

```
