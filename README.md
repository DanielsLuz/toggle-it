# Toggle It

This is a wrapper around the [toggle-it-core](https://github.com/DanielsLuz/toggle-it-core).

The main purpose of this wrapper is to integrate an API request responsible to fetch the data
relative to the feature flags with the core, which checks if a feature is "on" or "off", basically.

For now, the requirements are:
1. the fetch function should be a thenable (i.e. has a then method). Most Promise based request libraries should be just fine.

## Instalation

```
yarn add toggle-it
```

## Usage

Simple example usages can be found at the [tests file](https://github.com/DanielsLuz/toggle-it/blob/master/__tests__/toggle-it.test.js).

## TODO

1. (**DONE**) ~~Make it possible to the user to customize how the JSON can be accessed on the response object.~~
2. Support parametrized custom functions with more complex use cases for the flags.
2. Support non-thenables.
