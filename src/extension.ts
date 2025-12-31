import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

    // Create Status Bar Item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = undefined; // No command on click for now
    context.subscriptions.push(statusBarItem);

    // Register Events
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
        vscode.window.onDidChangeTextEditorSelection(updateStatusBar)
    );

    // Initial Update
    updateStatusBar();
}

function updateStatusBar() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        statusBarItem.hide();
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (text && text.length > 0) {
        // Simple word count logic: split by whitespace and filter empty strings
        const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const charCount = text.length;
        statusBarItem.text = `$(list-selection) ${wordCount} Words, ${charCount} Chars`;
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

export function deactivate() { }
