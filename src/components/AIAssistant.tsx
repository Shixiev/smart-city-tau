import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { messages: [...messages, { role: 'user', content: userMessage }] }
      });

      if (error) throw error;

      if (data?.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      console.error('AI chat error:', error);
      toast({
        title: t.ai.error || 'Қате',
        description: error instanceof Error ? error.message : 'AI-мен байланыс орнату мүмкін болмады',
        variant: 'destructive',
      });
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: 'Кешіріңіз, қазір жауап бере алмаймын. Кейінірек қайталап көріңіз.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-110 bg-gradient-to-br from-primary to-eco z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-card rounded-2xl shadow-elegant border border-border flex flex-col z-50 animate-scale-in">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/10 to-eco/10 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-eco flex items-center justify-center animate-pulse-glow">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">{t.ai.title}</h3>
            <p className="text-xs text-muted-foreground">{t.ai.subtitle}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">{t.ai.greeting}</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.ai.placeholder}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            disabled={isLoading}
            className="rounded-full bg-gradient-to-br from-primary to-eco"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
