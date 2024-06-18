import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = forwardRef((props, ref) => {
    console.log("🚀 ~ TinyEditor ~ ref:", ref)
    console.log("🚀 ~ TinyEditor ~ props:", props)
    const editorRef = useRef();

    // if (ref) {
    useImperativeHandle(ref, () => ({ getEditorState: () => { return { content: editorRef.current.getContent() } } }), [editorRef]);
    // }

    return (
        <>
            <Editor
                licenseKey='gpl'
                tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={props.initialValue}
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
                }}
            />
        </>
    );
})

export default TinyEditor