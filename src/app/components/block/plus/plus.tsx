import React from "react";

type PlusProps = {
  text: string;
};

export default function Plus({ text }: PlusProps) {
  return (
    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
      {text}
    </div>
  );
}
