import React from "react";

type PlusProps = {
  text: string;
};

export default function Plus({ text }: PlusProps) {
  return (
    <div className="text-sm rounded-full text-white bg-main-blue px-2 py-1">
      {text}
    </div>
  );
}
