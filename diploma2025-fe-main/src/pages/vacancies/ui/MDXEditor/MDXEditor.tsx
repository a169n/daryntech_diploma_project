import React, { memo } from "react";
import "@mdxeditor/editor/style.css";
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor as MDXEditorComponent,
  SandpackConfig,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

interface CustomMDXEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
    },
  ],
};

const MDXEditor: React.FC<CustomMDXEditorProps> = ({
  markdown,
  setMarkdown,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        minHeight: "200px",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <MDXEditorComponent
        lexicalTheme={{
          blockCursor: "underline",
          tabSize: 2,
        }}
        markdown={markdown}
        onChange={(value) => setMarkdown(value || "")}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              txt: "text",
              tsx: "TypeScript",
            },
          }),
          tablePlugin(),
          quotePlugin(),
          imagePlugin(),
          thematicBreakPlugin(),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          diffSourcePlugin({
            diffMarkdown: "An older version",
            viewMode: "rich-text",
          }),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          frontmatterPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <CodeToggle />
                <InsertThematicBreak />
                <BlockTypeSelect />
                <ListsToggle />
                <InsertAdmonition />
                <InsertFrontmatter />
                <InsertCodeBlock />
                <UndoRedo />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  );
};

export default memo(MDXEditor);
