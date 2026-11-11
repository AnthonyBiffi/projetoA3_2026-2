import CureitLogo from "../assets/CureitLogo";
import CureitLogoWhite from "../assets/CureitLogoWhite.png";

function BookingProcessGuide() {
  return (
    <div className="animate-fade-up">
      <div className="my-2 flex w-full justify-center">
        <img src={CureitLogoWhite} alt="" className="h-12 md:h-16 w-auto" />
      </div>
      <div className="mb-4 flex select-none justify-center text-center font-noto text-base font-semibold md:text-lg">
        Bem-vindo(a) ao Agendamento de Consultas CureIt
      </div>

      <div className="flex flex-col gap-y-4 font-noto">
        <p>
          No CureIt, tornamos o agendamento de consultas simples, rápido e sem complicações!
        </p>
        <ol className="ml-4 flex list-inside list-decimal flex-col gap-y-1">
          <li>
            <b>Preencha Seus Dados</b> - Forneça suas informações básicas para nos ajudar a atendê-lo(a) melhor.
          </li>
          <li>
            <b>Escolha um Horário</b> - Selecione uma data e horário convenientes entre as opções disponíveis.
          </li>
          <li>
            <b>Revise e Confirme</b> - Confira seus dados e confirme seu agendamento.
          </li>
        </ol>
        <p className=" ">
          Nosso objetivo é garantir uma experiência tranquila e minimizar seu tempo de espera.
          Você está a poucos passos de agendar sua consulta. <br />{" "}
          Clique em <b>Próximo</b> para começar e inserir seus dados pessoais.
        </p>
      </div>
    </div>
  );
}

export default BookingProcessGuide;
