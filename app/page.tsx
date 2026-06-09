"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ProjectHubSection } from "@/components/projetos/project-hub-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { MapPin } from "lucide-react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    const handleScroll = () => {
      if (
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 10
      ) {
        setActiveSection("contato")
        return
      }

      let currentSection = ""
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sectionsRef.current.forEach((section) => {
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = section.id
        }
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "experiencia", "projetos", "cursos", "contato"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 cursor-pointer ${activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-24 sm:pt-0">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="flex flex-col gap-12 sm:gap-16 w-full">
            <div className="grid grid-cols-[1fr_auto] lg:grid-cols-5 gap-6 sm:gap-12 items-start">
              <div className="space-y-3 sm:space-y-2 lg:col-span-3">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFÓLIO / 2026</div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Nicholas
                  <br />
                  <span className="text-muted-foreground">Deway</span>
                </h1>
              </div>

              <div className="flex justify-end lg:justify-start lg:col-span-2 lg:row-span-2 pl-4 lg:pl-0">
                <div className="relative w-24 h-24 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-muted-foreground/20 shadow-xl">
                  <Image
                    src="/perfil.png"
                    alt="Nicholas Deway"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96px, 192px"
                    priority
                  />
                </div>
              </div>

              <div className="col-span-2 lg:col-span-3 space-y-6 max-w-lg">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Desenvolvedor Full Stack, aprendendo novas tecnologias e criando experiências digitais incríveis.
                  <span className="text-foreground"> design</span>,<span className="text-foreground"> tecnologia</span>,
                  e
                  <span className="text-foreground"> experiência do usuário</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Disponível para trabalho imediato
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="hidden sm:block w-5 h-5 text-muted-foreground/30" />
                    <div>Rio das Ostras RJ - Uberlândia MG - Home Office</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border/40">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">ATUALMENTE</div>
                <div className="space-y-2">
                  <div className="text-foreground font-medium">Desenvolvedor Full Stack</div>
                  <div className="text-muted-foreground">Freelancer</div>
                  <div className="text-xs text-muted-foreground">2023 — Atualmente</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FORMAÇÃO</div>
                <div className="space-y-2">
                  <div className="text-foreground font-medium">Análise e Desenv. de Sistemas</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    PUC Minas
                    <Image
                      src="/logo-puc.jpg"
                      alt="PUC Minas Logo"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">Agosto 2023 - Dezembro 2025</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">STACKS</div>
                <div className="flex flex-wrap gap-2">
                  {[".NET", "C#", "ASP.NET Core", "TypeScript", "Next.js", "React", "Azure & AWS", "SQL & NoSQL", "Python", "FastAPI", "Integração com IA"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="experiencia"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0 scroll-mt-20"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experiências</h2>
              <div className="text-sm text-muted-foreground font-mono">2023 — 2026</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2026",
                  role: "Desenvolvedor Front-end",
                  company: "Freelancer - La Favorita Interior",
                  description: "Landing page institucional premium, moderna e multilíngue desenvolvida para um ateliê de móveis planejados e design de interiores de alto padrão.",
                  tech: ["TypeScript", "Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "Lenis", "i18next"],
                },
                {
                  year: "2026",
                  role: "Desenvolvedor Full Stack",
                  company: "Independente - Definance",
                  description: "Definance é uma plataforma que visa auxiliar as pessoas a gerenciarem suas finanças de forma simples e objetiva, via Web e WhatsApp.",
                  tech: [".NET", "C#", "ASP.NET", "React", "TypeScript", "Next.js", "Python", "FastAPI", "PostgreSQL", "AWS EC2", "AWS S3 Images", "Google OAuth"],
                },
                {
                  year: "2026",
                  role: "Desenvolvedor Full Stack",
                  company: "Freelancer - Memoriza",
                  description: "O Memoriza é um e-commerce completo para compra de artigos de papelaria personalizáveis, desenvolvida com foco em produção real.",
                  tech: [".NET", "C#", "ASP.NET", "React", "TypeScript", "Next.js", "PostgreSQL", "AWS EC2", "AWS S3 Images", "Mercado Pago API", "Google OAuth"],
                },
                {
                  year: "2026",
                  role: "Desenvolvedor Front-end",
                  company: "Freelancer - Viveiro Gama e Filha",
                  description: "O projeto Viveiro Gama e Filha é uma landing page com foco em exposição dos seus produtos, a ponto de gerar experiência para o usuário.",
                  tech: ["TypeScript", "React 19", "Vite 6"],
                },
                {
                  year: "2025",
                  role: "Desenvolvedor Front-end",
                  company: "Freelancer - Peter Gastrobar",
                  description: "Esse projeto consiste na criação de uma landing page moderna e elegante para o restaurante Peter Gastrobar.",
                  tech: ["TypeScript", "Next.js 16", "Tailwind CSS 4"],
                },
                {
                  year: "2025",
                  role: "Desenvolvedor Full Stack",
                  company: "Acadêmico - Sorriso Harmony",
                  description: "Aplicação web fullstack desenvolvida para a Clínica Odontológica Sorriso Harmony, permitindo que pacientes conheçam os serviços e façam agendamentos",
                  tech: [".NET", "C#", "ASP.NET", "TypeScript", "React", "Next.js", "Tailwind CSS", "Microsoft SQL Azure"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projetos"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="opacity-0 scroll-mt-20"
        >
          <ProjectHubSection />
        </section>

        {/* ------------ CURSOS ---------------- */}
        <section
          id="cursos"
          ref={(el) => { sectionsRef.current[3] = el }}
          className="py-20 sm:py-32 animate-fade-in-up scroll-mt-20"
        >
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light">Diplomas, Cursos e Certificados</h2>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {[
                {
                  title: "Análise e Desenvolvimento de Sistemas",
                  institution: "PUC Minas",
                  duration: "2,5 anos",
                  completionDate: "Dez 2025",
                  backgroundImage: "/logo-puc.jpg",
                  width: 58,
                  height: 32,
                  certificateUrl: "/puc-diploma.pdf",
                },
                {
                  title: "Projeto Destaque - PUC Minas - Sorriso Harmony",
                  institution: "PUC Minas",
                  duration: "2° semestre de 2025",
                  completionDate: "Dez 2025",
                  backgroundImage: "/logo-puc.jpg",
                  width: 58,
                  height: 32,
                  certificateUrl: "/projeto-destaque-puc.pdf",
                },
                {
                  title: "Python",
                  institution: "FIAP",
                  duration: "80h",
                  completionDate: "Em andamento",
                  backgroundImage: "/fiap.png",
                  width: 58,
                  height: 32,
                  /*certificateUrl: "#",*/
                },
                {
                  title: "Inteligência Artificial e Computacional",
                  institution: "FIAP",
                  duration: "80h",
                  completionDate: "Não iniciado",
                  backgroundImage: "/fiap.png",
                  width: 58,
                  height: 32,
                  /*certificateUrl: "#",*/
                },
                {
                  title: "Certificação Amazon AWS",
                  institution: "AWS",
                  duration: "22h",
                  completionDate: "Não iniciado",
                  backgroundImage: "/aws.jpg",
                  width: 58,
                  height: 32,
                  /*certificateUrl: "#",*/
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 sm:p-6 min-h-[200px] h-full transition-all duration-500 hover:shadow-lg hover:border-muted-foreground/50 flex flex-col"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-8 flex items-center justify-center bg-muted rounded overflow-hidden">
                          <Image
                            src={course.backgroundImage}
                            alt={course.title}
                            width={course.width}
                            height={course.height}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">
                          {course.institution}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 bg-muted px-2 py-1 rounded">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-medium group-hover:text-primary transition-colors duration-300 mt-2 leading-tight">
                      {course.title}
                    </h3>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-border/20 pt-4">
                    <div className="text-sm text-muted-foreground">
                      Conclusão: <span className="text-foreground">{course.completionDate}</span>
                    </div>

                    {course.certificateUrl && (
                      <Link
                        href={course.certificateUrl}
                        className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted hover:bg-foreground hover:text-background px-4 py-2 rounded-full transition-all duration-300 border border-border"
                      >
                        <span>Visualizar</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" ref={(el) => { sectionsRef.current[5] = el }} className="py-32 sm:py-48 animate-fade-in-up scroll-mt-20">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Vamos nos conectar</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Sempre interessado em novas oportunidades, novos desafios e networks.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:nicholasdeway@hotmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">nicholasdeway@hotmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">REDES SOCIAIS</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@nicholasdeway", url: "https://github.com/nicholasdeway" },
                  { name: "LinkedIn", handle: "@nicholasdeway", url: "https://www.linkedin.com/in/nicholasdeway" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2026 Nichola Deway. Todos os direitos reservados.</div>
              <div className="text-xs text-muted-foreground">Desenvolvido por Nicholas Deway</div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link
                href="https://wa.me/5522997540815"
                target="_blank"
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Contact on WhatsApp"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}