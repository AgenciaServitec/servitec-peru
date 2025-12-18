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
  height = "400px",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
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

  const headingLevels = [1, 2, 3];

  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}

      <EditorWrapper $height={height} $hasError={!!error}>
        <Toolbar>
          <ToolbarGroup>
            {headingLevels.map((lvl) => (
              <Tooltip
                key={`h-${lvl}`}
                title={`Encabezado ${lvl}`}
                placement="bottom"
              >
                <ToolbarButton
                  type="button"
                  $active={editor.isActive("heading", { level: lvl })}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: lvl }).run()
                  }
                >
                  <FontAwesomeIcon icon={faHeading} />
                  <span style={{ marginLeft: 4 }}>{lvl}</span>
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

            <Tooltip title="Resaltar texto" placement="bottom">
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
            <Tooltip title="Lista con viñetas" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <FontAwesomeIcon icon={faListUl} />
              </ToolbarButton>
            </Tooltip>

            <Tooltip title="Lista numerada" placement="bottom">
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
            <Tooltip title="Alinear a la izquierda" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive({ textAlign: "left" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <FontAwesomeIcon icon={faAlignLeft} />
              </ToolbarButton>
            </Tooltip>

            <Tooltip title="Alinear al centro" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive({ textAlign: "center" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <FontAwesomeIcon icon={faAlignCenter} />
              </ToolbarButton>
            </Tooltip>

            <Tooltip title="Alinear a la derecha" placement="bottom">
              <ToolbarButton
                type="button"
                $active={editor.isActive({ textAlign: "right" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <FontAwesomeIcon icon={faAlignRight} />
              </ToolbarButton>
            </Tooltip>
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
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  margin-bottom: 8px;
  font-weight: ${({ theme }) => theme.font_weight.medium};
  color: ${({ theme }) => theme.colors.fontSecondary};
  font-size: ${({ theme }) => theme.font_sizes.x_small};
  background-color: ${({ theme }) => theme.colors.bgSecondary};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.border_radius.x_small};
`;

const EditorWrapper = styled.div<{ $height: string; $hasError: boolean }>`
  ${({ theme, $height, $hasError }) => css`
    border-radius: ${theme.border_radius.small};
    border: 1px solid ${$hasError ? theme.colors.error : theme.colors.border};
    background: ${theme.colors.bgSecondary};
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .tiptap-editor-content {
      min-height: ${$height};
    }
  `}
`;

const Toolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.paddings.x_small};
    padding: ${theme.paddings.x_small} ${theme.paddings.small};
    border-bottom: 1px solid ${theme.colors.border};
    background: ${theme.colors.bgTertiary};
  `}
`;

const ToolbarGroup = styled.div`
  display: inline-flex;
  gap: 4px;
  margin-right: 8px;
`;

const ToolbarButton = styled.button<{ $active?: boolean }>`
  ${({ theme, $active }) => css`
    border: none;
    padding: 4px 8px;
    border-radius: ${theme.border_radius.xx_small};
    font-size: ${theme.font_sizes.small};
    background: ${$active ? theme.colors.primaryAlpha : "transparent"};
    color: ${$active ? theme.colors.primary : theme.colors.fontSecondary};
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: ${theme.colors.primaryAlpha};
      color: ${theme.colors.primary};
    }
  `}
`;

const EditorContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    color: ${theme.colors.fontPrimary};
    padding: ${theme.paddings.small};

    .tiptap-editor-content {
      outline: none;

      p {
        margin: 0 0 0.5em;
      }

      a {
        color: ${theme.colors.fontLink};
        text-decoration: underline;

        &:hover {
          color: ${theme.colors.fontLinkHover};
        }
      }

      ul,
      ol {
        padding-left: 1.5em;
      }

      blockquote {
        border-left: 3px solid ${theme.colors.border};
        margin: 0.5em 0;
        padding-left: 0.75em;
        color: ${theme.colors.fontSecondary};
      }
    }
  `}
`;

const ErrorText = styled.span`
  ${({ theme }) => css`
    display: block;
    margin-top: 4px;
    color: ${theme.colors.error};
    font-size: ${theme.font_sizes.xxx_small};
  `}
`;
