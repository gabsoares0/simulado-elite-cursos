import { useState, useEffect, FormEvent } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  BarChart3, 
  Trophy, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Users, 
  Zap,
  ArrowRight,
  ShieldCheck,
  Award,
  X,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center md:justify-start mt-6">
      {[
        { label: 'Dias', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Seg', value: timeLeft.seconds }
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="bg-white border border-yellow-500/30 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold text-yellow-600 shadow-md">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase tracking-widest mt-2 text-zinc-500 font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-yellow-600 transition-colors"
      >
        <span className="text-lg font-medium pr-8">{question}</span>
        {isOpen ? <ChevronUp className="shrink-0" /> : <ChevronDown className="shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const simuladoDate = new Date('2026-04-01T18:00:00');
  const [showSticky, setShowSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const GOOGLE_FORMS_URL = 'https://forms.gle/ANEsDFCnwro1gZcz8';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInscricao = () => {
    setIsModalOpen(true);
  };

  const confirmInscricao = () => {
    window.open(GOOGLE_FORMS_URL, '_blank');
    setIsModalOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-yellow-500 selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Trophy className="text-black w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase italic text-zinc-900">Elite <span className="text-yellow-600">Cursos</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('sobre')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">O Simulado</button>
            <button onClick={() => scrollToSection('como-funciona')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">Como Funciona</button>
            <button onClick={() => scrollToSection('beneficios')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">Benefícios</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">Dúvidas</button>
          </div>

          <button 
            onClick={handleInscricao}
            className="hidden md:block bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-md"
          >
            INSCREVER AGORA
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-zinc-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-yellow-500/30 text-yellow-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Zap size={14} /> 1º Simulado Preparatório
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-6 text-zinc-900">
              SE O ENEM FOSSE HOJE… <br />
              <span className="text-yellow-600 italic">QUAL SERIA SUA NOTA?</span>
            </h1>
            <p className="text-xl text-zinc-600 max-w-xl mb-8 leading-relaxed">
              Faça o simulado com correção TRI, ranking e análise por área e descubra seu nível real antes da prova.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-center">
                <Calendar className="text-yellow-600 mb-1 sm:mb-2" size={20} />
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold">Data</p>
                <p className="text-sm sm:text-base font-bold text-zinc-900">01/04/2026</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-center">
                <Clock className="text-yellow-600 mb-1 sm:mb-2" size={20} />
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold">Horário</p>
                <p className="text-sm sm:text-base font-bold text-zinc-900">18h às 22h</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-zinc-200 shadow-sm col-span-2 sm:col-span-1 flex flex-col justify-center">
                <Award className="text-yellow-600 mb-1 sm:mb-2" size={20} />
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold">Investimento</p>
                <p className="text-sm sm:text-base font-bold text-yellow-600">Menos que uma coxinha</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={handleInscricao}
                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-xl font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2"
              >
                FAZER MINHA INSCRIÇÃO <ArrowRight size={20} />
              </button>
              <div className="text-center sm:text-left">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Inscrições encerram em:</p>
                <CountdownTimer targetDate={simuladoDate} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative z-10 bg-white border border-zinc-200 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">1º</div>
                  <div>
                    <p className="font-bold text-zinc-900">Ranking Elite</p>
                    <p className="text-xs text-zinc-500">Simulado Nacional</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 uppercase font-bold">Média TRI</p>
                  <p className="text-2xl font-black text-yellow-600">845.6</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Você campeão!", score: "920+", color: "bg-yellow-500", highlight: true },
                  { name: "(Aguarde...)", score: "?", color: "bg-zinc-200" },
                  { name: "(Aguarde...)", score: "?", color: "bg-zinc-200" },
                  { name: "(Aguarde...)", score: "?", color: "bg-zinc-200" },
                ].map((user, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${user.highlight ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-zinc-50 border border-zinc-100'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 font-bold w-4">{i + 1}</span>
                      <span className={`font-medium ${user.highlight ? 'text-yellow-600' : 'text-zinc-700'}`}>{user.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: user.score === '?' ? '0%' : '100%' }}
                          transition={{ duration: 1.5, delay: 1 }}
                          className={`h-full ${user.color}`} 
                        />
                      </div>
                      <span className="font-bold w-10 text-right text-zinc-900">{user.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <BarChart3 className="text-yellow-600" size={20} />
                </div>
                <p className="text-sm text-zinc-600">
                  <span className="text-zinc-900 font-bold">Análise Detalhada:</span> Identifique seus pontos fracos por competência.
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-zinc-900">O QUE É O SIMULADO?</h2>
            <div className="w-20 h-1.5 bg-yellow-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200 hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                <FileText className="text-yellow-600 group-hover:text-black" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">Estrutura Completa</h3>
              <p className="text-zinc-600 leading-relaxed">
                60 questões inéditas e selecionadas, sendo 15 por área do conhecimento, cobrindo os temas que mais caem no ENEM.
              </p>
            </div>

            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200 hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                <Target className="text-yellow-600 group-hover:text-black" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">Correção TRI</h3>
              <p className="text-zinc-600 leading-relaxed">
                Algoritmo de correção baseado na Teoria de Resposta ao Item. Não é apenas acertar questões, é acertar com estratégia.
              </p>
            </div>

            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200 hover:border-yellow-500/50 transition-all group shadow-sm">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                <Award className="text-yellow-600 group-hover:text-black" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">Modelo ENEM</h3>
              <p className="text-zinc-600 leading-relaxed">
                Prova inspirada fielmente no modelo oficial, incluindo 1 proposta de redação para testar sua escrita e tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="como-funciona" className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-zinc-900">COMO FUNCIONA?</h2>
            <p className="text-zinc-500 uppercase tracking-widest font-bold text-sm">Passo a passo simples e direto</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 -translate-y-1/2 z-0" />
            
            {[
              { step: "01", title: "Receba a Prova", desc: "Você receberá o caderno de questões em PDF diretamente no seu e-mail e WhatsApp." },
              { step: "02", title: "Resolva no Horário", desc: "Realize a prova entre 18h e 22h para simular a pressão real do dia do exame." },
              { step: "03", title: "Envie o Gabarito", desc: "Ao finalizar, preencha o formulário oficial de respostas para processamento da nota." },
              { step: "04", title: "Receba o Resultado", desc: "Receba sua nota TRI, desempenho por área e posição no ranking geral." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white border-4 border-zinc-100 rounded-full flex items-center justify-center text-yellow-600 font-black text-xl mb-6 shadow-md">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-3 text-zinc-900">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none text-zinc-900">
                ENTREGÁVEIS E <br />
                <span className="text-yellow-600 italic">BENEFÍCIOS EXCLUSIVOS</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-yellow-500/20 p-1 rounded">
                    <CheckCircle2 className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-zinc-900">Diagnóstico de Elite (TRI)</h4>
                    <ul className="text-zinc-600 space-y-2 text-sm">
                      <li>• Nota real calculada pela Teoria de Resposta ao Item</li>
                      <li>• Relatório detalhado de desempenho por competência</li>
                      <li>• Posição no Ranking Nacional para medir sua concorrência</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-yellow-500/20 p-1 rounded">
                    <Award className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-zinc-900">Recompensa aos Melhores</h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      Mostre que você está preparado. Os 10 alunos com as maiores notas garantem a correção profissional da redação sem custo adicional.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-yellow-500/20 p-1 rounded">
                    <Zap className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-zinc-900">Desbloqueio de Conteúdo</h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      Juntos somos mais fortes. Se atingirmos 100+ participantes, liberaremos as resoluções comentadas em vídeo para todos os inscritos.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-yellow-500/10 transition-colors" />
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="text-yellow-600" />
                    <h4 className="font-bold text-yellow-600 uppercase tracking-wider">Bônus de Indicação (2x1)</h4>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    Não estude sozinho! <span className="text-zinc-900 font-bold">Convide um amigo</span> para o simulado e <span className="text-yellow-600 font-bold underline decoration-2 underline-offset-4">ambos ganham a correção profissional da redação</span>. É a sua chance de ouro para turbinar seus textos juntos!
                  </p>
                </div>

                <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="text-zinc-400" />
                    <h4 className="font-bold text-zinc-400 uppercase tracking-wider">Alunos da Mentoria</h4>
                  </div>
                  <p className="text-sm text-zinc-500">
                    Correção de redação já garantida para todos os alunos ativos, além de acompanhamento pedagógico completo.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 aspect-square flex flex-col justify-center items-center text-center shadow-sm">
                  <BarChart3 className="text-yellow-600 mb-4" size={40} />
                  <p className="font-bold text-zinc-900">Análise de Pontos Fracos</p>
                </div>
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 aspect-square flex flex-col justify-center items-center text-center shadow-sm">
                  <Zap className="text-yellow-600 mb-4" size={40} />
                  <p className="font-bold text-zinc-900">Estratégia de Prova</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 aspect-square flex flex-col justify-center items-center text-center shadow-sm">
                  <Users className="text-yellow-600 mb-4" size={40} />
                  <p className="font-bold text-zinc-900">Comparativo Nacional</p>
                </div>
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 aspect-square flex flex-col justify-center items-center text-center shadow-sm">
                  <Clock className="text-yellow-600 mb-4" size={40} />
                  <p className="font-bold text-zinc-900">Controle de Tempo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-24 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-zinc-900">
              UMA EQUIPE INTEIRA TRABALHANDO <br className="hidden md:block" />
              <span className="text-yellow-600 italic">PELA SUA APROVAÇÃO</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              Esses são apenas alguns dos especialistas que fazem parte da Elite Cursos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Prof. Thiago Card */}
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 shrink-0 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                <GraduationCap className="text-yellow-600 w-10 h-10" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl font-black text-zinc-900 mb-1">Prof. Thiago</h3>
                <p className="text-zinc-500 font-medium mb-4 text-sm">Metodologia reconhecida por universidades</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl shadow-sm">
                  <span className="font-black text-yellow-600 text-xl">+1.000</span>
                  <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider leading-tight text-left">
                    Alunos<br/>Aprovados
                  </span>
                </div>
              </div>
            </div>

            {/* Prof. Greicyane Card */}
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 shrink-0 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                <BookOpen className="text-yellow-600 w-10 h-10" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl font-black text-zinc-900 mb-1">Profª. Greicyane</h3>
                <p className="text-zinc-500 font-medium mb-4 text-sm">Acertou o tema da redação do ENEM</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl shadow-sm">
                  <span className="font-black text-yellow-600 text-xl">900+</span>
                  <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider leading-tight text-left">
                    Notas<br/>na Redação
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Participate Section */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-zinc-900">POR QUE PARTICIPAR?</h2>
            <p className="text-zinc-500 uppercase tracking-widest font-bold text-sm">O diferencial entre quem passa e quem fica</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Descubra seu Nível Real", desc: "Saiba exatamente onde você está na escala TRI e pare de chutar sua nota." },
              { title: "Identifique Pontos Fracos", desc: "Descubra quais conteúdos estão derrubando sua média e foque no que importa." },
              { title: "Treine Estratégia", desc: "Aprenda a selecionar questões fáceis primeiro para valorizar sua nota TRI." },
              { title: "Simule a Pressão", desc: "Treine seu psicológico para o cansaço e a ansiedade do dia oficial." },
              { title: "Ranking de Elite", desc: "Compare seu desempenho com outros estudantes de alto nível." },
              { title: "Análise de Tempo", desc: "Descubra se você está gastando tempo demais em questões que não deveria." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-zinc-200 flex flex-col gap-4 shadow-sm">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{item.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-yellow-500 text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
            NÃO DEIXE PARA DESCOBRIR <br />
            SUA NOTA NO DIA DO ENEM.
          </h2>
          <p className="text-xl font-medium mb-10 opacity-80">
            Inscrições abertas apenas até 01/04. Garanta sua vaga no simulado mais completo da Mentoria Elite.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={handleInscricao}
              className="bg-black text-white px-12 py-6 rounded-2xl font-black text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3"
            >
              QUERO ME INSCREVER <ArrowRight />
            </button>
            <div className="flex flex-col items-center">
              <p className="text-sm opacity-70 font-medium italic mb-1">Investimento simbólico para o seu futuro</p>
              <p className="font-black text-2xl tracking-tight">Apenas R$ 9,90</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="inscricao" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-zinc-50 border border-zinc-200 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500" />
            
            <div className="mb-10">
              <h2 className="text-3xl font-black tracking-tighter mb-4 text-zinc-900">GARANTA SUA VAGA AGORA</h2>
              <div className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
                <p className="text-yellow-600 font-bold text-sm flex items-center gap-2">
                  <Zap size={14} /> Investimento Único: R$ 9,90
                </p>
              </div>
              <p className="text-zinc-600 mb-8">
                Clique no botão abaixo para ser redirecionado ao formulário oficial de inscrição e garantir sua participação no simulado.
              </p>
              
              <button 
                onClick={handleInscricao}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-3"
              >
                IR PARA O FORMULÁRIO <Send size={20} />
              </button>
            </div>
            
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
              Inscrição rápida e segura via Google Forms.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-zinc-900">DÚVIDAS FREQUENTES</h2>
            <p className="text-zinc-500">Tudo o que você precisa saber sobre o simulado.</p>
          </div>

          <div className="space-y-2">
            <FAQItem 
              question="O simulado é online ou presencial?" 
              answer="O simulado é 100% online. Você receberá o caderno de questões em PDF e preencherá o gabarito via formulário digital." 
            />
            <FAQItem 
              question="Preciso realizar obrigatoriamente no horário das 18h às 22h?" 
              answer="Para que sua nota seja contabilizada no ranking oficial e processada pela TRI, sim. O objetivo é simular a experiência real do ENEM, incluindo o controle de tempo e pressão." 
            />
            <FAQItem 
              question="Como funciona a correção da redação?" 
              answer="A correção da redação é garantida para todos os alunos da Mentoria Elite. Para o público externo, os 10 melhores colocados no ranking geral ganharão a correção profissional inclusa." 
            />
            <FAQItem 
              question="Quem pode participar do simulado?" 
              answer="O simulado é aberto a todos os estudantes que estão se preparando para o ENEM ou vestibulares, sejam eles alunos da mentoria ou público externo." 
            />
            <FAQItem 
              question="Como receberei a prova e o resultado?" 
              answer="A prova será enviada via e-mail e WhatsApp no dia do simulado. O resultado detalhado será enviado em até 48h após o encerramento do prazo de envio dos gabaritos." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <Trophy className="text-black w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tighter uppercase italic text-zinc-900">Elite <span className="text-yellow-600">Cursos</span></span>
          </div>
          
          <p className="text-zinc-500 text-sm">
            © 2026 Mentoria Elite Cursos. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            {['Instagram', 'YouTube', 'WhatsApp'].map(social => (
              <a key={social} href="#" className="text-zinc-400 hover:text-yellow-600 text-sm font-bold transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-50 px-6 py-4 bg-white/90 backdrop-blur-xl border-t border-zinc-200 md:hidden lg:flex lg:justify-center"
          >
            <div className="max-w-7xl w-full flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">1º Simulado Elite</p>
                <p className="font-black text-yellow-600">Apenas R$ 9,90</p>
              </div>

              <div className="hidden xl:flex items-center gap-8">
                <button onClick={() => scrollToSection('sobre')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">O Simulado</button>
                <button onClick={() => scrollToSection('como-funciona')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">Como Funciona</button>
                <button onClick={() => scrollToSection('beneficios')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">Benefícios</button>
                <button onClick={() => scrollToSection('faq')} className="text-sm font-bold text-zinc-600 hover:text-yellow-600 transition-colors">Dúvidas</button>
              </div>

              <div className="flex-1 sm:flex-none">
                <button 
                  onClick={handleInscricao}
                  className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                >
                  FAZER MINHA INSCRIÇÃO <ArrowRight size={16} />
                </button>
              </div>
              <div className="text-right hidden lg:block">
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Inscrições até 01/04</p>
                <p className="font-bold text-zinc-900">Vagas Limitadas</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Inscrição */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                <h3 className="text-xl font-black text-zinc-900 tracking-tight">Resumo da Inscrição</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-yellow-600" size={20} />
                    <span className="font-bold text-zinc-700">Data</span>
                  </div>
                  <span className="font-bold text-zinc-900">01/04/2026</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <Clock className="text-yellow-600" size={20} />
                    <span className="font-bold text-zinc-700">Horário</span>
                  </div>
                  <span className="font-bold text-zinc-900">18h às 22h</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <FileText className="text-yellow-600" size={20} />
                    <span className="font-bold text-zinc-700">Formato</span>
                  </div>
                  <span className="font-bold text-zinc-900">100% Online</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                  <div className="flex items-center gap-3">
                    <Zap className="text-yellow-600" size={20} />
                    <span className="font-bold text-yellow-700">Investimento</span>
                  </div>
                  <span className="font-black text-yellow-600 text-lg">R$ 9,90</span>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <button
                  onClick={confirmInscricao}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
                >
                  IR PARA O FORMULÁRIO <Send size={20} />
                </button>
                <p className="text-center text-xs text-zinc-500 mt-4 font-medium">
                  Você será redirecionado para o formulário oficial.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
