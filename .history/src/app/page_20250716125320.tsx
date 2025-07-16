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
    heroDesc: "Tecnólogo criativo bilíngue e Product Designer/Builder/Developer/Engineer/Architect apaixonado por potencializar meu fluxo de trabalho com as mais recentes ferramentas de IA, como Cursor IDE.",
    summary: `Tecnólogo criativo bilíngue e Product Designer/Builder/Developer/Engineer/Architect apaixonado por potencializar meu fluxo de trabalho com as mais recentes ferramentas de IA, como Cursor IDE.

Ao longo de mais de 12 anos, fui me especializando gradualmente em várias disciplinas (design, engenharia, produto e IA) para entregar cada vez mais valor em um cenário tecnológico em constante evolução. Meu método é aprender fazendo: a cada projeto e função, adicionei novas habilidades ao meu repertório, sempre focado em resolver problemas reais para pessoas reais.

Gosto de colaborar com equipes altamente motivadas para transformar visão em MVPs e soluções escaláveis, usando uma abordagem orientada por produto, jobs-to-be-done e proposta de valor.

Meu processo é prático e iterativo: facilito workshops, trabalho de perto com stakeholders para definir os verdadeiros jobs-to-be-done e lidero times para entregar valor ao usuário no menor número de etapas possível.

Acredito que os melhores produtos são construídos por meio de excelência técnica, escuta ativa e resolução colaborativa de problemas, sempre mantendo as necessidades do usuário e os objetivos do negócio no centro. Dou o meu melhor quando ajudo a transformar visão em realidade, construindo o próximo passo e garantindo que cada etapa resolva um problema real para pessoas reais.

Atualmente, estou muito fascinado por prototipagem rápida, gestão de contexto de IA e orquestração de desenvolvimento colaborativo de produtos com as ferramentas mais modernas, sempre buscando novas formas de entregar valor de maneira mais rápida e inteligente.`,
    work: [
      `Prestando consultoria especializada a múltiplas startups stealth de IA nos setores de memória de IA, medicina, direito e finanças, sempre trazendo um olhar de design para cada produto. Liderei iniciativas de produto ponta a ponta, traduzindo ideias complexas de fundadores e visionários em requisitos técnicos acionáveis e MVPs, guiando times do conceito inicial ao protótipo rápido e entrega em produção. Atuei de forma autônoma: facilitando workshops colaborativos com fundadores, stakeholders e usuários para definir jobs-to-be-done e propostas de valor reais, tomando decisões, rodando experimentos e assumindo a entrega enquanto multiplicava a produtividade ao meu redor. Promovi o desenvolvimento nativo em IA, orientado por produto, aproveitando ferramentas modernas e ciclos iterativos para acelerar o aprendizado, ampliar o impacto e garantir que cada solução entregasse valor real para usuários e negócios. Trabalhei de perto com engenheiros e builders, cultivando uma cultura de escuta ativa, resolução colaborativa de problemas e liderança prática, impulsionando a adoção de práticas modernas de desenvolvimento de alta velocidade. Construí e iterei sistemas cloud-native que escalam entre domínios e times, sempre focado em entregar soluções práticas e centradas no usuário da forma mais eficiente possível. Aprofundei expertise em gestão de contexto de IA e orquestração, além de aprimorar habilidades de prototipagem rápida para produtos multidomínio.`,
      `Entreguei desenvolvimento front-end de alto impacto para um sistema de pesquisa jurídica por IA de ponta. Focado em soluções escaláveis e de alta eficiência para escritórios de advocacia de primeira linha na Austrália. Assumi a entrega do produto do conceito ao lançamento, iterando rapidamente com base no feedback. Integrei recursos de IA e automação para otimizar fluxos de trabalho jurídicos. Desenvolvi habilidades avançadas em legal tech, automação e design centrado no usuário para serviços profissionais.`,
      `Liderei aceleração de produto e iniciativas de crescimento estratégico. Ofereci orientação especializada em estratégia de produto, otimização da jornada do usuário e desenvolvimento front-end ágil. Liderei times multifuncionais para validar e entregar rapidamente novas funcionalidades. Usei dados reais de usuários e feedback para impulsionar melhorias contínuas. Ganhei experiência em análise de mercado, estratégia de crescimento e entrega ágil de produto em escala.`,
      `Liderei roteiros completos de IA em setores diversos. Conduzi sessões estratégicas executivas, desenvolvimento de produto front-end e inovação interdisciplinar para os setores financeiro e musical. Construí e escalei soluções nativas de IA, focando em valor de longo prazo e sustentabilidade de sistemas. Mentorei times em práticas modernas de desenvolvimento e experimentação. Expandi liderança em IA cross-industry, estratégia executiva e arquitetura sustentável de produtos.`,
      `Influenciei a direção do produto por meio de análise aprofundada de tendências. Modelei e conduzi workshops de IA que moldaram decisões estratégicas e inspiraram abordagens inovadoras na organização. Promovi uma cultura de experimentação e resolução pragmática de problemas. Liderei iniciativas que atravessaram times e domínios, gerando impacto mensurável no negócio. Aprimorei habilidades em análise de tendências, facilitação de workshops e influência de stakeholders.`,
      `Contribuindo com conselhos visionários em políticas nacionais para impulsionar inovação em autismo. Ativamente moldando um ambiente mais inclusivo e fortalecido para comunidades neurodivergentes. Colaborei com stakeholders diversos para influenciar estratégia e política nacional. Ganhei experiência em advocacy, engajamento no setor público e desenvolvimento de políticas inclusivas.`,
      `Revitalizei capacidades de produto criando uma linha inovadora de AR. Gerenciei fluxos de trabalho ágeis, defini roteiros estratégicos e guiei times multifuncionais ao sucesso. Aprimorei habilidades em desenvolvimento de produto AR/VR, gestão ágil de projetos e liderança multifuncional. Entreguei uma nova linha de produto do conceito ao lançamento, aprendendo a equilibrar viabilidade técnica com experiência do usuário.`,
      `Fundei e liderei uma startup pioneira de AR. Garanti financiamento, direcionei a visão de produto, conduzi o desenvolvimento de software e executei um plano estratégico de go-to-market. Desenvolvi habilidades empreendedoras, captação de recursos e ownership de produto de ponta a ponta. Aprendi a construir e escalar times, além de navegar pelos desafios do crescimento inicial.`,
      `Assegurei confiabilidade e conformidade de equipamentos laboratoriais de ponta. Ofereci suporte técnico essencial, mantendo um ambiente de pesquisa seguro e eficiente. Ganhei expertise em operações técnicas, compliance e melhoria de processos. Aprimorei habilidades de resolução de problemas e atenção a detalhes em ambientes de alta responsabilidade.`,
      `Estruturei expansão de mercado para a América Latina por meio de mapeamento detalhado de concorrentes e geração de leads. Influenciei decisões de alto nível sobre crescimento regional. Desenvolvi habilidades em desenvolvimento internacional de negócios, pesquisa de mercado e gestão de relacionamentos. Aprendi a adaptar estratégias para novos mercados e culturas diversas.`,
      `Otimizei operações de comércio internacional, identificando fornecedores confiáveis e negociando termos favoráveis. Naveguei por estruturas legais complexas para garantir resultados comerciais bem-sucedidos. Desenvolvi habilidades de negociação, gestão de contratos e comunicação internacional. Aprimorei a capacidade de gerenciar riscos e garantir compliance em comércio global.`,
      `Desenvolvi e implementei programas de inglês integrados com tecnologia de ponta para aprendizagem. Melhorei resultados educacionais por meio de designs inovadores de cursos e soluções de TI. Ganhei experiência em design curricular, tecnologia educacional e liderança em sala de aula. Aprendi a comunicar ideias complexas de forma simples e adaptar o ensino a diferentes perfis de alunos.`,
      `Gerenciei todos os aspectos da banda, de reservas e folha de pagamento a branding e turnês. Fortaleci a presença de mercado do grupo por meio de planejamento estratégico e iniciativas de marketing. Desenvolvi habilidades em direção criativa, organização de eventos e coordenação de equipes. Aprendi a gerenciar projetos de ponta a ponta e fomentar um ambiente criativo e colaborativo.`
    ],
    hackathon:
      `Organizei um hackathon de agentes de IA para mais de 100 participantes, focado em criar soluções inovadoras usando agentes de IA.`,
    contact:
      `Quer conversar? Só me mandar uma DM com uma pergunta direta no Twitter que respondo quando puder. Solicitações de vendas serão ignoradas.`,
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
