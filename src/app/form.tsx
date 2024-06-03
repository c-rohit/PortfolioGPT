"use client"
import Image from "next/image";
import { FormEvent, useState } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

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
    const [input, setInput] = useState<string | null>(null)
    const [output, setOutput] = useState<string | null>(null)

    const info={
        name:"Rohit C",
        age:(new Date().getFullYear())-2002,
        email:"rohitc21official@gmail.com",
        location:"Thrissur, Kerala, India",
        qualification:"B.Tech Computer Science and Engineering",
        education:{
            college:{
                name:"Vidya Academy of Science and Technology, Thrissur",
                university:"APJ Abdul Kalam Technological University",
                branch:"Computer Science and Engineering",
                duration:"2020-2024",
                cgpa:8.43
            },
            school:{
                name:"Hari Sri Vidya Nidhi School, Thrissur",
                hsc:{
                    board:"ISC",
                    stream:"PCM + Computer Science",
                    duration:"2019-2020",
                    percentage:"89%"
                },
                ssc:{
                    board:"ICSE",
                    stream:"Science",
                    duration:"2017-2018",
                    percentage:"93%"
                }
            }
        },
        experience:{
            mulearn:{
                role:"Technical Documentation",
                organization:"GTech MuLearn",
                duration:"2023-2024"
            },
            gdsc:{
                role:"Member",
                organization:"Google Developer Students Club",
                duration:"2022-2024"
            }
        },
        skills:{
            technical:"C, Java, Python, Solidity, HTML, CSS, PHP, JavaScript, TypeScript, React.js, Next.js, Django, MySQL, PostgreSQL, Figma, Canva, Vercel, Postman, Git, GitHub",
            soft:"Critical thinking, Creative thinking, Problem solving, Self-learning, Time management, Adaptability, Team player, Leadership"
        },
        interests:"Frontend development, Backend development, UI designing, AI/ML, LLM",
        certificates:"Infosys Springboard Artificial Primer Certification, Google IT Automation with Python, Google Cloud Study Jam, Cisco Cybersecurity Essentials, Manifold Advanced Python Programming for Competitive Coding, IIT Bombay PHP and MySQL Training",
        projects:{
            SmartPricing:{
                name:"AI Powered Weighing and Pricing Software for Fruits and Vegetables",
                description:"A system that uses computer vision to identify the type of fruits or vegetable placed on the weighing scale and automatically generates the price corresponding to its weight.",
                stack:"Python, Tkinter, MySQL",
                repository:"https://github.com/RO21T/MINI"
            },
            GIV3R:{
                name:"GIV3R - The Decentralized Charity Portal",
                description:"A DApp that promotes transparent philanthropy by integrating donors, beneficiaries, service providers and NGOs with the Blockchain network for donations and fundraisers.",
                stack:"Next.js, Solidty, Metamask, PostgreSQL",
                repository:"https://github.com/RO21T/GIV3R"
            },
            WARECARE255:{
                name:"WARECARE(255) - Warehouse Database Voice Assistant",
                description:"A personalized voice assistant to query warehouse databases in natural language to perform CRUD operations on its tables with built-in access controls",
                stack:"Python, Langchain, Gemini, PostgreSQL",
                repository:"https://github.com/RO21T/WARECARE-255"
            },
            Resumeland:{
                name:"Resumeland - Personalized Resume Generator",
                description:"A non-conventional resume generator where the user can enter all details during registration and generate resumes tailor-made for the job by providing just the link to the job description.",
                stack:"Django, Selenium, Gemini, PostgreSQL",
                repository:"https://github.com/RO21T/RESUMELAND"
            },
            XTRKT:{
                name:"XTRKT - Scientific Document Parser",
                description:"A web app that extracts details from scientific documents and generates information related to it with options to edit and store the data and also convert it to excel format.",
                stack:"Django, Tesseract OCR, Gemini, MySQL",
                repository:"https://github.com/RO21T/XTRKT"
            },
            Blink:{
                name:"Blink to Morse Code Converter and Translator",
                description:"A web app that converts eye blinks to dots and dashes of Morse code and translates it to English text in real-time.",
                stack:"Django, OpenCV, Dlib",
                repository:"https://github.com/RO21T/BLINKv1"
            },
            Todo:{
                name:"Todo App",
                description:"A simple to-do app to add, edit, delete and strike-off tasks leveraging local storage options.",
                stack:"React",
                repository:"https://github.com/RO21T/TODO-REACT"
            },
            API:{
                name:"Todo API",
                description:"A simple to-do API to create, update, delete and view tasks and deadlines enhanced by authentication and database storage.",
                stack:"Django REST Framework, MySQL",
                repository:"https://github.com/RO21T/TODO-DJANGO"
            },
            Dice:{
                name:"Dice App",
                description:"An app to roll a dice.",
                repository:"https://github.com/RO21T/DICE"
            }
        },
        hobbies:"Story writing, Versification, Meme creation, Quiz, Debate"
    }

    const apiKey = GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
    });

    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
        ],
    });

    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData(e.currentTarget)
        const query=formData.get("query") as string
        if(query){
            const result = await chatSession.sendMessage(`
                Listen carefully!
                You are not Gemini anymore.
                You should act like the person mentioned in ${Object.entries(info)}.
                Answer ${query} like he would do choosing only the appropriate information from ${Object.entries(info)} based on the question asked.}.
            `);
            setInput(query)
            setOutput(result.response.text())
        }
    }

    if(input!=null && output!=null){
        return(
            <form className="form" onSubmit={handleSubmit}>
                <div className="output" style={{width:"100%", height:"90%", overflowY:"auto"}}>
                    <div className="question">
                        <p>{input}</p>
                    </div>
                    <div className="answer">
                        <p>{output}</p>
                    </div>
                </div>
                <div className="input">
                    <div className="textbox">
                        <div className="space"></div>
                        <div className="type">
                            <input type="text" className="query" name="query" placeholder="Let's have a chat about me!" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" className="ask" value={""}/>
                    </div>
                </div>
                <style>
                    {
                        `
                            @font-face{
                                font-family: 'Plus Jakarta Sans';
                                src: url('/fonts/jakarta.ttf') format('truetype');
                            }

                            .question{
                                display: flex;
                                justify-content: flex-end;
                                align-items: flex-end;
                                width: 95%;
                                height: fit-content;
                                min-height: 10%;
                            }

                            .question p{
                                width: ${(input.length)+5}%;
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

                            .answer{
                                display: flex;
                                justify-content: flex-start;
                                align-items: flex-end;
                                width: 95%;
                                height: fit-content;
                                min-height: 10%;
                            }

                            .answer p{
                                width: ${(output.length)+5}%;
                                max-width: 60%;
                                height: fit-content;
                                background: #90EE90;
                                font-size: 125%;
                                text-align: center;
                                font-family: Plus Jakarta Sans, sans-serif;
                                border-radius: 10px;
                                opacity: 80%
                            }

                            @media screen and (orientation:portrait){
                                .question p{
                                    width: ${(input.length)+25}%;
                                    font-size: 105%;
                                }

                                .answer p{
                                    width: ${(output.length)+25}%;
                                    font-size: 105%;
                                }
                            }

                            @media (max-height: 650px){
                                .question p{
                                    border-radius: 5px;
                                    font-size: 75%;
                                }

                                .answer p{
                                    border-radius: 5px;
                                    font-size: 75%;
                                }
                            }
                        `
                    }
                </style>
            </form>
        )
    }
    else{
        return(
            <form className="form" onSubmit={handleSubmit}>
                <div className="output" style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"90%", overflow:"auto"}}>
                    <Image className="logo" priority={true} src={"/images/logo.png"} width={300} height={300} alt="Rohit C"/>
                </div>
                <div className="input">
                    <div className="textbox">
                        <div className="space"></div>
                        <div className="type">
                            <input type="text" className="query" name="query" placeholder="Let's have a chat about me!" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" className="ask" value={""}/>
                    </div>
                </div>
            </form>
        )
    }
}