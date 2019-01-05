'use strict';
import * as vscode from 'vscode';
import {PathAutocomplete} from './features/PathAutocompleteProvider';

export function activate(context: vscode.ExtensionContext) {
    var selector : vscode.DocumentSelector = [{
        pattern: '**'
    }];
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new PathAutocomplete(), '<'));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
