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
        <i className="fa-solid fa-copy"></i>
      </button>
    );
  } 