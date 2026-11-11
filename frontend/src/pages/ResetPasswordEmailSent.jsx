import { Button, Code } from "@radix-ui/themes";
// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

function ResetPasswordEmailSent() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || "undefined email";
  // add 1.5min timer to resend email

  const [timer, setTimer] = useState(90); // Initial timer value in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);

  const [token, setToken] = useState(() => {
    const tokenString = localStorage.getItem(
      "sb-qhxjxhiaadtlcgklvofq-auth-token",
    );
    return JSON.parse(tokenString);
  });

  return (
    <div className="flex h-[100svh] w-full items-center justify-center bg-[#f7f8fa] font-noto font-medium">
      <div className="m-4 flex flex-col items-center justify-center gap-y-4 rounded-lg bg-white p-8 drop-shadow-lg">
        <div className="mb-4 rounded-sm border border-green-400 bg-green-200 px-3 py-1 text-center text-lg font-semibold text-green-900">
          Por favor, verifique seu e-mail
        </div>
        <div>E-mail de redefinição de senha enviado </div>
        <Code>{email}</Code>
        <div className="mt-4 text-sm">
          Basta clicar no link do e-mail e inserir uma nova senha.
          <br />
          Se não o encontrar, verifique sua caixa de spam.
        </div>

        <div className="mt-4 flex flex-col items-center text-sm">
          <span>Após redefinir a senha, prossiga para entrar.</span>
          <br />
          <Button
            color="iris"
            className="w-fit cursor-pointer select-none border-b border-white text-indigo-700 transition-all duration-200 hover:border-b hover:border-indigo-700"
            onClick={() => navigate("/login")}
          >
            Entrar
          </Button>
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

export default ResetPasswordEmailSent;
