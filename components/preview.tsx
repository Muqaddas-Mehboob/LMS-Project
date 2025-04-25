// "use client";

// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// import "react-quill/dist/quill.bubble.css";

// interface PreviewProps {
//     value: string;
// };

// export const Preview = ({

//     value
// }: PreviewProps) => {

//     // Import Quill w/o server side rendering to prevent hydration errors.
//     const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {
//         ssr: false
//     }), []);


//     return (
//         <ReactQuill
//         theme="bubble"
//         value={value}
//         readOnly={true}
//         />
//         // {/*<div className="bg-white dark:bg-slate-700">*/}
//         // {/* </div> */}
//     );
// }

"use client";

import dynamic from "next/dynamic";

// Quill CSS import
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
    value: string;
};

// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Preview = ({ value }: PreviewProps) => {
  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly={true}
    />
  );
};
