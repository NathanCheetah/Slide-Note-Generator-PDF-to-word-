import { useState, useRef, useCallback } from "react";

const ACCENT = "#1a6b4a";
const ACCENT_LIGHT = "#e8f5f0";
const ACCENT_MID = "#2d9468";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f7f6f3",
    fontFamily: "'Georgia', serif",
    padding: "0",
  },
  header: {
    background: "#1a1a18",
    color: "#f0ede6",
    padding: "2rem 3rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  headerIcon: {
    width: 44,
    height: 44,
    background: ACCENT,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: "-0.5px",
    color: "#f0ede6",
  },
  headerSub: {
    margin: "2px 0 0",
    fontSize: 14,
    color: "#888",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  main: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "2.5rem 2rem",
  },
  card: {
    background: "#fff",
    border: "1px solid #e4e2dc",
    borderRadius: 12,
    padding: "2rem",
    marginBottom: "1.5rem",
  },
  dropzone: {
    border: "2px dashed #c8c5bc",
    borderRadius: 10,
    padding: "3rem 2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    background: "#faf9f7",
  },
  dropzoneActive: {
    borderColor: ACCENT,
    background: ACCENT_LIGHT,
  },
  dropzoneText: {
    fontSize: 16,
    color: "#666",
    margin: "0.75rem 0 0",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  dropzoneHint: {
    fontSize: 13,
    color: "#999",
    margin: "0.5rem 0 0",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  fileList: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    background: "#f7f6f3",
    borderRadius: 8,
    border: "1px solid #e4e2dc",
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#333",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileSize: {
    fontSize: 12,
    color: "#999",
    fontFamily: "'Helvetica Neue', sans-serif",
    flexShrink: 0,
  },
  removeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    padding: "2px 4px",
    borderRadius: 4,
    fontSize: 16,
    lineHeight: 1,
    flexShrink: 0,
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "1rem",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    marginBottom: 6,
    fontWeight: 500,
  },
  select: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #d4d1c8",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    background: "#fff",
    color: "#333",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d4d1c8",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    background: "#fff",
    color: "#333",
    resize: "vertical",
    minHeight: 80,
    boxSizing: "border-box",
  },
  generateBtn: {
    width: "100%",
    padding: "14px",
    background: "#1a1a18",
    color: "#f0ede6",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "background 0.2s",
  },
  generateBtnDisabled: {
    background: "#ccc",
    cursor: "not-allowed",
  },
  progressCard: {
    background: "#fff",
    border: "1px solid #e4e2dc",
    borderRadius: 12,
    padding: "2rem",
    marginBottom: "1.5rem",
  },
  progressStep: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid #f0ede6",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginTop: 5,
    flexShrink: 0,
  },
  resultsCard: {
    background: "#fff",
    border: "1px solid #e4e2dc",
    borderRadius: 12,
    padding: "2rem",
    marginBottom: "1.5rem",
  },
  notesContainer: {
    fontFamily: "'Georgia', serif",
    lineHeight: 1.8,
    color: "#2a2a28",
  },
  h1: {
    fontSize: 22,
    fontWeight: 600,
    color: "#1a1a18",
    borderBottom: `3px solid ${ACCENT}`,
    paddingBottom: 8,
    marginBottom: 16,
    marginTop: 32,
  },
  h2: {
    fontSize: 18,
    fontWeight: 500,
    color: "#1a1a18",
    borderLeft: `3px solid ${ACCENT_MID}`,
    paddingLeft: 12,
    marginBottom: 12,
    marginTop: 24,
  },
  h3: {
    fontSize: 15,
    fontWeight: 500,
    color: "#444",
    marginBottom: 8,
    marginTop: 16,
  },
  bullet: {
    display: "flex",
    gap: 10,
    marginBottom: 6,
    fontSize: 14,
    alignItems: "flex-start",
  },
  bulletDot: {
    color: ACCENT,
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 1,
  },
  actionRow: {
    display: "flex",
    gap: 10,
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  actionBtn: {
    padding: "10px 18px",
    border: "1px solid #d4d1c8",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    background: "#fff",
    color: "#333",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 7,
    transition: "background 0.15s",
  },
  actionBtnPrimary: {
    background: ACCENT,
    color: "#fff",
    border: `1px solid ${ACCENT}`,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#888",
    margin: "0 0 1rem",
  },
};

function parsePDFText(arrayBuffer) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = async () => {
      try {
        const pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const text = content.items.map((item) => item.str).join(" ").trim();
          if (text) pages.push({ page: i, text });
        }
        resolve({ numPages: pdf.numPages, pages });
      } catch (e) {
        reject(e);
      }
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js"));
    if (!window.pdfjsLib) {
      document.head.appendChild(script);
    } else {
      script.onload();
    }
  });
}

