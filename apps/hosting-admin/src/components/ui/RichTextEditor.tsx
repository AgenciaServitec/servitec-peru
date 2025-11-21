import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styled from "styled-components";

interface RichTextEditorProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  height?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  height = "400px",
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <Container>
      {label && (
        <Label>
          {label}
          {required && <Required> *</Required>}
        </Label>
      )}
      <EditorWrapper height={height} hasError={!!error}>
        <ReactQuill
          theme="snow"
          value={value || ""}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Escribe aquí..."
        />
      </EditorWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Required = styled.span`
  color: #ff4d4f;
`;

const EditorWrapper = styled.div<{ height: string; hasError: boolean }>`
  .rich-text-editor .ql-toolbar {
    border: none;
    border-bottom: 1px solid
      ${({ hasError }) => (hasError ? "#ff4d4f" : "#303030")};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: #1f1f1f;
    color: #f0f0f0;
  }

  .rich-text-editor .ql-toolbar .ql-picker-label,
  .rich-text-editor .ql-toolbar .ql-stroke,
  .rich-text-editor .ql-toolbar .ql-fill {
    color: #f0f0f0;
    stroke: #f0f0f0;
  }

  .rich-text-editor .ql-container {
    border: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #141414;
    color: #f0f0f0;
    min-height: ${({ height }) => height};
  }

  .rich-text-editor .ql-editor {
    min-height: ${({ height }) => height};
  }

  .rich-text-editor .ql-editor.ql-blank::before {
    color: #8c8c8c;
    font-style: normal;
  }
`;

const ErrorText = styled.span`
  display: block;
  margin-top: 4px;
  color: #ff4d4f;
  font-size: 12px;
`;
