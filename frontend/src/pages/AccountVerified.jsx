import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button, Code } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function AccountVerified() {
  const navigate = useNavigate();
  return (
    <div className="flex h-[100svh] w-full items-center justify-center bg-[#f7f8fa] font-noto font-medium">
      <div className="m-4 flex flex-col items-center justify-center gap-y-4 rounded-lg bg-white p-8 drop-shadow-lg">
        <div className="mb-4 flex items-center gap-x-2 rounded-sm border border-green-400 bg-green-200 px-3 py-1 text-center text-lg font-semibold text-green-900">
          <div>
            <CheckCircledIcon width={20} height={20} />
          </div>
          <p>Verificação de conta realizada com sucesso</p>
        </div>
        <div>Sua conta foi verificada com sucesso</div>

        <div className="flex flex-col items-center text-sm">
          <div>Por favor, prossiga para entrar</div>
          <div className="my-1">
            <Button color="iris" onClick={() => navigate("/login")}>
              Entrar
            </Button>
          </div>
        </div>

        <div className="flex gap-x-1 text-sm">
          <div>Precisa de ajuda?</div>
          <div
            className="cursor-pointer text-indigo-800 underline"
            onClick={() => console.log("Fale Conosco")}
          >
            Fale Conosco
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountVerified;