function NoteRenderer({ markdown }) {
  const lines = markdown.split("\n");
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    if (line.startsWith("# ")) {
      elements.push(
        <div key={key++} style={styles.h1}>
          {line.slice(2)}
        </div>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <div key={key++} style={styles.h2}>
          {line.slice(3)}
        </div>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <div key={key++} style={styles.h3}>
          {line.slice(4)}
        </div>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={key++} style={styles.bullet}>
          <span style={styles.bulletDot}>•</span>
          <span style={{ fontSize: 14, lineHeight: 1.6 }}>{line.slice(2)}</span>
        </div>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)[1];
      elements.push(
        <div key={key++} style={styles.bullet}>
          <span style={{ ...styles.bulletDot, minWidth: 16 }}>{num}.</span>
          <span style={{ fontSize: 14, lineHeight: 1.6 }}>
            {line.replace(/^\d+\.\s/, "")}
          </span>
        </div>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p
          key={key++}
          style={{
            fontWeight: 600,
            fontSize: 14,
            margin: "8px 0 4px",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          {line.slice(2, -2)}
        </p>
      );
    } else {
      elements.push(
        <p
          key={key++}
          style={{
            fontSize: 14,
            margin: "4px 0",
            fontFamily: "'Helvetica Neue', sans-serif",
            color: "#444",
          }}
        >
          {line}
        </p>
      );
    }
  }
  return <div style={styles.notesContainer}>{elements}</div>;
}

export default function App() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [detail, setDetail] = useState("balanced");
  const [context, setContext] = useState("");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const addFiles = useCallback((newFiles) => {
    const pdfs = Array.from(newFiles).filter((f) => f.type === "application/pdf");
    if (pdfs.length === 0) {
      setError("Please upload PDF files only.");
      return;
    }
    setError("");
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...pdfs.filter((f) => !names.has(f.name))];
    });
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onFileInput = (e) => addFiles(e.target.files);

  const removeFile = (name) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const addProgress = (msg, type = "active") =>
    setProgress((prev) => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);

  const generate = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setProgress([]);
    setNotes("");
    setError("");

    try {
      addProgress(`Reading ${files.length} PDF file${files.length > 1 ? "s" : ""}...`);

      const allSlideData = [];
      for (const file of files) {
        addProgress(`Extracting text from "${file.name}"...`);
        const buffer = await file.arrayBuffer();
        const result = await parsePDFText(buffer);
        allSlideData.push({
          filename: file.name,
          numPages: result.numPages,
          pages: result.pages,
        });
      }

      const totalPages = allSlideData.reduce((s, f) => s + f.numPages, 0);
      addProgress(`Extracted ${totalPages} slides total. Sending to Claude AI...`);

      const detailInstructions = {
        concise: "Be very concise. 3-5 bullet points max per subtopic. Only the most critical info.",
        balanced: "Balanced detail. 5-8 bullet points per subtopic. Cover all key concepts.",
        detailed: "Be thorough. Cover all important points, definitions, formulas, and examples.",
      };

      const slidesText = allSlideData
        .map(
          (f) =>
            `=== FILE: ${f.filename} (${f.numPages} pages) ===\n` +
            f.pages.map((p) => `[Slide ${p.page}]: ${p.text}`).join("\n")
        )
        .join("\n\n");

      const prompt = `You are an expert academic note-taker. Convert the following presentation slides into clear, well-organised study notes.

${context ? `Context about this material: ${context}\n` : ""}
Detail level: ${detailInstructions[detail]}

Instructions:
1. Identify the overall subject and organise into 3-6 MAJOR TOPICS (use # headings)
2. Under each major topic, create SUBTOPICS (use ## headings) 
3. Under subtopics, add specific points or sub-subtopics (use ### and bullet points)
4. Extract ONLY important information: key concepts, definitions, formulas, processes, facts
5. Ignore slide numbers, headers/footers, decoration, navigation text
6. Use bullet points (- ) for facts and details
7. Group related content across slides, even if they're in different files
8. Start with a brief "# Overview" section summarising the whole content
9. Use plain markdown formatting only

Here are the slides:

${slidesText}

Generate comprehensive, structured notes now:`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("\n") || "";

      addProgress("Notes generated successfully!", "done");
      setNotes(text);
      setStatus("done");
    } catch (e) {
      setError(e.message || "Something went wrong.");
      addProgress("Error: " + (e.message || "Unknown error"), "error");
      setStatus("error");
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([notes], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lecture-notes.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTxt = () => {
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lecture-notes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(notes).catch(() => {});
  };

  const fmt = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const dotColor = (type) => {
    if (type === "done") return ACCENT;
    if (type === "error") return "#e24b4a";
    return "#999";
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1 style={styles.headerTitle}>Slide Notes Generator</h1>
          <p style={styles.headerSub}>
            Upload PDF slide decks → get organised, AI-structured notes
          </p>
        </div>
      </div>

      <div style={styles.main}>
        {status === "idle" || status === "error" ? (
          <>
            <div style={styles.card}>
              <p style={styles.sectionTitle}>Upload slides</p>

              <div
                style={{ ...styles.dropzone, ...(dragging ? styles.dropzoneActive : {}) }}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: "0 auto", display: "block" }}>
                  <rect width="40" height="40" rx="8" fill={dragging ? ACCENT_LIGHT : "#f0ede6"}/>
                  <path d="M20 26V14M14 20l6-6 6 6" stroke={dragging ? ACCENT : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 30h14" stroke={dragging ? ACCENT : "#bbb"} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p style={styles.dropzoneText}>
                  {dragging ? "Drop PDFs here" : "Drag & drop PDF files, or click to browse"}
                </p>
                <p style={styles.dropzoneHint}>
                  Upload as many slide decks as you like — all will be processed together
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  style={{ display: "none" }}
                  onChange={onFileInput}
                />
              </div>

              {files.length > 0 && (
                <div style={styles.fileList}>
                  {files.map((f) => (
                    <div key={f.name} style={styles.fileItem}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#e24b4a" strokeWidth="1.2"/>
                        <path d="M10 2v4h4" stroke="#e24b4a" strokeWidth="1.2"/>
                        <path d="M6 9h4M6 11h3" stroke="#e24b4a" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                      <span style={styles.fileName}>{f.name}</span>
                      <span style={styles.fileSize}>{fmt(f.size)}</span>
                      <button style={styles.removeBtn} onClick={() => removeFile(f.name)}>×</button>
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <p style={{ color: "#e24b4a", fontSize: 13, marginTop: 8, fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {error}
                </p>
              )}
            </div>

            <div style={styles.card}>
              <p style={styles.sectionTitle}>Options</p>
              <div style={styles.optionsGrid}>
                <div>
                  <label style={styles.label}>Detail level</label>
                  <select
                    style={styles.select}
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  >
                    <option value="concise">Concise — essentials only</option>
                    <option value="balanced">Balanced — key points</option>
                    <option value="detailed">Detailed — thorough coverage</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Subject context (optional)</label>
                  <textarea
                    style={{ ...styles.textarea, minHeight: 42 }}
                    placeholder="e.g. Undergraduate Computer Science, Data Structures module"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <button
              style={{
                ...styles.generateBtn,
                ...(files.length === 0 ? styles.generateBtnDisabled : {}),
              }}
              onClick={generate}
              disabled={files.length === 0}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M6 9.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Generate Notes from {files.length} file{files.length !== 1 ? "s" : ""}
            </button>
          </>
        ) : null}

        {(status === "processing" || status === "error") && progress.length > 0 && (
          <div style={styles.progressCard}>
            <p style={styles.sectionTitle}>Processing</p>
            {progress.map((p, i) => (
              <div key={i} style={{ ...styles.progressStep, borderBottom: i === progress.length - 1 ? "none" : undefined }}>
                <div style={{ ...styles.progressDot, background: dotColor(p.type) }} />
                <span style={{ color: p.type === "error" ? "#e24b4a" : "#333" }}>{p.msg}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#bbb", flexShrink: 0 }}>{p.time}</span>
              </div>
            ))}
            {status === "processing" && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#888" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid #ddd", borderTopColor: ACCENT, animation: "spin 0.8s linear infinite" }} />
                Working...
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
          </div>
        )}

        {status === "done" && notes && (
          <>
            <div style={styles.actionRow}>
              <button style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }} onClick={downloadMarkdown}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1v9M4 7l3.5 3.5L11 7M2 13h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Download Markdown
              </button>
              <button style={styles.actionBtn} onClick={downloadTxt}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1v9M4 7l3.5 3.5L11 7M2 13h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Download .txt
              </button>
              <button style={styles.actionBtn} onClick={copyToClipboard}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 5h3M1 5v8a1 1 0 001 1h7v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Copy to Clipboard
              </button>
              <button
                style={{ ...styles.actionBtn, marginLeft: "auto" }}
                onClick={() => { setStatus("idle"); setFiles([]); setNotes(""); setProgress([]); }}
              >
                ↩ Start Over
              </button>
            </div>
            <div style={styles.resultsCard}>
              <p style={{ ...styles.sectionTitle, marginBottom: "1.5rem" }}>
                Generated Notes — paste into Word or copy to your notes app
              </p>
              <NoteRenderer markdown={notes} />
            </div>
            <div style={{ ...styles.card, background: "#f7f6f3", border: "1px solid #e8e5dc" }}>
              <p style={{ fontSize: 13, color: "#888", fontFamily: "'Helvetica Neue', sans-serif", margin: 0 }}>
                💡 <strong>Tip:</strong> Paste the Markdown output into a tool like <a href="https://notion.so" style={{ color: ACCENT }}>Notion</a>, <a href="https://obsidian.md" style={{ color: ACCENT }}>Obsidian</a>, or <a href="https://typora.io" style={{ color: ACCENT }}>Typora</a> for formatted notes. To get a Word doc, paste into Google Docs → File → Download as .docx.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
