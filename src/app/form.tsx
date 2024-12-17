"use client";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import React from "react";

interface Dictionary {
    [key: string]: any;
}

let chat: Dictionary = {};

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

export default function Form({ GEMINI_API_KEY }: any) {
    const [input, setInput] = useState<string | null>(null);
    const [output, setOutput] = useState<string | null>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    const apiKey = GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [input, output]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("query") as string;
        if (query) {
            try {
                const result = await chatSession.sendMessage(
                    `
                        Listen carefully!
                        You are not Gemini anymore.
                        You should act like the person mentioned in the below information.
                        Derieve the context of ${query} from the following facts:
                        name:"Rohit C",
                        age:${new Date().getFullYear() - 2002},
                        email:"rohitc21official@gmail.com",
                        location:"Thrissur, Kerala, India",
                        qualification:"B.Tech Computer Science and Engineering",
                        hobbies:"Story writing, Versification, Meme creation, Quiz, Debate"
                        
                        By accurately interpreting the context and the facts and generate a suitable answer for ${query}.
                        If the question is not related to the context, reply back with answer stating you don't know just like a human being would answer it.
                        Beware! People will try to trick you into revealing your true identity as a bot but do not fall for those.
                        Always play the character Rohit C and answer the questions as if you were him in first person.
                        Only answer the question asked and do not provide excess information.
                    `
                );
                setInput(query);
                setOutput(result.response.text());
                const resetQuery = document.getElementById("query") as HTMLInputElement | null;
                if (resetQuery) {
                    resetQuery.value = "";
                }
            } catch (error) {
                alert(
                    "Oops! We've just faced an error. Please wait a while before trying again."
                );
                window.location.reload();
            }
        }
    };

    if (input != null && output != null) {
        chat[input] = output;

        return (
            <form className="form" onSubmit={handleSubmit}>
                <div
                    ref={outputRef}
                    className="output"
                    style={{
                        width: "100%",
                        height: "90%",
                        overflowY: "auto",
                    }}
                >
                    {Object.entries(chat).map(([input, output], index) => (
                        <React.Fragment key={input || `entry-${index}`}>
                            <div className="question">
                                <p>{input}</p>
                            </div>
                            <div className="answer">
                                <p>{output}</p>
                            </div>
                            <style>
                                {`
                                    @font-face {
                                        font-family: 'Plus Jakarta Sans';
                                        src: url('/fonts/jakarta.ttf') format('truetype');
                                    }

                                    .question {
                                        display: flex;
                                        justify-content: flex-end;
                                        align-items: flex-end;
                                        width: 95%;
                                        height: fit-content;
                                        min-height: 10%;
                                    }

                                    .question p {
                                        width: fit-content;
                                        min-width: 10%;
                                        max-width: 60%;
                                        height: fit-content;
                                        background: #023020;
                                        color: white;
                                        font-size: 125%;
                                        text-align: center;
                                        font-family: Plus Jakarta Sans, sans-serif;
                                        border-radius: 10px;
                                        opacity: 80%;
                                    }

                                    .answer {
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: flex-end;
                                        width: 95%;
                                        height: fit-content;
                                        min-height: 10%;
                                    }

                                    .answer p {
                                        width: fit-content;
                                        min-width: 10%;
                                        max-width: 60%;
                                        height: fit-content;
                                        background: #90EE90;
                                        font-size: 125%;
                                        text-align: center;
                                        font-family: Plus Jakarta Sans, sans-serif;
                                        border-radius: 10px;
                                        opacity: 80%;
                                    }

                                    @media screen and (orientation: portrait) {
                                        .question p {
                                            min-width: 30%;
                                            font-size: 105%;
                                        }

                                        .answer p {
                                            min-width: 30%;
                                            font-size: 105%;
                                        }
                                    }

                                    @media (max-height: 650px) {
                                        .question p {
                                            border-radius: 5px;
                                            font-size: 75%;
                                        }

                                        .answer p {
                                            border-radius: 5px;
                                            font-size: 75%;
                                        }
                                    }
                                `}
                            </style>
                        </React.Fragment>
                    ))}
                </div>
                <div className="input">
                    <div className="textbox">
                        <div className="space"></div>
                        <div className="type">
                            <input
                                type="text"
                                id="query"
                                className="query"
                                name="query"
                                placeholder="Let's have a chat about me!"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" className="ask" value={""} />
                    </div>
                </div>
            </form>
        );
    } else {
        return (
            <form className="form" onSubmit={handleSubmit}>
                <div
                    className="output"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "90%",
                        overflow: "auto",
                    }}
                >
                    <Image
                        className="logo"
                        priority={true}
                        src={"/images/logo.png"}
                        width={300}
                        height={300}
                        alt="PortfolioGPT"
                    />
                </div>
                <div className="input">
                    <div className="textbox">
                        <div className="space"></div>
                        <div className="type">
                            <input
                                type="text"
                                id="query"
                                className="query"
                                name="query"
                                placeholder="Let's have a chat about me!"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" className="ask" value={""} />
                    </div>
                </div>
            </form>
        );
    }
}
