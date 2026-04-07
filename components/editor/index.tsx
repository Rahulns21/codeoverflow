'use client'

import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor'
import { basicDark } from 'cm6-theme-basic-dark'
import '@mdxeditor/editor/style.css'
import './dark-editor.css'
import { useTheme } from 'next-themes'

interface Props {
    value: string;
    editorRef: ForwardedRef<MDXEditorMethods> | null;
    fieldChange: (value: string) => void;
}

const Editor = ({
    value,
    editorRef,
    fieldChange,
  ...props
}: Props) => {
    const { resolvedTheme } = useTheme();

    const theme = resolvedTheme === "dark" ? [basicDark] : [];

  return (
    <MDXEditor
        {...props}
        key={resolvedTheme}
        markdown={value}
        ref={editorRef}
        className='background-light800_dark200 light-border-2 grid
        markdown-editor dark-editor w-full border rounded-lg focus:outline-none'
        onChange={fieldChange}
        plugins={[
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
            imagePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: ''}),
            codeMirrorPlugin({
                codeBlockLanguages: {
                    css: 'css',
                    txt: 'txt',
                    sql: 'sql',
                    html: 'html',
                    saas: 'saas',
                    scss: 'scss',
                    bash: 'bash',
                    json: 'json',
                    js: 'javascript',
                    ts: 'typescript',
                    tsx: 'TypeScript (React)',
                    jsx: 'JavaScript (React)',
                    "": 'unspecified'
                },
                autoLoadLanguageSupport: true,
                codeMirrorExtensions: theme,
            }),
            diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
            toolbarPlugin({
                toolbarContents: () => (
                    <ConditionalContents 
                        options={[
                            {
                                when: (editor) => editor?.editorType === 'codeblock',
                                contents: () => <ChangeCodeMirrorLanguage />
                            },
                            {
                                fallback: () => (
                                    <>
                                        <UndoRedo />
                                        <Separator />

                                        <BoldItalicUnderlineToggles />
                                        <Separator />

                                        <ListsToggle />
                                        <Separator />

                                        <CreateLink />
                                        <InsertImage />
                                        <Separator />

                                        <InsertTable />
                                        <InsertThematicBreak />

                                        <InsertCodeBlock />
                                    </>
                                )
                            }
                        ]}
                    />
                )
            })
        ]}
    />
  )
}

export default Editor;