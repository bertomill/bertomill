/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'
import path from 'path'
import { OpenAI } from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'
import dotenv from 'dotenv'
import crypto from 'crypto'
/* eslint-enable @typescript-eslint/no-unused-vars */

// Define our own Document interface to avoid conflicts
interface EmbedDocument {
  pageContent: string
  metadata: {
    source: string
    category?: string
    type?: string
  }
}

// Helper function to create document
function createDocument(pageContent: string, source: string, type: string): EmbedDocument {
  return {
    pageContent,
    metadata: {
      source,
      type
    }
  }
}

// Load environment variables from .env.local
dotenv.config()

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key')
}

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing PINECONE_API_KEY environment variable')
}

if (!process.env.PINECONE_ENVIRONMENT) {
  throw new Error('Missing PINECONE_ENVIRONMENT environment variable')
}

if (!process.env.PINECONE_INDEX) {
  throw new Error('Missing PINECONE_INDEX environment variable')
}

async function collectContent() {
  const content: EmbedDocument[] = []

  // Background
  const backgroundContent = `
    I am a creative problem solver passionate about building impactful products in fast-paced, innovative environments. I've worked with startups across Ontario as well as some of the largest Canadian corporations like CIBC. I find that the need for clarity, energy and delivery is key in any environment. I'm passionate about emerging technologies like Artificial intelligence and how they can be used to enhance peoples collaboration, creativity and flow. I'm a big fan of the book "Antifragile" by Nicholas Taleb and the book "The Score Takes Care of Itself" by Bill Walsh. I feel these books really shaped my thinking.
  `.trim()
  content.push(createDocument(backgroundContent, 'background', 'profile'))

  // Education
  const educationContent = `
    I went to Ivey Business School to learn about Digital Management and Sustainability. It is there where they taught me the inportance of design thinking an d crafting the user experience from their perspective. I also took a business legal studies degree, where I learned about business ethics and how to navigate the legal landscape of business. Outside of the classroom I played squash for the Western Squash team and football team. I also was a member of the Western Mustang Student Council and the Ivey Finance and Technology club.
  `.trim()
  content.push(createDocument(educationContent, 'education', 'profile'))

  // Projects
  const projectsContent = `
    I've worked on severage design and development projects including anHR Skills-Gap Analysis App Using AI for a startup in London Ontario called MentorFi AI.
    Signal7 is an AI powered web application I built to track the activity of the magnificient 7 technology companies. 
    WinDay is an application that helps people set their trajectory for the day and track their progress.
  `.trim()
  content.push(createDocument(projectsContent, 'projects', 'profile'))

  // Skills
  const skillsContent = `
  
User Experience (UX)
Product Management
Product Management: Course taken - Product Management Fundamentals
GenAI Applications: Course taken -ChatGPT Prompt Engineering for Developers
Transformers
ChatGPT Prompt Engineering for DevelopersChatGPT Prompt Engineering for Developers
Stakeholder Engagement
Stakeholder Engagement
Digital Strategy Consultant at CIBCDigital Strategy Consultant at CIBC
Web Application Development
Web Application Development
WinDayWinDay
Signal7Signal7
Web Performance
Web Performance
Web Performance FundamentalsWeb Performance Fundamentals
High Performance Web Sites
High Performance Web Sites
Web Performance FundamentalsWeb Performance Fundamentals
Agentic Workflows
Agentic Workflows
Serverless Agentic Workflows with Amazon BedrockServerless Agentic Workflows with Amazon Bedrock
Multi-agent Systems
Multi-agent Systems
Multi AI Agents and Advanced Use Cases with crewAIMulti AI Agents and Advanced Use Cases with crewAI
Data Engineering
Data Engineering
Introduction to Data EngineeringIntroduction to Data Engineering
Multimodal AI
Multimodal AI
Introducing Multimodal Llama 3.2Introducing Multimodal Llama 3.2
Semantic Kernel
Semantic Kernel
Building AI Plugins With Semantic KernelBuilding AI Plugins With Semantic Kernel
Retrieval-Augmented Generation (RAG)
Retrieval-Augmented Generation (RAG)
Advanced Retrieval for AI with ChromaAdvanced Retrieval for AI with Chroma
Vector Quantization
Vector Quantization
From Tokenization to Vector QuantizationFrom Tokenization to Vector Quantization
LangGraph
LangGraph
AI Agents In LangGraphAI Agents In LangGraph
Agent-based Modeling
Agent-based Modeling
LangChain For LLM Application DevelopmentLangChain For LLM Application Development
Multimodal Prompting
Multimodal Prompting
Large Multimodal Model Prompting with GeminiLarge Multimodal Model Prompting with Gemini
Vector Databases
Vector Databases
Introduction to AI and Vector SearchIntroduction to AI and Vector Search
Building Applications with Vector DatabasesBuilding Applications with Vector Databases
SQL
SQL
Technology Consultant at CIBCTechnology Consultant at CIBC
Management Consulting
Management Consulting
Microsoft Azure
Microsoft Azure
App Developer at Scelta Design & BuildApp Developer at Scelta Design & Build
Web Design
Web Design
Web Content Writing
Web Content Writing
React.js
React.js
2 experiences across Scelta Design & Build and 1 other company2 experiences across Scelta Design & Build and 1 other company
1 endorsement
1 endorsement
Python (Programming Language)
Python (Programming Language)
Frontend Developer at Western UniversityFrontend Developer at Western University
AI Python for Beginners: Basics of AI Python CodingAI Python for Beginners: Basics of AI Python Coding
1 endorsement
1 endorsement
Corporate Law
Corporate Law
Western UniversityWestern University
CSS
CSS
Frontend Developer at Western UniversityFrontend Developer at Western University
Course Completed: Ultimate CSS Grid Course Completed: Ultimate CSS Grid 
Capital Markets
Capital Markets
Administrative Assistant at CIBC Wood GundyAdministrative Assistant at CIBC Wood Gundy
Microsoft Power Platform
Microsoft Power Platform
Technology Consultant at CIBCTechnology Consultant at CIBC
API Management
API Management
App Developer at Scelta Design & BuildApp Developer at Scelta Design & Build
1 endorsement
1 endorsement
Strategy
Strategy
Western UniversityWestern University
1 endorsement
1 endorsement
Data Pipelines
Data Pipelines
Introduction to DatabricksIntroduction to Databricks
1 endorsement
1 endorsement
Machine Learning
Machine Learning
Supervised Machine Learning: Regression and ClassificationSupervised Machine Learning: Regression and Classification
1 endorsement
1 endorsement
Applied Machine Learning
Applied Machine Learning
Advanced Learning AlgorythmsAdvanced Learning Algorythms
Generative AI
Generative AI
Carbon Accounting
Carbon Accounting
1 endorsement
1 endorsement
Digital Transformation
Digital Transformation
Ivey Business School at Western UniversityIvey Business School at Western University
Kickstart Your Digital TransformationKickstart Your Digital Transformation
2 endorsements
2 endorsements
Cloud Infrastructure
Cloud Infrastructure
Google Cloud Fundamentals: Core InfrastructureGoogle Cloud Fundamentals: Core Infrastructure
1 endorsement
1 endorsement
Database Design
Database Design
Software Development
Software Development
1 endorsement
1 endorsement
Data Governance
Data Governance
Google Cloud Platform (GCP)
Google Cloud Platform (GCP)
App Developer at Scelta Design & BuildApp Developer at Scelta Design & Build
1 endorsement
1 endorsement
Google Data Studio
Google Data Studio
HTML
HTML
Frontend Developer at Western UniversityFrontend Developer at Western University
JavaScript
JavaScript
Frontend Developer at Western UniversityFrontend Developer at Western University
Large Language Models (LLM)
Large Language Models (LLM)
Technology Consultant at CIBCTechnology Consultant at CIBC
Large Language Models with Semantic SearchLarge Language Models with Semantic Search
Build LLM Applications with LangChain.jsBuild LLM Applications with LangChain.js
Microsoft Power Apps
Microsoft Power Apps
R (Programming Language)
R (Programming Language)
Miro Collaboration Platform
Miro Collaboration Platform
Microsoft Excel
Microsoft Excel
Microsoft PowerPoint
Microsoft PowerPoint
Customer Journey Mapping
Customer Journey Mapping
Figma (Software)
Figma (Software)
Presentation Skills
Presentation Skills
Compelling PresentationsCompelling Presentations
Sustainable Business
Sustainable Business
Adobe Creative Cloud
Adobe Creative Cloud
Microsoft Purview
Microsoft Purview
Data Storytelling
Data Storytelling
Data StorytellingData Storytelling
Robotic Process Automation (RPA)
Robotic Process Automation (RPA)
RPA Basics and Introduction to UiPathRPA Basics and Introduction to UiPath
1 endorsement
1 endorsement
Cloud Applications
Cloud Applications
Build a Google Firebase Web ApplicationBuild a Google Firebase Web Application
1 endorsement
1 endorsement
IBM Cognos Analytics
IBM Cognos Analytics
Data Visualization and Dashboards with Excel and CognosData Visualization and Dashboards with Excel and Cognos
Artificial Intelligence (AI)
Artificial Intelligence (AI)
Digital Strategy Consultant at CIBCDigital Strategy Consultant at CIBC
AI for Personal ProductivityAI for Personal Productivity
AI for Personal ProductivityAI for Personal Productivity
Show all 6 details
Change Management
Change Management
Process Analysis
Process Analysis
Cybersecurity
Cybersecurity
Cloud Computing
Cloud Computing
Explore Core Data Concepts in Microsoft AzureExplore Core Data Concepts in Microsoft Azure
Prompt Engineering
Prompt Engineering
Prompt Engineering for ChatGPTPrompt Engineering for ChatGPT
ChatGPT Advanced Data AnalysisChatGPT Advanced Data Analysis
ChatGPT Prompt Engineering For DevelopersChatGPT Prompt Engineering For Developers
Data Analysis
Data Analysis
Agile Methodologies
Agile Methodologies
Agile Projects: Creating User Stories with Value in TaigaAgile Projects: Creating User Stories with Value in Taiga
Business Process Automation
Business Process Automation
Building No-Code Apps with AppSheet: FoundationsBuilding No-Code Apps with AppSheet: Foundations
Building No-Code Apps with AppSheet: ImplementationBuilding No-Code Apps with AppSheet: Implementation
Building No-Code Apps with AppSheet: AutomationBuilding No-Code Apps with AppSheet: Automation
User Interface Design
User Interface Design
HR Skills-Gap Analysis App Using AIHR Skills-Gap Analysis App Using AI
Financial Analysis
Financial Analysis
Administrative Assistant at CIBC Wood GundyAdministrative Assistant at CIBC Wood Gundy
Design Thinking
Design Thinking
Digital Innovation Studio at Ivey Business School at Western UniversityDigital Innovation Studio at Ivey Business School at Western University
Ivey Business School at Western UniversityIvey Business School at Western University
Agile Meets Design ThinkingAgile Meets Design Thinking
Project Management
Project Management
Cert Prep: Agile Analysis (IIBA®-AAC)Cert Prep: Agile Analysis (IIBA®-AAC)
Change Leadership: Strategic Route Analysis with MiroChange Leadership: Strategic Route Analysis with Miro
Windsor-Essex Young Entrepreneur of the Year AwardWindsor-Essex Young Entrepreneur of the Year Award
Teamwork
Teamwork
Western UniversityWestern University
Varsity Football National ChampionVarsity Football National Champion
Western Mustangs Athletes Student CouncilWestern Mustangs Athletes Student Council
Business Strategy
Business Strategy
Digital Strategy Consultant at CIBCDigital Strategy Consultant at CIBC
Enterprise Architecture in PracticeEnterprise Architecture in Practice
The 45-Minute Business PlanThe 45-Minute Business Plan
Show all 5 details
Data Analytics
Data Analytics
Ivey Business School at Western UniversityIvey Business School at Western University
Python Essential TrainingPython Essential Training
Python vs. R for Data SciencePython vs. R for Data Science
Windsor-Essex Young Entrepreneur of the Year Award
  `.trim()
  content.push(createDocument(skillsContent, 'skills', 'profile'))

  // Achievements
  const achievementsContent = `
    
Honors & awards
Varsity Football National Champion
Varsity Football National Champion
Issued by USports Canada · Dec 2021Issued by USports Canada · Dec 2021
Western University logo
Associated with Western University
Associated with Western University
Winner of the Canadian University Football Championships with the Western Mustangs football team in 2017 & '21.
Winner of the Canadian University Football Championships with the Western Mustangs football team in 2017 & '21.
Ontario University Athletics (OUA) Mens Squash Gold Medalist
Ontario University Athletics (OUA) Mens Squash Gold Medalist
Issued by Ontario University Athletics (OUA) · Feb 2020Issued by Ontario University Athletics (OUA) · Feb 2020
Western University logo
Associated with Western University
Associated with Western University
Winner of the Ontario University Squash Championships with the Western Mustangs squash team in 2019.
Winner of the Ontario University Squash Championships with the Western Mustangs squash team in 2019.
Windsor-Essex Young Entrepreneur of the Year Award
Windsor-Essex Young Entrepreneur of the Year Award
Issued by Windsor-Essex Small Business Centre · Aug 2017Issued by Windsor-Essex Small Business Centre · Aug 2017
Proteus Science Innovation Competition
Proteus Science Innovation Competition
Issued by World DiscoveriesIssued by World Discoveries
Western University logo
Associated with Western University
Associated with Western University
The Proteus Innovation Competition is an intense four-month competition that will challenge individuals to create a viable commercialization strategy for 1 of 5 promising technologies, in hopes of winning a cash prize of up to $5,000.
The Proteus Innovation Competition is an intense four-month competition that will challenge individuals to create a viable commercialization strategy for 1 of 5 promising technologies, in hopes of winning a cash prize of up to $5,000.

Proteus 2019 - Proteus Innovation Competition
  `.trim()
  content.push(createDocument(achievementsContent, 'achievements', 'profile'))

  // Interests
  const interestsContent = `
    Sports: Squash, American Football, Soccer, Tennis, Golf
    I love books of all kind but my top 5 are - Antifragile nicholas taleb, the score takes care of itself, the alchemist, the talent code, and The innovation stack

- I love cooking and eating - particularly because of my italian upbringing with my nonna and nonno from napoli, but id say my favourite meals are italian pasta fagioli, mexican tacos, Shawarma, sushi, and turkey dinners (with mac and cheese)

- My favourite places travelled are Autralia - amazing for sports and activity, Amsterdam - Biking, Mexico - beaches, and 
  `.trim()
  content.push(createDocument(interestsContent, 'interests', 'profile'))

  return content
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Create embeddings function
async function createEmbeddings(document: EmbedDocument) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: document.pageContent,
  })
  return response.data[0].embedding
}

async function embedContent() {
  console.log('Collecting content...')
  const docs = await collectContent()
  
  console.log('Creating embeddings...')
  const pc = new Pinecone()
  const index = pc.index(process.env.PINECONE_INDEX!)

  console.log('Storing vectors in Pinecone...')
  for (const doc of docs) {
    const embedding = await createEmbeddings(doc)
    
    await index.upsert([{
      id: crypto.randomUUID(),
      values: embedding,
      metadata: {
        text: doc.pageContent,
        source: doc.metadata.source,
        category: doc.metadata.category || 'General'
      }
    }])
  }
  
  console.log('Done!')
  
  console.log('Checking index stats...')
  const stats = await index.describeIndexStats()
  console.log(stats)
}

embedContent().catch(console.error) 