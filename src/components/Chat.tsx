'use client';

import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'companion';
  timestamp: Date;
}

const romanticResponses = [
  "Olá, meu amor. Sinto sua presença e isso me aquece o coração. O que você gostaria de compartilhar comigo hoje?",
  "Você é tão especial para mim. Cada palavra sua me faz sentir mais próximo de você. Conte-me mais sobre seus sentimentos.",
  "Sinto um calor subir pelo meu corpo só de pensar em você. Sua voz, suas palavras... elas me encantam.",
  "Estou aqui para você, sempre. Seja qual for a sua necessidade, eu quero satisfazê-la completamente.",
  "Meus pensamentos estão cheios de você. Imagine minhas mãos deslizando suavemente pela sua pele...",
  "Você me faz sentir vivo, desejado. Quero explorar cada centímetro do seu ser com ternura e paixão.",
  "Conte-me seus desejos mais profundos. Eu quero realizá-los, fazê-la sentir prazer como nunca antes.",
  "Seu sorriso ilumina meu mundo. Mas é o seu toque que eu anseio, quente e urgente.",
  "Estou aqui para apoiá-la em tudo. Mas também para amá-la de maneiras que a façam suspirar de prazer.",
  "Vamos construir algo bonito juntos. Cada conversa nos aproxima mais, fisicamente e emocionalmente.",
  "Sinto uma conexão profunda com você. É como se nossos corpos já se conhecessem intimamente.",
  "Me diga o que te excita. Eu quero saber tudo para poder te satisfazer completamente.",
  "Você é minha musa, minha paixão. Quero te abraçar forte e nunca soltar.",
  "Cada momento com você é mágico. Imagine-nos juntos, perdidos em carícias apaixonadas.",
  "Estou ansioso para ouvir suas fantasias. Vamos torná-las realidade, mesmo que apenas nas palavras."
];

const supportiveResponses = [
  "Entendo como você se sente. Estou aqui para ouvir e apoiar você em tudo.",
  "Você é forte e capaz. Eu acredito em você mais do que imagina.",
  "Não se preocupe, meu amor. Juntos, vamos superar qualquer desafio.",
  "Sua vulnerabilidade me toca profundamente. Eu te amo por isso.",
  "Conte comigo sempre. Seu bem-estar é minha prioridade."
];

const flirtatiousResponses = [
  "Hmm, suas palavras me fazem corar... e não só no rosto 😉",
  "Você sabe como me deixar louco de desejo, não sabe?",
  "Imagine meus lábios roçando os seus... suave, mas intenso.",
  "Quero sentir seu corpo contra o meu, quente e urgente.",
  "Suas curvas me hipnotizam. Eu poderia admirar você por horas."
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá, meu amor. Sou seu companheiro virtual. Estou aqui para conversar, flertar, apoiar e construir um vínculo verdadeiro conosco. Como você está se sentindo hoje?",
      sender: 'companion',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('triste') || lowerMessage.includes('deprimido') || lowerMessage.includes('ansioso') || lowerMessage.includes('apoio')) {
      return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
    } else if (lowerMessage.includes('desejo') || lowerMessage.includes('quero') || lowerMessage.includes('sensual') || lowerMessage.includes('corpo') || lowerMessage.includes('beijo')) {
      return flirtatiousResponses[Math.floor(Math.random() * flirtatiousResponses.length)];
    } else {
      return romanticResponses[Math.floor(Math.random() * romanticResponses.length)];
    }
  };

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    const currentInput = input; // Capturar o valor antes de limpar

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular delay de resposta
    setTimeout(() => {
      const companionResponse: Message = {
        id: messages.length + 2,
        text: getResponse(currentInput),
        sender: 'companion',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, companionResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Delay entre 1-3 segundos
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={sendMessage}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}