import { MDXProvider } from '@mdx-js/react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  id?: string
}

interface LinkProps {
  href: string
  children: ReactNode
}

interface ListProps {
  children: ReactNode
}

const components = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-2xl font-medium mt-4 mb-2" {...props}>{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">{children}</p>
  ),
  a: ({ href = '', children }: LinkProps) => {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500 hover:text-emerald-600 transition-colors"
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={href}
        className="text-emerald-500 hover:text-emerald-600 transition-colors"
      >
        {children}
      </Link>
    )
  },
  ul: ({ children }: ListProps) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  li: ({ children }: ListProps) => (
    <li className="text-stone-600 dark:text-stone-400">{children}</li>
  )
}

interface MDXContentProps {
  children: ReactNode
}

export default function MDXContent({ children }: MDXContentProps) {
  return (
    <MDXProvider components={components}>
      <div className="prose prose-stone dark:prose-invert max-w-none">
        {children}
      </div>
    </MDXProvider>
  )
} 