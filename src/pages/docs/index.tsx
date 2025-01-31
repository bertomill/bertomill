import Layout from '@/components/Layout'

export default function DocsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-serif text-[#c0caf5] mb-12">Documentation</h1>
      

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">About Me</h2>
          <div className="space-y-4">
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">Background</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                I am a creative problem solver passionate about building impactful products in fast-paced, innovative environments. My expertise spans digital strategy and consulting, with experience working for large enterprises such as CIBC and SickKids Hospital, as well as contributing to the growth of various startups.
                <br /><br />
                With a background in digital management, I specialize in leveraging design thinking and user journey mapping to craft impactful strategies and products. I stay at the forefront of emerging technologies, ensuring my solutions are innovative, intuitive, and customer-focused.
                <br /><br />
                Beyond work, I enjoy building businesses and creating enduring brands that resonate with people. Movement has always been a key part of my life, whether it's running, lifting weights, or playing sports with friends.
                <br /><br />
                I'm passionate about designing products people love, and I'm driven by opportunities to create meaningful, lasting impact through my work.
              </p>
            </div>
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">Education</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                <strong>Master's Degree in Digital Management</strong> from Ivey Business School at Western University (Jul 2022 - Dec 2023)
                <ul>
                  <li>Vice President of Ivey Finance & Technology Club</li>
                  <li>Dean's Honours List</li>
                  <li>Graduate Diploma in Business & Sustainability</li>
                  <li>Projects: Silicon Valley Venture Capital project, Ivey Digital Innovation Studio (IDIS) winner, and more.</li>
                </ul>
                <br />
                <strong>Bachelor's Degree in Legal Studies</strong> from Western University (2017 - 2022)
                <ul>
                  <li>Student Athletic Council Member</li>
                  <li>Academic All-Canadian</li>
                  <li>Western Mustangs Bronze W Award Winner</li>
                  <li>Proteus innovation grant recipient</li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">Projects</h2>
          <div className="space-y-4">
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">HR Skills-Gap Analysis App Using AI</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                A tool leveraging AI to identify and bridge skill deficiencies within HR teams.
              </p>
            </div>
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">MentorFi AI</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                A platform to help HR managers re-skill their workforce with AI.
              </p>
            </div>
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">Signal7</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                AI-powered research application on the big 7 tech companies.
              </p>
            </div>
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">WinDay</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                A journaling app to help users set goals and track actions.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">Skills</h2>
          <div className="space-y-4">
            <p className="text-[#a9b1d6] leading-relaxed">
              User Experience (UX), Product Management, Digital Strategy, Web Application Development, AI, Machine Learning, Data Engineering, Cloud Infrastructure, and more.
            </p>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">Achievements</h2>
          <div className="space-y-4">
            <ul className="text-[#a9b1d6] leading-relaxed">
              <li>Varsity Football National Champion (2017 & 2021)</li>
              <li>Ontario University Athletics (OUA) Men's Squash Gold Medalist (2019)</li>
              <li>Windsor-Essex Young Entrepreneur of the Year Award (2017)</li>
              <li>Proteus Science Innovation Competition</li>
            </ul>
          </div>
        </section>

        {/* Interests Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">Interests</h2>
          <div className="space-y-4">
            <p className="text-[#a9b1d6] leading-relaxed">
              Sports: Squash, American Football, Soccer, Tennis, Golf
              <br />
              Books: "Antifragile" by Nicholas Taleb, "The Score Takes Care of Itself," "The Alchemist," "The Talent Code," "The Innovation Stack"
              <br />
              Cooking and Eating: Italian pasta fagioli, Mexican tacos, Shawarma, Sushi, Turkey dinners
              <br />
              Travel: Australia, Amsterdam, Mexico, Morocco
              <br />
              Brands: Lululemon, Hoka, Yeti, Patagonia
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
} 