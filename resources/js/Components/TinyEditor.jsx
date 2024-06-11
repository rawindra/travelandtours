import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor({ onContentChange, initialValue }) {
    const editorRef = useRef(null);
    const handleEditorChange = (content) => {
        if (onContentChange) {
            onContentChange(content);
        }
    };

    return (
        <>
            <Editor
                licenseKey='gpl'
                tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialValue}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    setup: (editor) => {
                        editor.on('Change', () => {
                            handleEditorChange(editor.getContent());
                        });
                    }
                }}
            />
        </>
    );
}