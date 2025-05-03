import { type ChatSession, GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
// const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const activeChats = new Map();

const getOrCreateChatSession = (chatId: string): ChatSession => {
  console.log('activeChats.has(chatId)', activeChats.has(chatId));
  if (activeChats.has(chatId)) {
    const currentHistory = activeChats.get(chatId);
    console.log({ currentHistory, chatId });
    return model.startChat({
      history: currentHistory,
    });
  }
  const history = [
    {
      role: 'user',
      parts: process.env.GEMINI_PROMPT ?? 'oi',
    },
    {
      role: 'model',
      parts: 'Olá, certo!',
    },
  ];
  activeChats.set(chatId, history);
  return model.startChat({
    history,
  });
};

export const mainGoogle = async ({
  currentMessage, //Mensagem enviada pelo cliente ao bot
  chatId,        //Número do cliente: 558185437940@c.us
}: {
  currentMessage: string;
  chatId: string;
}): Promise<string> => {
  const chat = chatId === '558185437940@c.us' ? getOrCreateChatSession(chatId) : getOrCreateChatSession('');
  // const chat = getOrCreateChatSession(chatId);
  const prompt = currentMessage; //currentMessage: mensagem enviada pelo cliente
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();

  activeChats.set(chatId, [
    ...activeChats.get(chatId),
    {
      role: 'user',
      parts: prompt,
    },
    {
      role: 'model',
      parts: text,
    },
  ]);

  console.log('Resposta Gemini: ', text);
  return text;
};
