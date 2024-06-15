"use client";
export interface Props {
    copyText: string;
  }
  
  export default function CopyBtn(props: Props) {
    return (
      <button
        onClick={() => {
          navigator.clipboard.writeText(props.copyText);
        }}
      >
        <i className="fa-regular fa-copy text-plum-300"></i>
      </button>
    );
  } 