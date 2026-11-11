import { useNavigate } from "react-router-dom";
import Container1 from "./Container1";
import Card1 from "./FeatureCard";

export default function Features() {
  const navigate = useNavigate();
  return (
    <div className="my-12 w-full animate-fade-up md:px-5 lg:px-10">
      <div className="mt- mb-5 pl-5 text-left text-2xl font-semibold text-[#131b20] md:text-3xl">
        Otimizando o Gerenciamento de Filas Hospitalares com IA
      </div>
      <div className="pl-5 text-left text-sm md:text-base">
        Quatro Passos Simples para Otimizar o Gerenciamento de Filas Hospitalares
      </div>
      {/* <div className="features flex w-full flex-col items-center justify-center border-2 text-left sm:mx-5 sm:max-h-fit sm:flex-col md:mx-10 md:flex-row md:space-x-10 lg:mx-20 lg:space-x-10 xl:space-x-20"> */}
      <div className="features flex w-full flex-col justify-center px-5 md:flex-row md:justify-center">
        <div className="flex flex-col items-center justify-between gap-x-5 gap-y-5 py-5 lg:flex-row">
          <div className="cards left flex h-full w-full flex-col justify-between gap-y-5 lg:w-auto">
            <Card1
              title="ChatBot com Inteligência Artificial"
              text="Um chatbot com IA baseado em Geração Aumentada por Recuperação (RAG) para auxiliar usuários com dúvidas. Fornece orientações médicas baseadas em modelos pré-treinados e fontes verificadas."
              link="/featureAIChatbot"
              // onClick={() => navigate("/featureAIChatbot")}
              linkName="Saiba Mais"
            />
            <Card1
              title="AI-Powered Doctor Recommendation"
              text="Our ML-driven system analyzes symptoms and connects you with the best doctors for accurate & personalized care."
              link="/featureAIRecommendation"
              linkName="Saiba Mais"
            />
            <Card1
              title="Sistema de Feedback com IA"
              text="Analisa avaliações de pacientes e gera tags informativas para médicos, ajudando os usuários a identificar rapidamente a especialidade e a satisfação dos pacientes para escolhas mais informadas."
              link="/featureAIFeedback"
              linkName="Saiba Mais"
            />
            <Card1
              title="Agendamento Automático de Consultas"
              text="Implemente sistemas de agendamento automatizado para reduzir o tempo de espera dos pacientes e melhorar a eficiência do fluxo de filas."
              // link="https://www.google.com"
              // linkName="Our Input Guidelines and Methodology"
            />
          </div>
          <Container1 />
        </div>
        <div className="right flex flex-col items-center justify-center"></div>
      </div>
    </div>
  );
}
