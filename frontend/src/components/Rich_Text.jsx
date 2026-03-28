import { useQuill } from 'react-quilljs';
import { useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import './Rich_Text.css';
import Quill from 'quill';

function Rich_Text({ value, setValue }) {
    const { quill, quillRef } = useQuill({
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }],
                ['link']
            ]
        }
    }, Quill);

    // Initialize editor and text-change handler
    useEffect(() => {
        if (!quill) return;

        const handler = () => {
            setValue(quill.root.innerHTML);
        };

        quill.on('text-change', handler);

        return () => {
            quill.off('text-change', handler);
        };
    }, [quill, setValue]);

    // Update editor if `value` changes from parent
    useEffect(() => {
        if (!quill) return;
        if (quill.root.innerHTML !== value) {
            quill.root.innerHTML = value;
        }
    }, [value, quill]);

    return <div ref={quillRef} className='rich_text_editor'/>;
}

export default Rich_Text;