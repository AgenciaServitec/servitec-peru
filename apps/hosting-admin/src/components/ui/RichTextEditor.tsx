import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faHeading,
  faHighlighter,
  faItalic,
  faListOl,
  faListUl,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "antd/lib/tooltip";

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
  height = "300px",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Highlight,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Escribe aquí...",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        id: name,
        class: "tiptap-editor-content",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const headingLevels = [1, 2, 3] as const;

  return (
    <Container>
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </Label>
      )}

      <EditorWrapper $height={height} $hasError={!!error}>
        <Toolbar>
          <ToolbarGroup>
            {headingLevels.map((lvl) => (
              <Tooltip key={`h-${lvl}`} title={`H${lvl}`} placement="bottom">
                <ToolbarButton
                  type="button"
                  $active={editor.isActive("heading", { level: lvl })}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: lvl }).run()
                  }
                >
                  <FontAwesomeIcon icon={faHeading} />
                  <span className="lvl-tag">{lvl}</span>
                </ToolbarButton>
              </Tooltip>
            ))}
          </ToolbarGroup>

          <ToolbarGroup>
            <Tooltip title="Negrita" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <FontAwesomeIcon icon={faBold} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Cursiva" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <FontAwesomeIcon icon={faItalic} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Subrayado" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <FontAwesomeIcon icon={faUnderline} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Tachado" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <FontAwesomeIcon icon={faStrikethrough} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Resaltar" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("highlight")}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
              >
                <FontAwesomeIcon icon={faHighlighter} />
              </ToolbarButton>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarGroup>
            <Tooltip title="Lista" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <FontAwesomeIcon icon={faListUl} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Numeración" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <FontAwesomeIcon icon={faListOl} />
              </ToolbarButton>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarButton
              type="button"
              $active={editor.isActive({ textAlign: "left" })}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </ToolbarButton>
            <ToolbarButton
              type="button"
              $active={editor.isActive({ textAlign: "center" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <FontAwesomeIcon icon={faAlignCenter} />
            </ToolbarButton>
            <ToolbarButton
              type="button"
              $active={editor.isActive({ textAlign: "right" })}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <FontAwesomeIcon icon={faAlignRight} />
            </ToolbarButton>
          </ToolbarGroup>
        </Toolbar>

        <EditorContainer>
          <EditorContent editor={editor} />
        </EditorContainer>
      </EditorWrapper>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    margin-bottom: ${theme.spacing.xs};
    font-weight: ${theme.font_weight.medium};
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.xs};
    padding: 0 ${theme.spacing.xs};

    .required {
      color: ${theme.colors.error};
      margin-left: 4px;
    }
  `}
`;

const EditorWrapper = styled.div<{ $height: string; $hasError: boolean }>`
  ${({ theme, $height, $hasError }) => css`
    border-radius: ${theme.border_radius.md};
    border: 1px solid ${$hasError ? theme.colors.error : theme.colors.border};
    background: ${theme.colors.bgSecondary};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all ${theme.transitions.fast};

    &:focus-within {
      border-color: ${$hasError ? theme.colors.error : theme.colors.primary};
      box-shadow: 0 0 0 2px
        ${$hasError ? `${theme.colors.error}26` : theme.colors.primaryAlpha};
    }

    .tiptap-editor-content {
      min-height: ${$height};
      padding: ${theme.spacing.md};
      outline: none;
    }
  `}
`;

const Toolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.border};
    background: ${theme.colors.bgTertiary};
  `}
`;

const ToolbarGroup = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    gap: 2px;
    padding-right: ${theme.spacing.xs};
    border-right: 1px solid ${theme.colors.border};

    &:last-child {
      border-right: none;
    }
  `}
`;

const ToolbarButton = styled.button<{ $active?: boolean }>`
  ${({ theme, $active }) => css`
    border: none;
    padding: 6px 10px;
    border-radius: ${theme.border_radius.xs};
    font-size: ${theme.font_sizes.sm};
    background: ${$active ? theme.colors.primaryAlpha : "transparent"};
    color: ${$active ? theme.colors.primary : theme.colors.fontSecondary};
    cursor: pointer;
    transition: all ${theme.transitions.fast};
    display: flex;
    align-items: center;
    justify-content: center;

    .lvl-tag {
      font-size: 10px;
      margin-left: 2px;
      font-weight: ${theme.font_weight.large};
    }

    &:hover {
      background: ${theme.colors.bgHover};
      color: ${theme.colors.primary};
    }

    ${$active &&
    css`
      &:hover {
        background: ${theme.colors.primaryAlpha};
      }
    `}
  `}
`;

const EditorContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    color: ${theme.colors.fontPrimary};
    flex: 1;

    .tiptap-editor-content {
      font-size: ${theme.font_sizes.sm};
      line-height: 1.6;

      p.is-editor-empty:first-child::before {
        color: ${theme.colors.fontTertiary};
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
      }

      h1,
      h2,
      h3 {
        margin: ${theme.spacing.md} 0 ${theme.spacing.xs};
        color: ${theme.colors.fontPrimary};
        line-height: 1.2;
      }

      ul,
      ol {
        padding-left: ${theme.spacing.lg};
        margin-bottom: ${theme.spacing.sm};
      }

      mark {
        background-color: ${theme.colors.primary}40;
        color: inherit;
        border-radius: 2px;
        padding: 0 2px;
      }
    }
  `}
`;

const ErrorText = styled.span`
  ${({ theme }) => css`
    display: block;
    margin-top: ${theme.spacing.xs};
    color: ${theme.colors.error};
    font-size: ${theme.font_sizes.xs};
    padding-left: ${theme.spacing.xs};
  `}
`;
