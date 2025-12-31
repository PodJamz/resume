# Way 🌊: Building a Calm AI You Can Actually Talk To

This week I built **Way**, a contemplative AI experience inspired by Lao Tzu. You arrive, you speak or type what's on your mind, and you get a reflective response, while a living "water surface" moves behind the words like a quiet companion.

It started after speaking to my friend [Wenmin Sun](https://www.linkedin.com/in/wenmin-sun-ab040326b/) about the Tao. We were discussing the wisdom of Lao Tzu, and I thought: "Hey, I should put something together to make it easy to consult the wisdom of the Tao." And hey presto, here we have it.

Most AI chat apps feel like forms: type → submit → wait. Way aims for something softer. Here's what I learned building it.

## The Experience We Wanted

Most AI chat apps feel transactional. Way aims for something contemplative:

- **Immediate, streaming replies** (so it feels like a conversation, not a page load)
- **Optional voice** (so you can speak thoughts that don't want typing)
- **Grounded tone** (so it doesn't drift into generic "internet wisdom")
- **Ambient water** (so the UI feels like a place, not a tool)

The goal isn't "voice assistant" energy, it's more like speaking into still water and hearing it answer.

## The Tech Stack That Made It Feel Simple

### Next.js, the "home" for everything

We built Way with Next.js (App Router) so the UI and server logic can live together cleanly. The app renders the interface, handles routing, and manages server endpoints for chat streaming and voice-related requests. It deploys cleanly to production without complicated infrastructure.

### Vercel AI SDK, streaming that feels alive

The biggest "feel" upgrade is streaming: the assistant's reply appears as it's being generated. That tiny difference changes the vibe from "submit a ticket" to "someone is responding." It also keeps the app feeling fast even when the model takes a moment.

### RAG, keeping the reflection anchored

A philosophical voice can easily become vague. To keep Way grounded, we use RAG (Retrieval Augmented Generation):

- We chunk the Tao Te Ching text
- Create embeddings for each chunk
- On each user message, we retrieve the most relevant passages
- Then we feed those passages as "context to reflect on," so the response stays close to the source

This is how Way can feel more like it's drawing from a real text, without turning every answer into a quotation dump.

### Convex, the backend brain (including vector search)

Convex powers the backend pieces that make RAG and data workflows practical: actions/mutations/queries to orchestrate ingestion + search, vector storage + vector search to retrieve relevant passages quickly, and a solid foundation to expand persistence later without overbuilding upfront.

### Voice, using the browser's native speech tools

Way supports voice through browser capabilities: speech-to-text to capture what you say, and text-to-speech (where supported) to speak the reflection back. The goal is removing friction, not adding complexity.

### WebGPU + WGSL, the water isn't a video, it's real-time graphics

The Waterball background is powered by WebGPU, with shaders written in WGSL. That gives us real-time simulation/rendering on the GPU, a visual layer that feels organic and responsive, and a calm ambient presence that supports (rather than distracts from) the conversation.

**Credit:** The Waterball simulation work that inspired this integration is credited to [matsuoka-601](https://github.com/matsuoka-601) and their open-source WaterBall project, "Real-time fluid simulation on a sphere implemented in WebGPU." See: [WaterBall on GitHub](https://github.com/matsuoka-601/WaterBall).

## Why This Stack Worked

We picked tech that supports the feeling of the product:

- Next.js for a clean full-stack app surface
- Vercel AI SDK for streaming conversation
- OpenAI + RAG for grounded, less-generic reflections
- Convex for vector search and backend workflows
- WebGPU for a living background that makes the experience memorable
- Browser speech APIs for voice that removes friction

## Key Insights for AI Product Design

### 1. **Streaming Changes Everything**

The difference between waiting for a response and watching it appear word-by-word transforms the experience from transactional to conversational. It's a small technical detail with huge UX impact.

### 2. **RAG Keeps AI Grounded**

Without RAG, philosophical AI can drift into generic "internet wisdom." By grounding responses in actual source material (in this case, the Tao Te Ching), the AI feels more authentic and less like it's making things up.

### 3. **Ambient Design Creates Presence**

The WebGPU water simulation isn't just decoration, it's ambient design that makes the UI feel like a place, not a tool. The visual layer supports the conversation without distracting from it.

### 4. **Voice Should Remove Friction, Not Add It**

Using browser-native speech APIs means no external dependencies, no complex setup. Voice becomes a natural extension of the experience, not a feature you have to configure.

## What This Means for AI Product Design

Way explores what happens when you design AI experiences around feeling, not just functionality. It's not about adding more features, it's about creating an environment where the technology supports the experience you want to create:

- **Streaming makes it conversational**, not transactional
- **RAG keeps it grounded**, not generic
- **Ambient design creates presence**, not just an interface
- **Voice removes friction**, doesn't add complexity

This requires thinking about the entire experience, not just the AI model. The tech stack, the UI, the visual design, and the interaction patterns all work together to create something that feels intentional and calm.

## Try It Yourself

Way is live at [way-lovat.vercel.app](https://way-lovat.vercel.app). Speak your mind, type your thoughts, and see how streaming, voice, RAG, and real-time graphics come together to create something that feels less like a tool and more like a companion.

I'm fascinated by rapid prototyping, AI context management, and building experiences that feel intentional. If you're experimenting with streaming AI, RAG, WebGPU, or voice interfaces, I'd love to connect and share learnings.

What's your experience building AI products that prioritize feeling over features? Have you experimented with streaming, RAG, or ambient design? What challenges have you faced creating AI experiences that feel calm and contemplative?

---

*Live demo: [way-lovat.vercel.app](https://way-lovat.vercel.app)*

---

*I'm currently consulting with multiple stealth-mode AI startups across AI memory, Medical, Law, and Finance sectors. Always happy to discuss AI architecture, product design, and building experiences that feel intentional.*

#AIProductDesign #StreamingAI #RAG #WebGPU #VoiceAI #ProductDesign #TechLeadership #AIArchitecture #NextJS #VercelAI #Convex #OpenAI #ArtificialIntelligence #ProductManagement #CreativeTechnology
