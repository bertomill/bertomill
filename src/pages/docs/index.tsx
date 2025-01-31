import Layout from '@/components/Layout'

export default function DocsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-serif text-[#c0caf5] mb-12">Documentation</h1>
        
        {/* Getting Started Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">Getting Started</h2>
          <div className="space-y-4">
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">Introduction</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                Welcome to my documentation! Here you&apos;ll find comprehensive information 
                about my work, projects, and experience.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">About Me</h2>
          <div className="space-y-4">
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">Background</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                I&apos;m a technology enthusiast with a passion for building innovative solutions. 
                My background spans across software development, business strategy, and entrepreneurship.
              </p>
            </div>
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">Education</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                I completed my MSc at Ivey Business School, focusing on the intersection of 
                technology and business. My research explores how AI can enhance human 
                capabilities while maintaining the essential human element in our interactions.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl text-[#bb9af7] mb-6">Projects</h2>
          <div className="space-y-4">
            <div className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30">
              <h3 className="text-xl text-[#7aa2f7] mb-4">Overview</h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                Explore my various projects spanning web development, AI integration, 
                and innovative solutions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
} 