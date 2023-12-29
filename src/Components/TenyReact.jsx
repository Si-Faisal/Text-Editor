import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const TenyReact = () => {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    return (
        <>
        <div className='w-3/4 mx-auto my-16'>
        <Editor
          apiKey='yyc20b6e4umppefavb1840ffkmzwpe13rsu2tsbvc9vqbsum'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor. Remove it and typing here...</p>"
          init={{
            statusbar: false,
            height: 400,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <button className='btn btn-primary' onClick={log}>Console editor content</button>

        </div>
        
        
      </>
    );
};

export default TenyReact;