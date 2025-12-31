"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
let statusBarItem;
function activate(context) {
    // Create Status Bar Item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = undefined; // No command on click for now
    context.subscriptions.push(statusBarItem);
    // Register Events
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBar), vscode.window.onDidChangeTextEditorSelection(updateStatusBar));
    // Initial Update
    updateStatusBar();
}
exports.activate = activate;
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
    }
    else {
        statusBarItem.hide();
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map