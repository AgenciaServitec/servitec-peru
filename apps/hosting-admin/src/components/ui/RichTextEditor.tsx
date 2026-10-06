import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Menu as AntMenu } from "antd";
import { Dropdown, Tooltip } from "../../components"; // Asegúrate de que esta ruta sea correcta
// Importamos los iconos lineales y modernos de Lucide
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";

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
        heading: { levels: [1, 2, 3, 4] },
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

  const headingMenu = (
    <AntMenu
      onClick={({ key }) => {
        if (key === "p") editor.chain().focus().setParagraph().run();
        else
          editor
            .chain()
            .focus()
            .toggleHeading({ level: Number(key) as any })
            .run();
      }}
      items={[
        { key: "p", label: "Texto normal", icon: <Pilcrow size={14} /> },
        { key: "1", label: "Heading 1", icon: <Heading1 size={14} /> },
        { key: "2", label: "Heading 2", icon: <Heading2 size={14} /> },
        { key: "3", label: "Heading 3", icon: <Heading3 size={14} /> },
        { key: "4", label: "Heading 4", icon: <Heading4 size={14} /> },
      ]}
    />
  );

  const listMenu = (
    <AntMenu
      onClick={({ key }) => {
        if (key === "bullet") editor.chain().focus().toggleBulletList().run();
        if (key === "ordered") editor.chain().focus().toggleOrderedList().run();
      }}
      items={[
        {
          key: "bullet",
          label: "Lista con viñetas",
          icon: <List size={14} />,
        },
        {
          key: "ordered",
          label: "Lista numerada",
          icon: <ListOrdered size={14} />,
        },
      ]}
    />
  );

  return (
    <Container>
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </Label>
      )}

      <EditorWrapper $hasError={!!error}>
        <Toolbar>
          <ToolbarGroup>
            <Tooltip title="Deshacer">
              <ToolbarButton
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo2 size={16} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Rehacer">
              <ToolbarButton
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo2 size={16} />
              </ToolbarButton>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarGroup>
            <Dropdown overlay={headingMenu} trigger={["click"]}>
              <Tooltip title="Títulos">
                <ToolbarButton
                  type="button"
                  $active={editor.isActive("heading")}
                >
                  <Heading1 size={16} style={{ marginRight: 4 }} />
                  <ChevronDown size={12} />
                </ToolbarButton>
              </Tooltip>
            </Dropdown>

            <Dropdown overlay={listMenu} trigger={["click"]}>
              <Tooltip title="Listas">
                <ToolbarButton
                  type="button"
                  $active={
                    editor.isActive("bulletList") ||
                    editor.isActive("orderedList")
                  }
                >
                  {editor.isActive("orderedList") ? (
                    <ListOrdered size={16} style={{ marginRight: 4 }} />
                  ) : (
                    <List size={16} style={{ marginRight: 4 }} />
                  )}
                  <ChevronDown size={12} />
                </ToolbarButton>
              </Tooltip>
            </Dropdown>
          </ToolbarGroup>

          <ToolbarGroup>
            <Tooltip title="Negrita">
              <ToolbarButton
                type="button"
                $active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold size={16} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Cursiva">
              <ToolbarButton
                type="button"
                $active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic size={16} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Subrayado">
              <ToolbarButton
                type="button"
                $active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon size={16} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Tachado">
              <ToolbarButton
                type="button"
                $active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough size={16} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Resaltar">
              <ToolbarButton
                type="button"
                $active={editor.isActive("highlight")}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
              >
                <Highlighter size={16} />
              </ToolbarButton>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarGroup>
            <Tooltip title="Alinear a la izquierda">
              <ToolbarButton
                type="button"
                $active={editor.isActive({ textAlign: "left" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <AlignLeft size={16} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Alinear al centro">
              <ToolbarButton
                type="button"
                $active={editor.isActive({ textAlign: "center" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <AlignCenter size={16} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Alinear a la derecha">
              <ToolbarButton
                type="button"
                $active={editor.isActive({ textAlign: "right" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <AlignRight size={16} />
              </ToolbarButton>
            </Tooltip>
          </ToolbarGroup>
        </Toolbar>

        <EditorContainer $height={height}>
          <EditorContent editor={editor} />
        </EditorContainer>
      </EditorWrapper>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

/* --- ESTILOS ALINEADOS AL THEME --- */

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
    color: ${theme.colors.fontPrimary}; /* Label visible */
    font-size: ${theme.font_sizes.sm};

    .required {
      color: ${theme.colors.error};
      margin-left: 4px;
    }
  `}
`;

const EditorWrapper = styled.div<{ $hasError: boolean }>`
  ${({ theme, $hasError }) => css`
    border-radius: ${theme.border_radius.md};
    border: 1px solid ${$hasError ? theme.colors.error : theme.colors.border};
    background: ${theme.colors.bgSecondary};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all ${theme.transitions.fast};

    &:focus-within {
      border-color: ${$hasError ? theme.colors.error : theme.colors.primary};
      box-shadow: 0 0 0 1px
        ${$hasError ? theme.colors.error : theme.colors.primary};
    }
  `}
`;

const Toolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    padding: ${theme.spacing.xs};
    background: ${theme.colors
      .bgTertiary}; /* Fondo diferenciado tipo Tiptap UI */
    border-bottom: 1px solid ${theme.colors.border};
  `}
`;

const ToolbarGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 0 8px;
    border-right: 1px solid ${theme.colors.border};

    &:last-child {
      border-right: none;
    }
  `}
`;

const ToolbarButton = styled.button<{ $active?: boolean }>`
  ${({ theme, $active }) => css`
    border: none;
    padding: 6px;
    border-radius: ${theme.border_radius.xs};
    background: ${$active ? theme.colors.bgHover : "transparent"};
    color: ${$active ? theme.colors.primary : theme.colors.fontSecondary};
    cursor: pointer;
    transition: all ${theme.transitions.fast};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      background: ${theme.colors.bgHover};
      color: ${theme.colors.fontPrimary};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`;

const EditorContainer = styled.div<{ $height: string }>`
  ${({ theme, $height }) => css`
    background: ${theme.colors.bgSecondary};
    color: ${theme.colors.fontPrimary};
    flex: 1;

    .tiptap-editor-content {
      min-height: ${$height};
      padding: ${theme.spacing.md};
      outline: none;
      font-size: ${theme.font_sizes.sm};
      line-height: 1.6;

      /* Placeholder Tiptap */
      p.is-editor-empty:first-child::before {
        color: ${theme.colors.fontTertiary};
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
      }

      h1,
      h2,
      h3,
      h4 {
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
        background-color: ${theme.colors.primaryAlpha};
        color: ${theme.colors.primary};
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
  `}
`;
