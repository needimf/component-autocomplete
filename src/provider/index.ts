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

    const fileToString = fs.readFileSync(`${workspaceRootPath.uri.fsPath}/generator-creditor/.temp/manifest.js`, 'utf8').split('export default ');
    const manifestString = fileToString[1].replace(/\r?\n|\r|;/g, "");
    const manifest = JSON.parse(manifestString);
    
    const components = Object.keys(manifest).filter((key) => manifest[key] === 'component' && key.includes(userInput));

    return Promise.resolve(components.map((component) => {
      const suggestion = new vs.CompletionItem(component)
      suggestion.label = component;
      suggestion.detail = 'Scaffold';
      suggestion.insertText = `${component} />`;

      return suggestion;
    }));
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
