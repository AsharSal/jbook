import './code-editor.css';
import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    initialValue: string,
    onInputChange(value: string): void;

}

const CodeEditor: React.FC<CodeEditorProps> = ({ onInputChange, initialValue }) => {


    const handleEditorChange = (value: any, event: any) => {
        // Update the state with the new value
        onInputChange(value);
    };

    return <Editor
        onChange={handleEditorChange}
        value={initialValue}
        theme="vs-dark" language='javascript' width="50%" height="100%" options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,

        }} />;
}

export default CodeEditor;