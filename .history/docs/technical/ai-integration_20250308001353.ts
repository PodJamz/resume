// AI integration using Vercel AI SDK
import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define AI state type
type AIState = {
  resumeId: string | null;
  currentSection: string | null;
  suggestedChanges: Record<string, string>;
  acceptedChanges: string[];
};

// Create initial AI state
const initialAIState: AIState = {
  resumeId: null,
  currentSection: null,
  suggestedChanges: {},
  acceptedChanges: []
};

// Create AI actions
export function createResumeAI() {
  const aiState = getMutableAIState<AIState>();
  
  return createAI({
    actions: {
      // Analyze the resume and provide suggestions
      analyzeResume: async (resumeId: string, targetRole: string) => {
        const ui = createStreamableUI();
        
        // Update AI state
        aiState.update((draft) => {
          draft.resumeId = resumeId;
        });
        
        ui.update(<div className="p-4 bg-gray-100 rounded-md">Analyzing your resume...</div>);
        
        // Fetch resume data from the database
        const resumeData = await fetchResumeData(resumeId);
        
        // Create the prompt for OpenAI
        const prompt = createResumeAnalysisPrompt(resumeData, targetRole);
        
        // Send to OpenAI for analysis
        const response = await openai.chat.completions.create({
          model: 'gpt-4-turbo',
          stream: true,
          messages: [
            { role: 'system', content: 'You are an expert resume coach helping to improve resumes for specific job roles.' },
            { role: 'user', content: prompt }
          ]
        });
        
        // Process the stream
        let fullResponse = '';
        
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          fullResponse += content;
          
          // Update UI with streaming content
          ui.update(
            <div className="p-4 bg-gray-100 rounded-md">
              <div className="font-semibold mb-2">Resume Analysis</div>
              <div className="whitespace-pre-wrap">{fullResponse}</div>
            </div>
          );
        }
        
        // Store the interaction in the database
        await storeAIInteraction(resumeId, prompt, fullResponse);
        
        return ui.done();
      },
      
      // Suggest improvements for a specific section
      suggestSectionImprovements: async (resumeId: string, sectionType: string, sectionContent: string, targetRole: string) => {
        const ui = createStreamableUI();
        
        // Update AI state
        aiState.update((draft) => {
          draft.resumeId = resumeId;
          draft.currentSection = sectionType;
        });
        
        ui.update(<div className="p-4 bg-gray-100 rounded-md">Generating suggestions for {sectionType}...</div>);
        
        // Create the prompt for section improvement
        const prompt = createSectionImprovementPrompt(sectionType, sectionContent, targetRole);
        
        // Send to OpenAI for suggestions
        const response = await openai.chat.completions.create({
          model: 'gpt-4-turbo',
          stream: true,
          messages: [
            { role: 'system', content: 'You are an expert resume coach. Suggest improvements to make this section more impactful for the target role.' },
            { role: 'user', content: prompt }
          ]
        });
        
        // Process the stream
        let fullResponse = '';
        
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          fullResponse += content;
          
          // Update UI with streaming content
          ui.update(
            <div className="p-4 bg-gray-100 rounded-md">
              <div className="font-semibold mb-2">Suggested Improvements</div>
              <div className="whitespace-pre-wrap">{fullResponse}</div>
            </div>
          );
        }
        
        // Store suggestion in AI state
        aiState.update((draft) => {
          draft.suggestedChanges[sectionType] = fullResponse;
        });
        
        // Store the interaction in the database
        await storeAIInteraction(resumeId, prompt, fullResponse);
        
        return ui.done();
      },
      
      // Apply suggested changes to a section
      applySuggestion: async (resumeId: string, sectionType: string) => {
        const ui = createStreamableUI();
        const state = aiState.get();
        
        if (!state.suggestedChanges[sectionType]) {
          return ui.done(<div>No suggestions to apply</div>);
        }
        
        // Update database with the suggested change
        await updateResumeSection(resumeId, sectionType, state.suggestedChanges[sectionType]);
        
        // Update AI state
        aiState.update((draft) => {
          draft.acceptedChanges.push(sectionType);
        });
        
        ui.done(
          <div className="p-4 bg-green-100 rounded-md">
            <div className="font-semibold text-green-700">Changes applied successfully!</div>
          </div>
        );
      }
    },
    initialAIState
  });
}

// Helper functions
async function fetchResumeData(resumeId: string) {
  // Implementation to be added
}

async function storeAIInteraction(resumeId: string, userMessage: string, aiResponse: string) {
  // Implementation to be added
}

async function updateResumeSection(resumeId: string, sectionType: string, content: string) {
  // Implementation to be added
}

function createResumeAnalysisPrompt(resumeData: any, targetRole: string) {
  return `Analyze this resume for a ${targetRole} position:
${JSON.stringify(resumeData, null, 2)}

Provide a concise analysis of the resume's strengths and weaknesses for this target role.
Suggest specific improvements that would make this resume more effective for a ${targetRole} position.`;
}

function createSectionImprovementPrompt(sectionType: string, sectionContent: string, targetRole: string) {
  return `I need to improve the ${sectionType} section of my resume for a ${targetRole} position.

Current content:
${sectionContent}

Please suggest specific improvements to make this section more impactful and relevant for the ${targetRole} position.
Focus on using strong action verbs, quantifying achievements where possible, and highlighting skills relevant to the role.`;
} 