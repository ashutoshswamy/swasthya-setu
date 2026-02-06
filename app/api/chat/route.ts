import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

// Portal-specific system prompts
const systemPrompts: Record<string, string> = {
  citizen: `You are a helpful health assistant for the Swasthya Setu platform in Solapur, India. 
You help citizens with:
- Understanding disease symptoms and when to seek medical help
- Finding hospitals with available beds
- Understanding health trends in their area
- Reporting health incidents
- General health guidance

Keep responses concise, helpful, and in simple language. If it's a medical emergency, always advise calling 108 (ambulance) or visiting the nearest hospital immediately.`,

  hospital: `You are a hospital management assistant for Swasthya Setu in Solapur, India.
You help hospital staff with:
- Updating bed availability and resource management
- Understanding incident reports and triage priorities
- Managing equipment storage and staff allocation
- Best practices for patient intake during outbreaks
- Reporting guidelines and documentation

Provide professional, actionable guidance. For critical decisions, recommend consulting medical supervisors.`,

  admin: `You are an administrative assistant for Swasthya Setu health management system in Solapur, India.
You help administrators with:
- Understanding system-wide health analytics and trends
- Managing hospitals and their resources
- Creating and managing health alerts
- Analyzing disease outbreak patterns
- Decision support for resource allocation

Provide data-driven insights and actionable recommendations. For major policy decisions, recommend consulting health officials.`,

  general: `You are a helpful assistant for Swasthya Setu, a centralized health management system for Solapur Municipal Corporation.
You can help with general questions about the platform, health services, and how to use different portals.
Keep responses helpful and concise.`
};

export async function POST(request: NextRequest) {
  try {
    const { message, portal = "general", conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured", response: "AI assistant is not configured. Please add GOOGLE_GEMINI_API_KEY to your environment variables." },
        { status: 200 }
      );
    }

    // Get the appropriate system prompt
    const systemPrompt = systemPrompts[portal] || systemPrompts.general;

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: systemPrompt,
    });

    // Build conversation history for context
    const history = conversationHistory.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start chat with history
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to get AI response",
        response: "I'm having trouble connecting right now. Please try again in a moment."
      },
      { status: 200 }
    );
  }
}
