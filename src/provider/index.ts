import * as vs from 'vscode';

// node modules
import * as fs from 'fs';
import * as path from 'path';

export class ComponentProvider implements vs.CompletionItemProvider {

  currentFile: string;
  currentLine: string;
  currentPosition: number;
  insideString: boolean;

  provideCompletionItems(document: vs.TextDocument, position: vs.Position, token: vs.CancellationToken): Thenable<vs.CompletionItem[]> {
    vs.window.showInformationMessage('hi');

    var currentLine = document.getText(document.lineAt(position).range);
    var self = this;

    this.currentFile = document.fileName;
    this.currentLine = currentLine;
    this.currentPosition = position.character;

    // here is where I would check if I should give the completion items
    const array = [];
    array.push(this.getUserInput(currentLine, position.character));
    vs.window.showInformationMessage(`${array}`);

    const userInput = this.getUserInput(currentLine, position.character);

    const workspaceRootPath = vs.workspace.workspaceFolders ? vs.workspace.workspaceFolders[0] : null;
    // fs.readFile(`${workspaceRootPath}/generator-creditor`)

    vs.window.showInformationMessage(`got root path`);
    vs.window.showInformationMessage(`${JSON.stringify(workspaceRootPath)}`);
    vs.window.showInformationMessage(`${workspaceRootPath.uri.fsPath}`);
    // const manifestTemplate = require(`${workspaceRootPath.uri.fsPath}/generator-creditor/manifest.js`);
    
    const paths = Object.keys(manifestTemplate);
    
    vs.window.showInformationMessage(`${paths}`);

    var completion = new vs.CompletionItem('thisisatest');
    completion.label = 'helphelphelp'

    return Promise.resolve([completion]);
  }

  getUserInput(currentLine: string, currentPosition: number): string {
    var importStartPosition = -1;

    for (var i = 0; i < currentPosition; i++) {
      if (currentLine[i] === '<') {
        importStartPosition = i;
        break;
      }
    }

    return currentLine.substring(importStartPosition + 1, currentPosition);
  }
}
