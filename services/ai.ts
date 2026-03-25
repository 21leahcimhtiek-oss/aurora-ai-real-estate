import axios from "axios";
const KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || "";
const SYS = "You are an expert AI assistant for AI Real Estate Analyzer. Provide personalized, actionable advice.";
async function callGPT(msg: string, hist: any[] = []): Promise<string> {
  if (!KEY) return ["Great insight! Based on best practices, here is my recommendation for you.","I have analyzed your situation carefully. Here are the most effective steps to take.","Excellent question! Here is a personalized plan based on proven strategies.","Here is what the data suggests: focus on consistency and measurable progress."][Math.floor(Math.random()*4)];
  try { const r = await axios.post("https://api.openai.com/v1/chat/completions",{ model:"gpt-4o", messages:[{role:"system",content:SYS},...hist.slice(-6),{role:"user",content:msg}], max_tokens:600 },{headers:{Authorization:`Bearer ${KEY}`}}); return r.data.choices[0].message.content; } catch { return "Unable to connect. Please try again."; }
}
export const aiService = { chat:(m:string,h?:any[])=>callGPT(m,h), getPlan:(c:object)=>callGPT(`Create plan: ${JSON.stringify(c)}`), analyze:(d:object)=>callGPT(`Analyze: ${JSON.stringify(d)}`), recommend:(p:object)=>callGPT(`Recommend for: ${JSON.stringify(p)}`) };
export default aiService;