# Component Autocomplete

Visual Studio Code extension that provides completion services for the import of frontend React components.

## About

This extension is meant to be used with any React frontend filesystem that hosts its components in /src/components, imports components via the following pattern: `<Components.{directory}.{directory}.{directory} />`, and hosts a list of possible import strings in a manifest.js file.

## Installation

  1. Fork/copy this repo
  2. Install the Visual Studio Code Extension Manager (vsce) locally `npm i vsce` or globally `npm i vsce -g`
  3. Build the extension locally `vsce package`
  4. Install the build with `code --install-extension ${filePath to .vsix file}`
