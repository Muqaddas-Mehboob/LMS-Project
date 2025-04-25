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

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// interface EditorProps {
//   onChange: (value: string) => void;
//   value: string;
// }

// // Dynamically import ReactQuill with SSR disabled
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// export const Editor = ({ onChange, value }: EditorProps) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <div className="text-sm text-gray-500">Loading editor...</div>;
//   }

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

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Prevent SSR with dynamic import
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Editor = ({ value, onChange }: EditorProps) => {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading editor...</div>; // Loading state until mounted

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
