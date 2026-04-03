import Editor, { OnMount } from '@monaco-editor/react';
import { AlertTriangle, FileCode2, LocateFixed } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import type * as Monaco from 'monaco-editor';

type DiagnosticMarker = {
  lineNumber: number;
  message: string;
  severity?: 'error' | 'warning' | 'info';
};

type Props = {
  code: string;
  filename: string;
  onCodeChange: (code: string) => void;
  onFilenameChange: (filename: string) => void;
  currentLine?: number;
  diagnostics?: DiagnosticMarker[];
};

export function EditorPanel({
  code,
  filename,
  onCodeChange,
  onFilenameChange,
  currentLine,
  diagnostics = []
}: Props) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const decorationIdsRef = useRef<string[]>([]);

  const statusText = useMemo(() => {
    if (diagnostics.length > 0) {
      return `${diagnostics.length} diagnostic${diagnostics.length > 1 ? 's' : ''} detected in source.`;
    }
    if (currentLine !== undefined) {
      return `Playback focus: instruction near address ${currentLine}`;
    }
    return 'Write SIMPLEX assembly or load a sample program.';
  }, [currentLine, diagnostics.length]);

  const firstDiagnosticLine = diagnostics[0]?.lineNumber;

  const monacoSeverity = (severity?: 'error' | 'warning' | 'info') => {
    if (!monacoRef.current) return 8;
    switch (severity) {
      case 'warning':
        return monacoRef.current.MarkerSeverity.Warning;
      case 'info':
        return monacoRef.current.MarkerSeverity.Info;
      default:
        return monacoRef.current.MarkerSeverity.Error;
    }
  };

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.updateOptions({
      cursorSmoothCaretAnimation: 'on',
      renderLineHighlight: 'all',
      roundedSelection: true
    });
  };

  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (!editor || !monaco) return;

    const model = editor.getModel();
    if (!model) return;

    if (diagnostics.length > 0) {
      monaco.editor.setModelMarkers(
        model,
        'simplex-diagnostics',
        diagnostics.map((d) => ({
          startLineNumber: d.lineNumber,
          endLineNumber: d.lineNumber,
          startColumn: 1,
          endColumn: 999,
          message: d.message,
          severity: monacoSeverity(d.severity)
        }))
      );
    } else {
      monaco.editor.setModelMarkers(model, 'simplex-diagnostics', []);
    }
  }, [diagnostics]);

  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const lineToHighlight = firstDiagnosticLine ?? currentLine;
    if (!lineToHighlight) return;

    decorationIdsRef.current = editor.deltaDecorations(
      decorationIdsRef.current,
      [
        {
          range: new monaco.Range(lineToHighlight, 1, lineToHighlight, 1),
          options: {
            isWholeLine: true,
            className: firstDiagnosticLine
              ? 'editor-line-error'
              : 'editor-line-runtime',
            glyphMarginClassName: firstDiagnosticLine
              ? 'editor-glyph-error'
              : 'editor-glyph-runtime',
            linesDecorationsClassName: firstDiagnosticLine
              ? 'editor-line-decoration-error'
              : 'editor-line-decoration-runtime'
          }
        }
      ]
    );

    editor.revealLineInCenter(lineToHighlight);
  }, [currentLine, firstDiagnosticLine]);

  return (
    <div className="panel editor-panel">
      <div className="panel-header editor-topbar">
        <div>
          <p className="eyebrow">Source</p>
          <h2>Monaco IDE</h2>
        </div>

        <div className="editor-toolbar">
          <div className="editor-chip">
            <FileCode2 size={14} />
            <span>{filename || 'program.asm'}</span>
          </div>

          {currentLine !== undefined && (
            <div className="editor-chip runtime">
              <LocateFixed size={14} />
              <span>PC {currentLine}</span>
            </div>
          )}

          {diagnostics.length > 0 && (
            <div className="editor-chip danger">
              <AlertTriangle size={14} />
              <span>{diagnostics.length} issue{diagnostics.length > 1 ? 's' : ''}</span>
            </div>
          )}

          <input
            value={filename}
            onChange={(e) => onFilenameChange(e.target.value)}
            className="filename-input"
            placeholder="program.asm"
          />
        </div>
      </div>

      <div className={`hint-line ${diagnostics.length > 0 ? 'hint-line-error' : ''}`}>
        {statusText}
      </div>

      <div className="editor-frame">
        <Editor
          height="min(70vh, 560px)"
          defaultLanguage="plaintext"
          value={code}
          theme="vs-dark"
          onMount={handleMount}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            smoothScrolling: true,
            padding: { top: 16 },
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            overviewRulerBorder: false,
            automaticLayout: true,
            glyphMargin: true,
            lineNumbersMinChars: 3,
            folding: true,
            bracketPairColorization: { enabled: true }
          }}
          onChange={(value) => onCodeChange(value ?? '')}
        />
      </div>
    </div>
  );
}