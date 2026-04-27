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
  faChevronDown,
  faHeading,
  faHighlighter,
  faItalic,
  faListOl,
  faListUl,
  faRedo,
  faStrikethrough,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Tooltip } from "../../components";
import { Menu as AntMenu } from "antd";

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
        { key: "p", label: "Texto normal" },
        { key: "1", label: "Heading 1" },
        { key: "2", label: "Heading 2" },
        { key: "3", label: "Heading 3" },
        { key: "4", label: "Heading 4" },
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
          icon: <FontAwesomeIcon icon={faListUl} />,
        },
        {
          key: "ordered",
          label: "Lista numerada",
          icon: <FontAwesomeIcon icon={faListOl} />,
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

      <EditorWrapper $height={height} $hasError={!!error}>
        <Toolbar>
          <ToolbarGroup>
            <Tooltip title="Deshacer">
              <ToolbarButton
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
              >
                <FontAwesomeIcon icon={faUndo} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Rehacer">
              <ToolbarButton
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
              >
                <FontAwesomeIcon icon={faRedo} />
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
                  <FontAwesomeIcon
                    icon={faHeading}
                    style={{ marginRight: 4 }}
                  />
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ fontSize: 10 }}
                  />
                </ToolbarButton>
              </Tooltip>
            </Dropdown>
          </ToolbarGroup>

          <ToolbarGroup>
            <Dropdown overlay={listMenu} trigger={["click"]}>
              <Tooltip title="Listas">
                <ToolbarButton
                  type="button"
                  $active={
                    editor.isActive("bulletList") ||
                    editor.isActive("orderedList")
                  }
                >
                  <FontAwesomeIcon
                    icon={editor.isActive("orderedList") ? faListOl : faListUl}
                    style={{ marginRight: 4 }}
                  />
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ fontSize: 10 }}
                  />
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
                <FontAwesomeIcon icon={faBold} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Cursiva">
              <ToolbarButton
                type="button"
                $active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <FontAwesomeIcon icon={faItalic} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Subrayado">
              <ToolbarButton
                type="button"
                $active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <FontAwesomeIcon icon={faUnderline} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Tachado">
              <ToolbarButton
                type="button"
                $active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <FontAwesomeIcon icon={faStrikethrough} />
              </ToolbarButton>
            </Tooltip>
            <Tooltip title="Resaltar">
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
            <Tooltip title="Izquierda">
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
            <Tooltip title="Centro">
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
            <Tooltip title="Derecha">
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

        <EditorContainer $height={height}>
          <EditorContent editor={editor} />
        </EditorContainer>
      </EditorWrapper>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

/* --- ESTILOS --- */

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
    color: ${theme.colors.fontTertiary};
    font-size: ${theme.font_sizes.xs};
    padding: 0 ${theme.spacing.xs};
    background-color: ${theme.colors.bgPrimary};
    border-radius: ${theme.border_radius.xs};

    .required {
      color: ${theme.colors.error};
      margin-left: 4px;
    }
  `}
`;

const EditorWrapper = styled.div<{ $height: string; $hasError: boolean }>`
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
      box-shadow: 0 0 0 2px
        ${$hasError ? `${theme.colors.error}26` : theme.colors.primaryAlpha};
    }
  `}
`;

const Toolbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    padding: 6px;
    border-bottom: 1px solid ${theme.colors.border}40;
    background: #111;
  `}
`;

const ToolbarGroup = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 0 4px;
    border-right: 1px solid ${theme.colors.border}20;

    &:last-child {
      border-right: none;
    }
  `}
`;

const ToolbarButton = styled.button<{ $active?: boolean }>`
  ${({ theme, $active }) => css`
    border: none;
    padding: 7px 9px;
    border-radius: 6px;
    font-size: 14px;
    background: ${$active ? "#222" : "transparent"};
    color: ${$active ? theme.colors.primary : "#999"};
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #222;
      color: #fff;
    }

    ${$active &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.colors.primary}30;
    `}
  `}
`;

const EditorContainer = styled.div<{ $height: string }>`
  ${({ theme, $height }) => css`
    background: ${theme.colors.bgSecondary};
    color: ${theme.colors.fontPrimary};
    flex: 1;

    .tiptap-editor-content {
      min-height: ${$height};
      padding: ${theme.spacing.md}; /* <--- REINTEGRADO EL PADDING */
      outline: none;
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
