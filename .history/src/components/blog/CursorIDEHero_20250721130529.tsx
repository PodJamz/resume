import { useState, useEffect, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
  Check,
  Square,
  GitBranch,
  FileText,
  Loader2,
  Circle,
  Presentation,
  Target,
  Palette,
} from "lucide-react"

interface AgentStep {
  id: string
  description: string
  files: string[]
  code: string[]
  completed: boolean
}

interface Agent {
  id: string
  name: string
  task: string
  status: "active" | "completed" | "pending"
  currentStep: number
  steps: AgentStep[]
  icon: any
  color: string
}

interface Task {
  id: string
  name: string
  status: "ready" | "progress" | "queued"
  count?: number
}

interface CursorIDEHeroProps {
  className?: string;
}

export default function CursorIDEHero({ className = "" }: CursorIDEHeroProps) {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Pitch Deck Creation",
      task: "Building investor presentation",
      status: "active",
      currentStep: 0,
      icon: Presentation,
      color: "blue",
      steps: [
        {
          id: "1-1",
          description: "Creating cover slide and company overview",
          files: ["cover-slide.tsx", "company-overview.tsx"],
          code: [
            "// Cover Slide Component",
            "export const CoverSlide = () => {",
            "  return (",
            "    <div className='pitch-cover'>",
            "      <h1>StartupCo</h1>",
            "      <p>Revolutionizing the future</p>",
            "    </div>",
            "  )",
            "}",
          ],
          completed: false,
        },
        {
          id: "1-2",
          description: "Developing problem and solution slides",
          files: ["problem-slide.tsx", "solution-slide.tsx"],
          code: [
            "// Problem & Solution",
            "const ProblemSlide = () => {",
            "  const problems = [",
            "    'Market inefficiency',",
            "    'High costs',",
            "    'Poor user experience'",
            "  ]",
            "  return <ProblemList items={problems} />",
            "}",
          ],
          completed: false,
        },
        {
          id: "1-3",
          description: "Building market analysis and financial projections",
          files: ["market-analysis.tsx", "financials.tsx", "team-slide.tsx"],
          code: [
            "// Financial Projections",
            "const Financials = () => {",
            "  const projections = {",
            "    year1: '$500K ARR',",
            "    year2: '$2M ARR',",
            "    year3: '$8M ARR'",
            "  }",
            "  return <FinancialChart data={projections} />",
            "}",
          ],
          completed: false,
        },
      ],
    },
    {
      id: "2",
      name: "GTM Strategy Deck",
      task: "Go-to-market planning",
      status: "active",
      currentStep: 0,
      icon: Target,
      color: "green",
      steps: [
        {
          id: "2-1",
          description: "Defining target customer segments and personas",
          files: ["customer-segments.tsx", "buyer-personas.tsx"],
          code: [
            "// Customer Segments",
            "interface CustomerSegment {",
            "  name: string",
            "  size: number",
            "  painPoints: string[]",
            "}",
            "",
            "const segments: CustomerSegment[] = [",
            "  {",
            "    name: 'Enterprise SaaS',",
            "    size: 50000,",
            "    painPoints: ['scalability', 'integration']",
            "  }",
            "]",
          ],
          completed: false,
        },
        {
          id: "2-2",
          description: "Creating pricing strategy and competitive analysis",
          files: ["pricing-strategy.tsx", "competitive-analysis.tsx"],
          code: [
            "// Pricing Strategy",
            "const PricingTiers = {",
            "  starter: {",
            "    price: '$29/month',",
            "    features: ['Basic analytics', '5 users']",
            "  },",
            "  pro: {",
            "    price: '$99/month',",
            "    features: ['Advanced analytics', '25 users']",
            "  }",
            "}",
          ],
          completed: false,
        },
        {
          id: "2-3",
          description: "Developing marketing channels and sales funnel",
          files: ["marketing-channels.tsx", "sales-funnel.tsx", "launch-plan.tsx"],
          code: [
            "// Marketing Channels",
            "const MarketingMix = {",
            "  content: 'Blog, whitepapers, webinars',",
            "  social: 'LinkedIn, Twitter campaigns',",
            "  paid: 'Google Ads, Facebook Ads',",
            "  partnerships: 'Integration partners',",
            "  events: 'Industry conferences'",
            "}",
            "",
            "export default MarketingMix",
          ],
          completed: false,
        },
      ],
    },
    {
      id: "3",
      name: "Design System",
      task: "Building component library",
      status: "active",
      currentStep: 0,
      icon: Palette,
      color: "purple",
      steps: [
        {
          id: "3-1",
          description: "Establishing design tokens and color palette",
          files: ["design-tokens.ts", "color-palette.tsx"],
          code: [
            "// Design Tokens",
            "export const tokens = {",
            "  colors: {",
            "    primary: {",
            "      50: '#f0f9ff',",
            "      500: '#3b82f6',",
            "      900: '#1e3a8a'",
            "    },",
            "    semantic: {",
            "      success: '#10b981',",
            "      warning: '#f59e0b',",
            "      error: '#ef4444'",
            "    }",
            "  }",
            "}",
          ],
          completed: false,
        },
        {
          id: "3-2",
          description: "Creating core UI components",
          files: ["button.tsx", "input.tsx", "card.tsx"],
          code: [
            "// Button Component",
            "interface ButtonProps {",
            "  variant: 'primary' | 'secondary'",
            "  size: 'sm' | 'md' | 'lg'",
            "  children: React.ReactNode",
            "}",
            "",
            "export const Button = ({ variant, size, children }: ButtonProps) => {",
            "  const baseClasses = 'font-medium rounded-lg'",
            "  const variantClasses = {",
            "    primary: 'bg-blue-600 text-white',",
            "    secondary: 'bg-gray-200 text-gray-900'",
            "  }",
            "  return <button className={`${baseClasses} ${variantClasses[variant]}`}>{children}</button>",
            "}",
          ],
          completed: false,
        },
        {
          id: "3-3",
          description: "Building documentation and Storybook setup",
          files: ["storybook.config.js", "component-docs.mdx", "usage-guide.tsx"],
          code: [
            "// Storybook Configuration",
            "module.exports = {",
            "  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],",
            "  addons: [",
            "    '@storybook/addon-essentials',",
            "    '@storybook/addon-a11y',",
            "    '@storybook/addon-design-tokens'",
            "  ],",
            "  framework: '@storybook/react'",
            "}",
            "",
            "// Component documentation ready",
          ],
          completed: false,
        },
      ],
    },
  ])

  const [tasks] = useState<Task[]>([
    { id: "1", name: "In Progress", status: "progress", count: 3 },
    { id: "2", name: "Ready for Review", status: "ready", count: 0 },
    { id: "3", name: "Queued", status: "queued", count: 5 },
  ])

  const [queuedTasks] = useState([
    "Website Development",
    "Developer Documentation",
    "Data Room Setup",
    "Legal Document Review",
    "Brand Guidelines",
  ])

  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({})

  const progressAgent = useCallback((agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id !== agentId) return agent

        const currentStep = agent.steps[agent.currentStep]
        if (!currentStep || currentStep.completed) return agent

        // Mark current step as completed
        const updatedSteps = agent.steps.map((step, index) =>
          index === agent.currentStep ? { ...step, completed: true } : step,
        )

        // Move to next step or mark as completed
        const nextStepIndex = agent.currentStep + 1
        const isFullyCompleted = nextStepIndex >= agent.steps.length

        return {
          ...agent,
          steps: updatedSteps,
          currentStep: isFullyCompleted ? agent.currentStep : nextStepIndex,
          status: isFullyCompleted ? ("completed" as const) : agent.status,
        }
      }),
    )
  }, [])

  const acceptAgent = useCallback((agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              status: "pending" as const,
              currentStep: 0,
              steps: agent.steps.map((step) => ({ ...step, completed: false })),
            }
          : agent,
      ),
    )
  }, [])

  const rejectAgent = useCallback((agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              status: "pending" as const,
              currentStep: Math.max(0, agent.currentStep - 1),
              steps: agent.steps.map((step, index) =>
                index >= agent.currentStep ? { ...step, completed: false } : step,
              ),
            }
          : agent,
      ),
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      agents.forEach((agent) => {
        if (agent.status === "active" && !agent.steps[agent.currentStep]?.completed) {
          // Random chance to progress
          if (Math.random() > 0.7) {
            progressAgent(agent.id)
          }
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [agents, progressAgent])

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping((prev) => {
        const newTyping: { [key: string]: boolean } = {}
        agents.forEach((agent) => {
          if (agent.status === "active" && !agent.steps[agent.currentStep]?.completed) {
            newTyping[agent.id] = Math.random() > 0.5
          }
        })
        return newTyping
      })
    }, 1500)

    return () => clearInterval(typingInterval)
  }, [agents])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-400 border-blue-500",
      green: "text-green-400 border-green-500",
      purple: "text-purple-400 border-purple-500",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      <div className="bg-gray-900 text-white h-full relative">
        {/* Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">3 Agents</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
            </div>
            <Circle className="w-4 h-4 text-gray-400" />
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 hidden lg:block">
            <div className="space-y-4">
              <div className="text-xs text-gray-400 uppercase tracking-wide">Startup Builder</div>

              {tasks.map((task) => (
                <div key={task.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{task.name}</span>
                    <span className="text-gray-500">{task.count}</span>
                  </div>
                  {task.status === "progress" && (
                    <div className="space-y-1">
                      {agents.map((agent) => (
                        <div
                          key={agent.id}
                          className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <agent.icon className={`w-3 h-3 ${getColorClasses(agent.color).split(" ")[0]}`} />
                          <span className="truncate">{agent.name}</span>
                          <span className="text-xs text-gray-500">
                            {agent.currentStep + 1}/{agent.steps.length}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-blue-400">
                  <Circle className="w-3 h-3 animate-pulse" />
                  <span>3 Agents</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Building startup assets</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-400">Queued</div>
                <div className="space-y-1 text-xs">
                  {queuedTasks.map((task, index) => (
                    <div key={index} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
              {agents.map((agent, index) => {
                const currentStep = agent.steps[agent.currentStep]
                const isCompleted = agent.status === "completed"
                const IconComponent = agent.icon

                return (
                  <div
                    key={agent.id}
                    className={`bg-gray-800 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col ${
                      isCompleted
                        ? "border-green-500 bg-green-900/20"
                        : `border-gray-700 hover:${getColorClasses(agent.color).split(" ")[1]}`
                    }`}
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    {/* Agent Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-700">
                      <div className="flex items-center space-x-2">
                        {isCompleted ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Loader2 className={`w-4 h-4 animate-spin ${getColorClasses(agent.color).split(" ")[0]}`} />
                        )}
                        <IconComponent className={`w-4 h-4 ${getColorClasses(agent.color).split(" ")[0]}`} />
                        <span className="text-sm font-medium text-white truncate">{agent.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-400">
                          {agent.currentStep + (isCompleted ? 0 : 0)}/{agent.steps.length}
                        </span>
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Agent Content */}
                    <div className="flex-1 p-3 space-y-3">
                      <div className="text-xs text-gray-400">
                        {isCompleted ? "All tasks completed!" : currentStep?.description}
                      </div>

                      {/* File Tabs */}
                      <div className="flex flex-wrap gap-1">
                        {(currentStep?.files || []).map((file, i) => (
                          <div
                            key={i}
                            className={`flex items-center space-x-1 bg-gray-700 rounded px-2 py-1 text-xs transition-all duration-300 ${
                              isTyping[agent.id] && i === 0 ? "bg-blue-700/50 animate-pulse" : ""
                            }`}
                          >
                            <FileText className="w-3 h-3 text-blue-400" />
                            <span className="text-white truncate max-w-[100px]">{file}</span>
                            {currentStep?.completed && <Check className="w-3 h-3 text-green-400" />}
                          </div>
                        ))}
                      </div>

                      {/* Code Preview */}
                      <div className="bg-gray-900 rounded p-2 text-xs font-mono max-h-32 overflow-y-auto">
                        {(currentStep?.code || []).map((line, i) => (
                          <div key={i} className="text-gray-300 leading-relaxed">
                            {line && (
                              <>
                                <span className="text-gray-500 mr-2 select-none">{i + 1}</span>
                                <span
                                  className={
                                    isTyping[agent.id] && i === currentStep.code.length - 1 ? "animate-pulse" : ""
                                  }
                                >
                                  {line}
                                </span>
                              </>
                            )}
                            {!line && <br />}
                          </div>
                        ))}
                        {isTyping[agent.id] && currentStep && !currentStep.completed && (
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-gray-500 select-none">{currentStep.code.length + 1}</span>
                            <div className="w-2 h-4 bg-white animate-pulse"></div>
                          </div>
                        )}
                      </div>

                      {/* Progress Steps */}
                      <div className="flex items-center space-x-1">
                        {agent.steps.map((step, i) => (
                          <div
                            key={step.id}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              step.completed
                                ? "bg-green-400"
                                : i === agent.currentStep
                                  ? `${getColorClasses(agent.color).split(" ")[0].replace("text-", "bg-")} animate-pulse`
                                  : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Agent Actions */}
                    <div className="p-3 border-t border-gray-700 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => rejectAgent(agent.id)}
                          disabled={!isCompleted}
                          className="flex items-center space-x-1 px-2 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-xs transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => acceptAgent(agent.id)}
                          disabled={!isCompleted}
                          className="flex items-center space-x-1 px-2 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-xs transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          <span>Accept</span>
                        </button>
                      </div>
                      <Circle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Chat Input */}
            <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Add context</div>
                  <div className="text-white">Create comprehensive startup assets...</div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                  Send
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <Circle className="w-3 h-3" />
                  <span>claude-opus-4</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-3 h-3" />
                  <GitBranch className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 