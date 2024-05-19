import Image from "next/image";
import * as React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`flex gap-2 justify-center px-4 py-2.5 text-sm font-medium tracking-normal text-white rounded-lg ${className}`}
  >
    {children}
  </button>
);

type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({ children, className }) => (
  <div
    className={`flex justify-center items-center px-2.5 text-sm font-medium tracking-normal text-white whitespace-nowrap rounded-[100px] h-[30px] w-[30px] ${className}`}
  >
    {children}
  </div>
);

function NewStackBtn() {
  return (
    <Button className="mt-8 bg-green-600">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6663 8.66658H8.66634V12.6666H7.33301V8.66658H3.33301V7.33325H7.33301V3.33325H8.66634V7.33325H12.6663V8.66658Z"
          fill="white"
        />
      </svg>
      <span>New Stack</span>
    </Button>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-20 bg-slate-50">
      <header className="flex gap-5 justify-between self-stretch px-14 py-3.5 w-full bg-white border border-solid border-slate-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2 my-auto text-lg font-semibold tracking-tight text-slate-900">
          <Image
            alt=""
            src="/icon.png"
            className="shrink-0 aspect-square"
            width="25"
            height="25"
          />
          <span className="flex-auto my-auto">GenAI Stack</span>
        </div>
        <IconButton className="bg-indigo-300">S</IconButton>
      </header>

      <section className="flex gap-5 px-5 mt-7 w-full max-w-[1336px] max-md:flex-wrap max-md:max-w-full">
        <h1 className="flex-auto my-auto text-2xl font-semibold tracking-tighter leading-7 text-slate-900">
          My Stacks
        </h1>
        <NewStackBtn />
      </section>

      <hr className="shrink-0 mt-4 max-w-full h-0.5 bg-slate-200 w-[1332px]" />

      <section className="flex flex-col justify-center px-10 py-11 mt-48 max-w-full text-sm font-medium bg-white rounded-3xl border border-solid border-slate-200 w-[607px] max-md:px-5 max-md:mt-10">
        <h2 className="text-2xl font-semibold text-black max-md:max-w-full">
          Create New Stack
        </h2>
        <p className="mt-3 leading-[143%] text-stone-500 max-md:max-w-full">
          Start building your generative AI apps with our essential tools and
          frameworks
        </p>
        <NewStackBtn />
      </section>
    </div>
  );
}
