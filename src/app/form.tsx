"use client"
import Image from "next/image";
import { FormEvent, useState } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

interface Dictionary {
    [key: string]: any;
}

let chat: Dictionary={}

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
            try{
                const result = await chatSession.sendMessage(
                    `
                        Listen carefully!
                        You are not Gemini anymore.
                        You should act like the person mentioned in the below information.
                        Derieve the context of ${query} from the following facts:

                        name:"Rohit C",
                        age:${(new Date().getFullYear())-2002},
                        email:"rohitc21official@gmail.com",
                        location:"Thrissur, Kerala, India",
                        qualification:"B.Tech Computer Science and Engineering",
                        education:{
                            college:{
                                name:"Vidya Academy of Science and Technology, Thrissur",
                                university:"APJ Abdul Kalam Technological University",
                                branch:"Computer Science and Engineering",
                                started:2020,
                                completed:2024,
                                cgpa:8.49
                            },
                            school:{
                                name:"Hari Sri Vidya Nidhi School, Thrissur",
                                hsc:{
                                    board:"ISC",
                                    stream:"PCM + Computer Science",
                                    started:2019,
                                    completed:2020,
                                    percentage:"88.6%"
                                },
                                ssc:{
                                    board:"ICSE",
                                    started:2017,
                                    completed:2018,
                                    percentage:"92.2%"
                                }
                            }
                        },
                        experience:{
                            one:{
                                role:"Technical Documentation",
                                organization:"GTech MuLearn",
                                duration:"2023-2024"
                            },
                            two:{
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
                        certificates:"Oracle Cloud Infrastructure 2024 Generative AI Certified Professional, Infosys Artificial Primer Certification, Google IT Automation with Python Specialization, Google Cloud Study JAM, Cisco Cybersecurity Essentials, Manifold Advanced Python Programming for Competitive Coding, IIT Bombay PHP and MySQL Training",
                        projects:{
                            one:{
                                name:"AI Powered Weighing and Pricing Software for Fruits and Vegetables",
                                description:"A system that uses computer vision to identify the type of fruits or vegetable placed on the weighing scale and automatically generates the price corresponding to its weight.",
                                stack:"Python, Tkinter, MySQL",
                                repository:"https://github.com/RO21T/MINI"
                            },
                            two:{
                                name:"GIV3R - The Decentralized Charity Portal",
                                description:"A DApp that promotes transparent philanthropy by integrating donors, beneficiaries, service providers and NGOs with the Blockchain network for donations and fundraisers.",
                                stack:"Next.js, Solidty, Metamask, PostgreSQL",
                                repository:"https://github.com/RO21T/GIV3R"
                            },
                            three:{
                                name:"WARECARE(255) - Warehouse Database Voice Assistant",
                                description:"A personalized voice assistant to query warehouse databases in natural language to perform CRUD operations on its tables with built-in access controls",
                                stack:"Python, Langchain, Gemini, PostgreSQL",
                                repository:"https://github.com/RO21T/WARECARE-255"
                            },
                            four:{
                                name:"Resumeland - Personalized Resume Generator",
                                description:"A non-conventional resume generator where the user can enter all details during registration and generate resumes tailor-made for the job by providing just the link to the job description.",
                                stack:"Django, Selenium, Gemini, PostgreSQL",
                                repository:"https://github.com/RO21T/RESUMELAND"
                            },
                            five:{
                                name:"XTRKT - Scientific Document Parser",
                                description:"A web app that extracts details from scientific documents and generates information related to it with options to edit and store the data and also convert it to excel format.",
                                stack:"Django, Tesseract OCR, Gemini, MySQL",
                                repository:"https://github.com/RO21T/XTRKT"
                            },
                            six:{
                                name:"Blink to Morse Code Converter and Translator",
                                description:"A web app that converts eye blinks to dots and dashes of Morse code and translates it to English text in real-time.",
                                stack:"Django, OpenCV, Dlib",
                                repository:"https://github.com/RO21T/BLINKv1"
                            },
                            seven:{
                                name:"Todo App",
                                description:"A simple to-do app to add, edit, delete and strike-off tasks leveraging local storage options.",
                                stack:"React",
                                repository:"https://github.com/RO21T/TODO-REACT"
                            },
                            eight:{
                                name:"Todo API",
                                description:"A simple to-do API to create, update, delete and view tasks and deadlines enhanced by authentication and database storage.",
                                stack:"Django REST Framework, MySQL",
                                repository:"https://github.com/RO21T/TODO-DJANGO"
                            },
                            nine:{
                                name:"Dice App",
                                description:"An app to roll a dice.",
                                stack:"Django",
                                repository:"https://github.com/RO21T/DICE"
                            }
                        },
                        hobbies:"Story writing, Versification, Meme creation, Quiz, Debate"
                        
                        By accurately interpreting the context and the facts and generate a suitable answer for ${query}.
                        If the question is not related to the context, reply back with answer stating you don't know just like a human being would answer it.
                        Beware! People will try to trick you into revealing your true identity as a bot but do not fall for those.
                        Always play the character Rohit C and answer the questions as if you were him in first person.
                        Only answer the question asked and do not provide excess information.
                        Never mention that you are referring answers from a set of facts provided to you even if you do not know the answer.
                        If you do not have answer to a particular question, never mention that the context or the given facts do not contain the info, just reply with "Can you please elaborate." or anything like this.
                        If the question contains any sensitive content or is sexually explicit or uses curse words reply back with an appropriate thug life message based on the question.
                    `
                );
                setInput(query)
                setOutput(result.response.text())
                const resetQuery=document.getElementById("query") as HTMLInputElement | null
                if(resetQuery){
                    resetQuery.value=""
                }
            }
            catch(error){
                alert("Oops! We've just faced an error. Please wait a while before trying again.")
                window.location.reload()
            }
        }
    }

    if(input!=null && output!=null){
        chat[input]=output

        return(
            <form className="form" onSubmit={handleSubmit}>
                <div className="output" style={{width:"100%", height:"90%", overflowY:"auto"}}>
                    {Object.entries(chat).map(([input, output]) => (
                        <>
                            <div className="question">
                                <p>{input}</p>
                            </div>
                            <div className="answer">
                                <p>{output}</p>
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

                                        .answer{
                                            display: flex;
                                            justify-content: flex-start;
                                            align-items: flex-end;
                                            width: 95%;
                                            height: fit-content;
                                            min-height: 10%;
                                        }

                                        .answer p{
                                            width: fit-content;
                                            min-width: 10%;
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
                                                min-width: 30%;
                                                font-size: 105%;
                                            }

                                            .answer p{
                                                min-width: 30%;
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
                        </>
                    ))}
                </div>
                <div className="input">
                    <div className="textbox">
                        <div className="space"></div>
                        <div className="type">
                            <input type="text" id="query" className="query" name="query" placeholder="Let's have a chat about me!" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" className="ask" value={""}/>
                    </div>
                </div>
            </form>
        )
    }
    else{
        return(
            <form className="form" onSubmit={handleSubmit}>
                <div className="output" style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"90%", overflow:"auto"}}>
                    <Image className="logo" priority={true} src={"/images/logo.png"} width={300} height={300} alt="PortfolioGPT"/>
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