import Editor from '@monaco-editor/react';


type Props = {
  code: string;
  filename: string;
  onCodeChange: (code: string) => void;
  onFilenameChange: (filename: string) => void;
  currentLine?: number;
};

export function EditorPanel({ code, filename, onCodeChange, onFilenameChange, currentLine }: Props) {
  return (
    <div className="panel editor-panel">
      <div className="panel-header editor-topbar">
        <div>
          <p className="eyebrow">Source</p>
          <h2>Monaco IDE</h2>
        </div>
        <input value={filename} onChange={(e) => onFilenameChange(e.target.value)} className="filename-input" />
      </div>
      <div className="hint-line">{currentLine ? `Playback focus: instruction near address ${currentLine}` : 'Write SIMPLEX assembly or load a sample program.'}</div>
      <div className="editor-frame">
        <Editor
          height="min(70vh, 560px)"
          defaultLanguage="plaintext"
          value={code}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            smoothScrolling: true,
            padding: { top: 16 },
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            overviewRulerBorder: false,
            automaticLayout: true
          }}
          onChange={(value) => onCodeChange(value ?? '')}
        />
      </div>
    </div>
  );
}
