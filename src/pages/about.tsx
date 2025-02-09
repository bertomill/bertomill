import Head from 'next/head'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { BookOpen, User, Newspaper, Heart, Trophy, ScrollText, Briefcase, ChevronDown } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import Subscribe from '@/components/Subscribe'

// Add interfaces for different sections
interface Book {
  title: string
  author: string
  description: string
}

interface Education {
  school: string
  degree: string
  period: string
  activities: string[]
  achievements: string[]
  imageSrc: string
}

interface Article {
  title: string
  description: string
  imageSrc: string
  link: string
}

interface Volunteer {
  role: string
  organization: string
  period: string
  category: string
  description: string
  imageSrc?: string
}

interface Award {
  title: string
  issuedBy: string
  date: string
  description: string
  link?: string
}

interface Publication {
  title: string
  publisher: string
  date: string
  description?: string
  link: string
}

interface WorkExperience {
  company: string
  companyLocation: string
  positions: {
    title: string
    type?: string
    period: string
    location?: string
    description: string
    skills: string[]
  }[]
  imageSrc?: string
}

export default function About() {
  const [openExperiences, setOpenExperiences] = useState<string[]>([])

  const toggleExperience = (company: string) => {
    setOpenExperiences(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    )
  }

  const education: Education[] = [
    {
      school: "Ivey Business School at Western University",
      degree: "Master's degree, Digital Management",
      period: "Jul 2022 - Dec 2023",
      activities: ["Ivey Finance & Technology Club Vice President"],
      achievements: [
        "Dean's Honours List",
        "Graduate Diploma in Business & Sustainability",
        "Silicon Valley Venture Capital project",
        "Ivey Digital Innovation Studio (IDIS) winner",
        "Ivey Sports Conference (ISC) case competition finalist",
        "IBM Technology Integration case competition finalist",
        "Western Founder's Network Hackathon finalist",
        "Ardency Venture Capital case competition finalist",
        "Adobe Design Innovation Case Competition finalist"
      ],
      imageSrc: "/ivey-logo.png" // You'll need to add this image
    },
    {
      school: "Western University",
      degree: "Bachelor's degree, Legal Studies",
      period: "2017 - 2022",
      activities: ["Student Athletic Council Member"],
      achievements: [
        "Academic All-Canadian",
        "Western Mustangs Bronze W Award Winner",
        "Proteus innovation grant recipient"
      ],
      imageSrc: "/western-logo.png" // You'll need to add this image
    }
  ]

  const articles: Article[] = [
    {
      title: "Celebrating The 2021 Bronze W Award Recipients",
      description: "Featured in Western Mustangs Sports for athletic and academic achievement",
      imageSrc: "/bronze-w-award.webp", // You'll need to add this image
      link: "#" // Add the actual link
    },
    {
      title: "Ivey's MSc students work with CIBC on innovation",
      description: "Collaboration with CIBC on banking industry innovation projects",
      imageSrc: "/cibc-tech-team.png", // You'll need to add this image
      link: "#" // Add the actual link
    }
  ]

  const favoriteBooks: Book[] = [
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      description: "An inspiring story that teaches about pursuing your true path and understanding life's deeper meanings."
    },
    {
      title: "The Talent Code",
      author: "Daniel Coyle",
      description: "A fascinating breakdown of how athletes and high performers systematically build and develop talent."
    },
    {
      title: "The Score Takes Care of Itself",
      author: "Bill Walsh",
      description: "Invaluable insights into how high-performance teams prepare and maintain exceptional standards."
    },
    {
      title: "The World I See",
      author: "Fei-Fei Li",
      description: "A compelling perspective into one of the great AI minds and her visionary approach to the field."
    },
    {
      title: "The Almanack of Naval",
      author: "Eric Jorgenson",
      description: "A straightforward collection of clear, actionable lessons and wisdom from Naval Ravikant."
    }
  ]

  const volunteering: Volunteer[] = [
    {
      role: "Assistant Coach",
      organization: "London Junior Mustangs Football Club",
      period: "Mar 2020 - Sep 2022 · 2 yrs 7 mos",
      category: "Health",
      description: "Organized practices and training camps for youth football players in London, Ontario.",
      imageSrc: "/junior-mustangs-logo.png" // Re-enable now that we have the logo
    }
  ]

  const awards: Award[] = [
    {
      title: "Varsity Football National Champion",
      issuedBy: "USports Canada",
      date: "Dec 2021",
      description: "Winner of the Canadian University Football Championships with the Western Mustangs football team in 2017 & '21."
    },
    {
      title: "Ontario University Athletics (OUA) Mens Squash Gold Medalist",
      issuedBy: "Ontario University Athletics (OUA)",
      date: "Feb 2020",
      description: "Winner of the Ontario University Squash Championships with the Western Mustangs squash team in 2019."
    },
    {
      title: "Windsor-Essex Young Entrepreneur of the Year Award",
      issuedBy: "Windsor-Essex Small Business Centre",
      date: "Aug 2017",
      description: ""
    },
    {
      title: "Proteus Science Innovation Competition",
      issuedBy: "World Discoveries",
      date: "",
      description: "The Proteus Innovation Competition is an intense four-month competition that will challenge individuals to create a viable commercialization strategy for 1 of 5 promising technologies, in hopes of winning a cash prize of up to $5,000.",
      link: "Proteus 2019 - Proteus Innovation Competition"
    }
  ]

  const publications: Publication[] = [
    {
      title: "Mastering Digital Change: The Power of Absorptive Capacity in Tech Adoption",
      publisher: "CXO Magazine",
      date: "Feb 4, 2024",
      link: "https://cxotechmagazine.com/mastering-digital-change-the-power-of-absorptive-capacity-in-tech-adoption/"
    },
    {
      title: "Studying the Digital Transformation of Businesses",
      publisher: "Scholarship Western",
      date: "Jun 2, 2023",
      description: "Enrolled in Ivey's MSc program since 2022, focusing on digital transformation in legacy industries. Research highlights challenges in corporate agility and resilience to change.",
      link: "https://ir.lib.uwo.ca/inspiringminds/500/"
    }
  ]

  const experience: WorkExperience[] = [
    {
      company: "CIBC",
      companyLocation: "Toronto, Ontario, Canada",
      positions: [
        {
          title: "Digital Strategy Consultant",
          period: "Jan 2024 - Present · 1 yr 1 mo",
          description: "Developed data-driven external communications strategy on enterprise Artificial Intelligence (AI)",
          skills: ["Business Strategy", "Artificial Intelligence (AI)"],
          type: "Full-time"
        },
        {
          title: "Technology Consultant",
          type: "Co-op",
          period: "Jun 2023 - Feb 2024 · 9 mos",
          location: "Hybrid",
          description: "Designed GenAI (Generative Artificial Intelligence) solutions with the Enterprise Data & Records Management Office (EDRMO) to improve Data Steward workflows.",
          skills: ["Large Language Models (LLM)", "Microsoft Power Platform"]
        },
        {
          title: "Administrative Assistant",
          period: "Feb 2021 - Feb 2022 · 1 yr 1 mo",
          location: "London, Ontario, Canada",
          description: "Conducted portfolio research and client support for wealth management team",
          skills: ["Financial Analysis", "Capital Markets"]
        }
      ],
      imageSrc: "/cibc-logo.png" // You'll need to add this image
    },
    {
      company: "Digital Innovation Studio",
      companyLocation: "Ivey Business School at Western University · On-site",
      positions: [
        {
          title: "Digital Innovation Studio",
          period: "May 2023 - Jul 2023 · 3 mos",
          description: "Designed end-to-end client journeys leveraging emerging technologies",
          skills: ["Design Thinking"],
          location: "CIBC, Sick Kids Hospital, St Johns Ambulance · On-site"
        }
      ],
      imageSrc: "/ivey-logo.png"
    },
    {
      company: "Scelta Design & Build",
      companyLocation: "Windsor, Ontario, Canada",
      positions: [
        {
          title: "App Developer",
          period: "Mar 2023 - Jun 2023 · 4 mos",
          location: "On-site",
          description: "Designed and built project management applications for contractors and manufacturing comapnies",
          skills: ["Google Cloud Platform (GCP)", "API Management"]
        }
      ]
    },
    {
      company: "Western University",
      companyLocation: "London, Ontario, Canada",
      positions: [
        {
          title: "Frontend Developer",
          type: "Contract Part-time",
          period: "Aug 2019 - Dec 2021 · 2 yrs 5 mos",
          description: "Developed web pages for the Western University Athletics Committee",
          skills: ["HTML", "CSS"]
        }
      ]
    }
  ]

  return (
    <Layout>
      <Head>
        <title>About - Berto Mill</title>
        <meta name="description" content="Learn more about my professional background and personal interests" />
      </Head>

      <main className="min-h-screen bg-[#1a1b26] pb-[200px]">
        <div className="max-w-4xl mx-auto px-4 space-y-20">
          {/* About Me Section */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-6">
                <h1 className="text-3xl font-medium flex items-center gap-2">
                  <User className="w-6 h-6 text-editor-accent" />
                  About Me
                </h1>
                <div className="space-y-4 text-editor-comment">
                  <p className="text-lg leading-relaxed">
                    I am a consultant and developer in the technology space. I have three years of experience in helping companies of all sizes implement technology. I also develop AI applications.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Outside of work, I am a fitness enthusiast and enjoy running, lifting weights, and playing sports such as football and squash.
                  </p>
                </div>
              </div>
              <div className="relative w-full md:w-72 aspect-video rounded-xl overflow-hidden border-2 border-editor-comment/20 shadow-lg">
                <Image
                  src="/Berto Mill Conference.png"
                  alt="Berto Mill at Conference"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-editor-accent" />
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <Collapsible.Root
                  key={exp.company}
                  open={openExperiences.includes(exp.company)}
                  onOpenChange={() => toggleExperience(exp.company)}
                  className="radix-card overflow-hidden bg-editor-bg border border-editor-comment/20"
                >
                  <Collapsible.Trigger className="w-full">
                    <div className="p-6 flex items-start gap-4 hover:bg-editor-bg/50 transition-colors">
                      {exp.imageSrc && (
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={exp.imageSrc}
                            alt={exp.company}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-center gap-4">
                          <div>
                            <h3 className="text-xl font-medium text-editor-text">{exp.company}</h3>
                            <p className="text-editor-comment">{exp.companyLocation}</p>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-editor-comment transition-transform duration-200 ${
                              openExperiences.includes(exp.company) ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </Collapsible.Trigger>

                  <Collapsible.Content>
                    <div className="px-6 pb-6">
                      <div className="space-y-8 pl-4 border-l-2 border-editor-comment/20">
                        {exp.positions.map((position, index) => (
                          <div key={`${position.title}-${index}`} className="relative">
                            <div className="absolute -left-[25px] top-2 w-4 h-4 rounded-full bg-editor-bg border-2 border-editor-accent"></div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <h4 className="text-lg font-medium text-editor-keyword">{position.title}</h4>
                                  {position.type && (
                                    <p className="text-editor-comment text-sm">{position.type}</p>
                                  )}
                                </div>
                                <span className="text-editor-comment text-sm whitespace-nowrap">{position.period}</span>
                              </div>
                              {position.location && (
                                <p className="text-editor-comment text-sm">{position.location}</p>
                              )}
                              <p className="text-editor-text">{position.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {position.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-1 text-xs rounded-full bg-editor-accent/10 text-editor-accent"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="relative bg-[#0c0c0c] py-12">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="retro-text grainy text-xl md:text-3xl tracking-[0.2em] uppercase mb-8 text-[#94a3b8]">
                Education
              </h2>

              <div className="space-y-12">
                {education.map((edu) => (
                  <div
                    key={edu.school}
                    className="bg-[#0a0a0a]/50 rounded-lg p-6 grainy"
                  >
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={edu.imageSrc}
                          alt={edu.school}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-medium text-editor-text">{edu.school}</h3>
                        <p className="text-editor-text">{edu.degree}</p>
                        <p className="text-editor-comment text-sm">{edu.period}</p>
                        
                        {edu.activities.length > 0 && (
                          <div className="pt-2">
                            <p className="text-editor-text font-medium">Activities and Societies:</p>
                            <p className="text-editor-comment">{edu.activities.join(", ")}</p>
                          </div>
                        )}
                        
                        {edu.achievements.length > 0 && (
                          <ul className="list-disc list-inside pt-2 space-y-1">
                            {edu.achievements.map((achievement) => (
                              <li key={achievement} className="text-editor-comment">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Publications Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <ScrollText className="w-6 h-6 text-editor-accent" />
              Publications
            </h2>
            <div className="grid gap-6">
              {publications.map((publication) => (
                <a
                  key={publication.title}
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="radix-card p-6 space-y-3 hover:bg-editor-bg/50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-xl font-medium text-editor-text">{publication.title}</h3>
                      <span className="text-editor-comment text-sm whitespace-nowrap">{publication.date}</span>
                    </div>
                    <p className="text-editor-text">{publication.publisher}</p>
                    {publication.description && (
                      <p className="text-editor-comment text-sm">{publication.description}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Featured Articles Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-editor-accent" />
              Featured Articles
            </h2>
            <div className="grid gap-6">
              {articles.map((article) => (
                <a
                  key={article.title}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="radix-card p-4 hover:bg-editor-bg/50 transition-colors"
                >
                  <div className="flex gap-4 items-center">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-editor-text">{article.title}</h3>
                      <p className="text-editor-comment text-sm">{article.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Volunteering Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <Heart className="w-6 h-6 text-editor-accent" />
              Volunteering
            </h2>
            <div className="grid gap-6">
              {volunteering.map((volunteer) => (
                <div
                  key={volunteer.role}
                  className="radix-card p-6 space-y-4"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    {volunteer.imageSrc && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={volunteer.imageSrc}
                          alt={volunteer.organization}
                          fill
                          className="object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-medium text-editor-text">{volunteer.role}</h3>
                      <p className="text-editor-text">{volunteer.organization}</p>
                      <p className="text-editor-comment text-sm">{volunteer.period}</p>
                      <p className="text-editor-comment text-sm">{volunteer.category}</p>
                      <p className="text-editor-comment">{volunteer.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Honors & Awards Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <Trophy className="w-6 h-6 text-editor-accent" />
              Honors & Awards
            </h2>
            <div className="grid gap-6">
              {awards.map((award) => (
                <div
                  key={award.title}
                  className="radix-card p-6 space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-xl font-medium text-editor-text">{award.title}</h3>
                      <span className="text-editor-comment text-sm whitespace-nowrap">{award.date}</span>
                    </div>
                    <p className="text-editor-text">Issued by {award.issuedBy}</p>
                    {award.description && (
                      <p className="text-editor-comment text-sm">{award.description}</p>
                    )}
                    {award.link && (
                      <a 
                        href="#" 
                        className="text-editor-accent hover:text-editor-accent/80 text-sm inline-flex items-center gap-1"
                      >
                        {award.link}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reading List Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-editor-accent" />
              Reading List
            </h2>
            <div className="grid gap-6">
              {favoriteBooks.map((book, index) => (
                <div key={book.title} className="radix-card p-4 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-editor-accent font-medium">{index + 1}.</span>
                    <h3 className="text-lg font-medium text-editor-text">
                      {book.title}
                      <span className="text-editor-comment text-sm ml-2">by {book.author}</span>
                    </h3>
                  </div>
                  <p className="text-editor-comment text-sm pl-6">
                    {book.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Add Subscribe at bottom */}
        <section className="py-20">
          <Subscribe />
        </section>
      </main>
    </Layout>
  )
}