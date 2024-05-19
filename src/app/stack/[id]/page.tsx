"use client";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionItemLayout,
  AccordionTrigger,
} from "@/components/ui/accordion";
import styles from "./stackview.module.css";
import { motion, useDragControls } from "framer-motion";
interface Node {
  x: number;
  y: number;
}

interface IconTextProps {
  src: string;
  alt: string;
  text: string;
  className?: string;
}

const IconText: React.FC<IconTextProps> = ({ src, alt, text, className }) => (
  <div className={`flex gap-2 ${className}`}>
    <Image
      width={50}
      height={50}
      src={src}
      alt={alt}
      className="shrink-0 aspect-square w-[18px]"
    />
    <span>{text}</span>
  </div>
);

interface CardProps {
  title: string;
  iconSrc: string;
  iconAlt: string;
  description: string;
  maxTokens: string;
  apiBase: string;
  apiKey: string;
  temperature: string;
  //@ts-ignore
  handleMouseDown: (e) => void;
  dragControls: any;
}

const Card: React.FC<CardProps> = ({
  title,
  iconSrc,
  iconAlt,
  description,
  maxTokens,
  apiBase,
  apiKey,
  temperature,
  handleMouseDown,
  dragControls,
}) => (
  <motion.section
    className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full"
    drag
  >
    <div className="flex flex-col justify-center self-stretch my-auto max-md:mt-10">
      <div className="flex flex-col px-0.5 pt-px pb-5 w-full bg-white rounded-lg border border-solid border-slate-200">
        <div className="flex gap-3.5 px-7 py-6 text-sm font-medium text-gray-900 rounded-lg border-b border-solid bg-slate-50 border-slate-200 max-md:px-5">
          <Image
            width={50}
            height={50}
            src={iconSrc}
            alt={iconAlt}
            className="shrink-0 aspect-[0.94] w-[17px]"
          />
          <span>{title}</span>
        </div>
        <div className="self-start mt-6 ml-5 text-xs text-stone-500 text-opacity-80 max-md:ml-2.5">
          {description}
        </div>
        <div className="flex gap-0 mt-5">
          <div className="flex flex-col w-full">
            <div className="flex flex-col py-3.5 pr-1.5 pl-5 border-b border-solid bg-slate-50 border-slate-200">
              <span className="text-xs text-slate-900">Max Tokens</span>
              <span className="justify-center items-start px-3.5 py-3 mt-4 text-xs whitespace-nowrap bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                {maxTokens}
              </span>
            </div>
            <div className="flex flex-col py-3.5 pr-1.5 pl-5 mt-2.5 border-b border-solid bg-slate-50 border-slate-200">
              <span className="text-xs text-slate-900">OpenAI API Base</span>
              <span className="justify-center items-start px-3.5 py-2.5 mt-4 text-xs bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                {apiBase}
              </span>
            </div>
            <div className="flex flex-col py-3.5 pr-1 pl-5 mt-2.5 w-full border-b border-solid bg-slate-50 border-slate-200">
              <span className="text-xs text-slate-900">OpenAI API Key</span>
              <div className="flex gap-5 justify-between px-5 py-2 mt-4 text-xs bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                {/* TODO: make this input */}
                <span className="my-auto">{apiKey}</span>
                <Image
                  width={50}
                  height={50}
                  src="/visible-icon.png"
                  alt=""
                  className="shrink-0 aspect-[1.08] w-[15px]"
                />
              </div>
            </div>
            <div className="flex flex-col py-3.5 pr-1 pl-5 mt-2.5 w-full border-b border-solid bg-slate-50 border-slate-200">
              <span className="text-xs text-slate-900">Temperature</span>
              <div className="flex gap-5 justify-between px-5 py-2 mt-4 text-xs bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                {/* TODO: make this input */}
                <span className="my-auto">{temperature}</span>
                <Image
                  width={50}
                  height={50}
                  src="/visible-icon.png"
                  alt=""
                  className="shrink-0 aspect-[1.08] w-[15px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <span className="justify-center text-right w-full items-end px-5 py-3.5 mt-2.5 text-xs whitespace-nowrap border-b border-solid bg-slate-50 border-slate-200 text-slate-900 max-md:pl-5">
                OpenAI
              </span>
              <div onClick={handleMouseDown}>
                <Image
                  width={50}
                  height={50}
                  src="/nodeHook.png"
                  alt=""
                  className="shrink-0 self-start rounded-full border-2 border-indigo-700 border-solid h-[10px] stroke-[1.823px] w-[10px] max-md:mt-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

const MyComponent: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState<Node>({ x: 0, y: 0 });
  const [startNode, setStartNode] = useState<Node | null>(null);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      setIsDragging(true);
      setStartNode({ x: event.clientX, y: event.clientY });
    },
    [setIsDragging, setStartNode],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return;

      setMousePos({ x: event.clientX, y: event.clientY });
    },
    [isDragging, setMousePos],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setStartNode(null);
  }, [setIsDragging, setStartNode]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const cardsData = [
    {
      title: "OpenAI 3.5",
      iconSrc: "/chatgpt.svg",
      iconAlt: "OpenAI 3.5 Icon",
      description: "OpenAI large language models.",
      maxTokens: "256",
      apiBase: "Type something",
      apiKey: "Type something",
      temperature: "Type something",
    },
  ];

  const handleSaveClick = (): void => {
    console.log("Save button clicked");
  };
  const dragControls = useDragControls();

  return (
    <div className="flex flex-col bg-white">
      <header className="flex gap-5 px-6 py-3.5 w-full bg-white border border-solid border-slate-200 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-1 gap-2 my-auto text-lg font-semibold tracking-tight text-slate-900">
          <Image
            width={50}
            height={50}
            src="/icon.png"
            alt="GenAI Stack Logo"
            className="shrink-0 aspect-square w-[25px]"
          />
          <span>GenAI Stack</span>
        </div>
        <nav className="flex flex-1 gap-5 text-sm font-medium whitespace-nowrap justify-end">
          <button
            className="flex gap-2 justify-center px-3 py-1.5 rounded-md border border-solid border-black border-opacity-30 text-neutral-700"
            onClick={handleSaveClick}
          >
            <Image
              width={20}
              height={20}
              src="/save_icon.png"
              alt="Save Icon"
            />
            <span>Save</span>
          </button>
          <div className="flex justify-center items-center px-2.5 tracking-normal text-white bg-indigo-300 h-[30px] rounded-[100px] w-[30px]">
            {/* TODO: add user pfp */}S
          </div>
        </nav>
      </header>
      <main className="w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <aside className="flex flex-col w-[16%] max-md:ml-0 max-md:w-full">
            <nav className="flex flex-col grow px-4 pt-7 pb-20 mx-auto w-full text-xs bg-white border-r border-solid border-slate-200 text-slate-900">
              <button className="flex flex-col justify-center px-3.5 py-2.5 w-full text-base font-medium tracking-tight text-black bg-white rounded-lg border border-solid border-slate-200">
                <div className="flex  items-center gap-5 justify-between px-px">
                  <span>Chat With PDF</span>
                  <Image
                    width={50}
                    height={50}
                    src="/editIcon.png"
                    alt="Chat With PDF Icon"
                    className="shrink-0 self-start aspect-square w-[18px]"
                  />
                </div>
              </button>
              <div className="flex gap-5 justify-center px-px mt-7 w-full text-sm font-medium text-gray-900 whitespace-nowrap">
                <div className="w-full flex gap-3.5">
                  <Accordion className="w-full" type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-center items-center gap-[20px]">
                          <Image
                            width={50}
                            height={50}
                            src="/agentsIcon.png"
                            alt="Agents Icon"
                            className="shrink-0 aspect-square w-[18px]"
                          />
                          Agents
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <AccordionItemLayout text="Agents" />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <div className="flex gap-5 justify-between px-px mt-5 w-full text-sm font-medium text-gray-900 whitespace-nowrap">
                <div className="flex gap-3.5 w-full">
                  <Accordion className="w-full" type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-center items-center gap-[20px]">
                          <Image
                            width={50}
                            height={50}
                            src="/tools.png"
                            alt="Tools Icon"
                            className="shrink-0 aspect-square w-[18px]"
                          />
                          Tools
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {[
                          {
                            text: "Wikisearch",
                          },
                          {
                            text: "DuckDuck search",
                          },
                          {
                            text: "GMail",
                          },
                          {
                            text: "Github",
                          },
                        ].map(({ text }) => (
                          <AccordionItemLayout key={text} text={text} />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <div className="flex gap-5 justify-between px-px mt-5 w-full text-sm font-medium text-gray-900 whitespace-nowrap">
                <div className="flex gap-3.5 w-full">
                  <Accordion className="w-full" type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-center items-center gap-[20px]">
                          <Image
                            width={50}
                            height={50}
                            src="/llmsIcon.png"
                            alt="llms Icon"
                            className="shrink-0 aspect-square w-[18px]"
                          />
                          LLMs
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {[
                          {
                            text: "OpenAI 3.5",
                          },
                          {
                            text: "OpenAI 4",
                          },
                          {
                            text: "Azure OpenAI",
                          },
                        ].map(({ text }) => (
                          <AccordionItemLayout key={text} text={text} />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </nav>
          </aside>
          <section
            className={`flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full ${styles.bg}`}
          >
            <section className="flex flex-col grow mt-8 max-md:max-w-full">
              <div className="z-10 self-center px-5 max-w-full w-[773px]">
                <motion.div
                  className="flex gap-5 max-md:flex-col max-md:gap-0"
                  dragControls={dragControls}
                  dragListener={false}
                  drag
                >
                  {cardsData.map((cardData) => (
                    <Card
                      dragControls={dragControls}
                      key={cardData.title}
                      {...cardData}
                      handleMouseDown={handleMouseDown}
                    />
                  ))}
                </motion.div>
              </div>
            </section>
            <section className="flex flex-col ml-5 w-[19%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-96 max-md:mt-10">
                {/* <Image
                  width={50}
                  height={50}
                  alt=""
                  className="w-3.5 aspect-square"
                />
                <Image
                  width={50}
                  height={50}
                  alt="Decorative"
                  className="self-center mt-52 border border-black border-dashed aspect-[3.13] stroke-[1px] stroke-black w-[145px] max-md:mt-10"
                /> */}
              </div>
            </section>
            <section className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow pt-px pb-3 mx-auto w-full bg-white rounded-lg border border-solid border-slate-200">
                <div className="flex gap-3 px-6 py-5 text-sm font-medium text-gray-900 whitespace-nowrap rounded-lg border-b border-solid bg-slate-50 border-slate-200 max-md:px-5">
                  <span>Agents</span>
                </div>
                <div className="flex flex-col py-3.5 pr-1 pl-4 mt-3 border-b border-solid bg-slate-50 border-slate-200">
                  <span className="text-xs text-slate-900">Agent Name</span>
                  <span className="justify-center items-start px-3 py-2.5 mt-3.5 text-xs whitespace-nowrap bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                    writer
                  </span>
                </div>
                <div className="flex flex-col py-3.5 pr-1 pl-4 mt-2 border-b border-solid bg-slate-50 border-slate-200">
                  <span className="text-xs text-slate-900">Role</span>
                  <span className="justify-center items-start px-3 py-2.5 mt-3.5 text-xs bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                    summarising expert
                  </span>
                </div>
                <div className="flex flex-col py-3 pr-1 pl-4 mt-2.5 border-b border-solid bg-slate-50 border-slate-200">
                  <span className="text-xs text-slate-900">Goal</span>
                  <span className="justify-center items-start px-3 py-2.5 mt-4 text-xs bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                    summarize input into presentable points
                  </span>
                </div>
                <div className="flex flex-col py-3.5 pr-1 pl-4 mt-2.5 border-b border-solid bg-slate-50 border-slate-200">
                  <span className="text-xs text-slate-900">Backstory</span>
                  <span className="justify-center items-start px-3 py-2.5 mt-4 text-xs bg-white rounded border border-solid border-slate-200 text-stone-500 text-opacity-80 max-md:pr-5">
                    Expert in summarising the given text
                  </span>
                </div>
                <div className="flex gap-0 mt-3.5 text-xs whitespace-nowrap text-slate-900">
                  <div className="z-10 shrink-0 my-auto w-2 h-2 rounded-full border-2 border-lime-400 border-solid stroke-[1.685px]" />
                  <span className="grow justify-center items-start px-2.5 py-3.5 border-b border-solid bg-slate-50 border-slate-200 w-fit max-md:pr-5">
                    Agents
                  </span>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
      {isDragging && startNode && (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          <line
            x1={startNode.x}
            y1={startNode.y}
            x2={mousePos.x}
            y2={mousePos.y}
            stroke="black"
            strokeWidth="1"
            strokeDasharray="4"
          />
        </svg>
      )}
    </div>
  );
};

export default MyComponent;
