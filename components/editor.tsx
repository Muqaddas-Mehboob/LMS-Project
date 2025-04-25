// "use client";

// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// import "react-quill/dist/quill.snow.css";

// interface EditorProps {
//   onChange: (value: string) => void;
//   value: string;
// };

// export const Editor = ({
//   onChange,
//   value,
// }: EditorProps) => {
//   const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

//   return (
//     <div className="bg-white">
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   );
// };

"use client";

import dynamic from "next/dynamic";

// Quill CSS import
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

// Dynamically import ReactQuill with ssr: false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
