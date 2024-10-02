'use client'


import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Underline from '@tiptap/extension-underline'
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, HeadingIcon, NotepadTextIcon, ListIcon, LinkIcon, ImageIcon, CodeIcon } from "lucide-react";
import FontFamily from '@tiptap/extension-font-family'
import Heading from '@tiptap/extension-heading'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { Heading1Icon, Heading2Icon, Heading3Icon } from 'lucide-react';
import { UploadButton } from "@/utils/uploadthing"
import { useEffect } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import { ImageButton } from './gallery'

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const addImage = useCallback((url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])
  if (!editor) {
    return null
  }
  
  return (
    <div className="bg-background rounded-lg border p-2 w-full max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          
          <Button size="icon" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>
            <BoldIcon className="w-5 h-5" />
            <span className="sr-only">Bold</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>
            <ItalicIcon className="w-5 h-5" />
            <span className="sr-only">Italic</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()}>
            <UnderlineIcon className="w-5 h-5" />
            <span className="sr-only">Underline</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()}>
            <StrikethroughIcon className="w-5 h-5" />
            <span className="sr-only">Strikethrough</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1Icon className="w-5 h-5" />
            <span className="sr-only">Heading 1</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2Icon className="w-5 h-5" />
            <span className="sr-only">Heading 2</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3Icon className="w-5 h-5" />
            <span className="sr-only">Heading 3</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().setParagraph().run()} disabled={true}>
            <NotepadTextIcon className="w-5 h-5" />
            <span className="sr-only">Paragraph</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().chain().focus().toggleBulletList().run()}>
            <ListIcon className="w-5 h-5" />
            <span className="sr-only">List</span>
          </Button>
          <Button size="icon" onClick={setLink} >
            <LinkIcon className="w-5 h-5" />
            <span className="sr-only">Link</span>
          </Button>
          <Button size="icon" onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()}>
            <CodeIcon className="w-5 h-5" />
            <span className="sr-only">Code</span>
          </Button>
          <ImageButton onSelectImage={addImage} />
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={(value) => editor.chain().focus().setFontFamily(value).run()}>
            <SelectTrigger className="w-[100px] bg-background">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Comic Sans MS, Comic Sans">Comic Sans</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="monospace">Monospace</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[80px] bg-background">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="14">14</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="18">18</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          <div />
        </div>
      </div>
    </div>
  );
};

const extensions = [
  Color,
  TextStyle,
  Underline,
  Link,
  Image,
  FontFamily,
  Document,
  Paragraph,
  Text,
  ImageResize,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h2>
  Please enter the text for your question.
</h2>
`;

export const App = () => {
  const editor = useEditor({
    extensions: extensions,
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="dark:prose-invert prose element bg-background rounded-lg border p-6 w-full max-w-4xl">
        
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={content}
        ></EditorProvider>
      </div>
  </div> 
  );
};

export default App;