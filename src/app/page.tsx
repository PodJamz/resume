'use client';

import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { TextEffect } from "@/components/ui/text-effect";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  // ────────────────────────────────────────────────────────────────────────
  // Language toggle state
  const [lang, setLang] = useState<"en" | "pt">("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "pt" : "en"));

  // Hard‑coded Portuguese strings (from your translations)
  const pt = {
    heroGreeting: `Olá, sou ${DATA.name.split(" ")[0]} 👋`,
    heroDesc: "Tecnólogo Criativo bilíngue com mais de 12 anos de experiência em Empreendedorismo e Startups, IA, Gestão de Produtos e Estratégia, Desenvolvimento de Software e crescimento de negócios.",
    summary: "Em 2018, no primeiro ano de vida do meu filho, decidi alinhar minha carreira às minhas paixões e valores, buscando criar tecnologia significativa e resolver problemas do mundo real. Sou movido por propósito e deixei meu cargo como Engenheiro de Instalações para mergulhar de cabeça em startups e tecnologia. Fundei a Voalá Immersive Technology, onde conduzi a visão de produto e o desenvolvimento, entregando soluções de AR inovadoras, e desde então atuei em diversas startups em estágio inicial na Irlanda e no exterior. Tenho excelência em conduzir o desenvolvimento de produtos de startup, oferecer soluções práticas impulsionadas por IA e fomentar colaboração eficiente entre equipes multidisciplinares. Atualmente consulto como Head of Product em várias startups stealth em diferentes áreas de IA. Especializo‑me em design centrado no usuário, front‑end refinado e na criação de planos estratégicos com alcance global.",
    work: [
      "Prestando consultoria especializada a múltiplas startups de IA em modo stealth, com histórico comprovado no desenvolvimento de estratégias de produto orientadas por IA e na criação de soluções avançadas de front‑end. Liderando iniciativas que transformam ideias inovadoras em produtos escaláveis e acionáveis. Trabalhando em estreita colaboração com equipes multifuncionais para garantir a integração perfeita de tecnologias de IA, otimizando tanto a experiência do usuário quanto a arquitetura técnica.",
      "Entreguei desenvolvimento front‑end de alto impacto para um sistema de pesquisa jurídica por IA de ponta. Focado em soluções escaláveis e de alta eficiência, adaptadas às necessidades de escritórios de advocacia de primeira linha na Austrália.",
      "Liderei iniciativas de aceleração de produto e de crescimento estratégico. Ofereci orientação especializada em estratégia de produto, otimização da jornada do usuário e desenvolvimento front‑end ágil.",
      "Conduzi roteiros completos de IA em diversos setores. Conduzi sessões estratégicas executivas, desenvolvimento de front‑end e inovação interdisciplinar para os setores financeiro e de música.",
      "Influenciei a direção do produto por meio de análise aprofundada de tendências. Modelei e conduzi workshops de IA que moldaram decisões estratégicas e inspiraram abordagens inovadoras na organização.",
      "Fornecendo aconselhamento visionário em políticas nacionais para impulsionar inovações em autismo. Contribuindo ativamente para um ambiente mais inclusivo e fortalecido para comunidades neurodivergentes.",
      "Revitalizei as capacidades de produto criando uma linha de produtos AR inovadora. Gerenciei fluxos de trabalho ágeis, defini roteiros estratégicos e orientei equipes multifuncionais rumo ao sucesso.",
      "Fundei e liderei uma startup pioneira de AR. Assegurei financiamentos essenciais, direcionei a visão de produto, conduzi o desenvolvimento de software e executei um plano estratégico de lançamento no mercado.",
      "Assegurei a confiabilidade e conformidade de equipamentos de laboratório de última geração. Prestei suporte técnico essencial, mantendo um ambiente de pesquisa seguro e eficiente.",
      "Estruturei a expansão de mercado para a América Latina por meio de mapeamento detalhado de concorrentes e geração de leads. Influenciei decisões de alto nível sobre o crescimento regional.",
      "Otimizei operações de comércio internacional, identificando fornecedores confiáveis e negociando termos favoráveis. Naveguei por estruturas legais complexas para garantir resultados comerciais bem‑sucedidos.",
      "Desenvolvi e implementei programas de inglês integrados com tecnologia de aprendizagem de ponta. Melhorei os resultados educacionais por meio de designs de curso inovadores e soluções de TI.",
      "Liderei todos os aspectos da gestão da banda, desde reservas e folha de pagamento até branding e turnês. Fortaleci a presença de mercado do grupo por meio de planejamento estratégico e iniciativas de marketing.",
    ],
    hackathon:
      "Durante meu período na ESW, organizei um hackathon de IA. Evento interno que reuniu técnicos e não‑técnicos para criar soluções inovadoras para problemas internos. Foi impressionante ver as infinitas possibilidades ganharem vida por um grupo de pessoas motivadas e apaixonadas.",
    contact:
      "Quer conversar? Mande‑me um DM no Twitter com sua pergunta e responderei assim que possível. Solicitações de vendas serão ignoradas.",
  };

  // Helpers to choose English vs Portuguese:
  const S = lang === "en" ? DATA.summary : pt.summary;
  const D = lang === "en" ? DATA.description : pt.heroDesc;
  const greeting = lang === "en" ? `Hi, I'm ${DATA.name.split(" ")[0]} 👋` : pt.heroGreeting;

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={lang}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col min-h-[100dvh] space-y-10"
      >
        <section id="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="gap-2 flex justify-between">
              <div className="flex-col flex flex-1 space-y-1.5">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={greeting}
                />

                {/* shimmering toggle button */}
                <BlurFade delay={BLUR_FADE_DELAY + 0.1}>
                  <button
                    type="button"
                    onClick={toggleLang}
                    className="inline-block cursor-pointer"
                  >
                    <TextEffect per="word" preset="slide" className="text-[1.5rem]">
                      {lang === "en" ? "🇮🇪" : "🇧🇷"}
                    </TextEffect>
                  </button>
                </BlurFade>

                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={D}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar className="size-28 border">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </BlurFade>
            </div>
          </div>
        </section>
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">
              {lang === "en" ? "About" : "Sobre"}
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {S}
            </Markdown>
          </BlurFade>
        </section>
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <TextEffect
              per="word"
              preset="slide"
              delay={BLUR_FADE_DELAY * 5}
              as="h2"
              className="text-xl font-bold"
            >
              {lang === "en" ? "Work Experience" : "Experiência Profissional"}
            </TextEffect>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={
                    lang === "en"
                      ? work.description
                      : pt.work[id]
                  }
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <TextEffect
              per="word"
              preset="slide"
              delay={BLUR_FADE_DELAY * 7}
              as="h2"
              className="text-xl font-bold"
            >
              Education (Educação)
            </TextEffect>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Skills (Habilidades)</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id="projects">
          <div className="space-y-12 w-full py-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <TextEffect
                  per="word"
                  preset="slide"
                  delay={BLUR_FADE_DELAY * 11}
                  className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm"
                >
                  {lang === "en" ? "My Projects" : "Meus Projetos"}
                </TextEffect>
                <TextEffect
                  per="word"
                  preset="slide"
                  delay={BLUR_FADE_DELAY * 11 + 0.1}
                  as="h2"
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                >
                  {lang === "en" ? "Check out my latest work" : "Confira meu trabalho mais recente"}
                </TextEffect>
                <TextEffect
                  per="word"
                  preset="slide"
                  delay={BLUR_FADE_DELAY * 11 + 0.2}
                  className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  {lang === "en" ? "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites." : "Trabalhei em diversos projetos, de sites simples a aplicações web complexas. Aqui estão alguns dos meus favoritos."}
                </TextEffect>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    href={project.href}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id="hackathons">
          <div className="space-y-12 w-full py-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <TextEffect
                  per="word"
                  preset="slide"
                  delay={BLUR_FADE_DELAY * 13}
                  className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm"
                >
                  {lang === "en" ? "Hackathons" : "Hackatons"}
                </TextEffect>
                <TextEffect
                  per="word"
                  preset="slide"
                  delay={BLUR_FADE_DELAY * 13 + 0.1}
                  as="h2"
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                >
                  {lang === "en" ? "I like building things" : "Eu gosto de criar coisas"}
                </TextEffect>
                <TextEffect
                  per="word"
                  preset="slide"
                  delay={BLUR_FADE_DELAY * 13 + 0.2}
                  className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  {lang === "en" ? DATA.hackathons[0].description : pt.hackathon}
                </TextEffect>
              </div>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {DATA.hackathons.map((project, id) => (
                  <BlurFade
                    key={project.title + project.dates}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <HackathonCard
                      title={project.title}
                      description={project.description}
                      location={project.location}
                      dates={project.dates}
                      image={project.image}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>
        <section id="contact">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact (Contato)
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {lang === "en" ? "Get in Touch" : "Contato"}
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {lang === "en"
                    ? "Want to chat? Just shoot me a dm with a direct question on twitter and I'll respond whenever I can. I will ignore all soliciting."
                    : pt.contact}
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      </motion.main>
    </AnimatePresence>
  );
}
