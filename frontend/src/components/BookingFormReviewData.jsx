import { Badge, Code, DataList, Flex } from "@radix-ui/themes";

function BookingFormReviewData({
  data,
  bookingSuccessful,
  setBookingSuccessful,
}) {
  const formData = data;
  const selectedDoctor = formData?.selectedDoctor;
  
  return (
    <div>
      <div className="mb-4 flex select-none justify-center text-center font-noto text-base font-semibold md:text-lg">
        {bookingSuccessful ? (
          <p className="rounded-sm border border-green-400 bg-green-200 p-2 py-1 text-green-800">
            Consulta agendada com sucesso!
          </p>
        ) : (
          <p className="p-2 py-1">Revise os detalhes do agendamento</p>
        )}
      </div>
      <div className="flex flex-col justify-between gap-y-10 rounded-md border-2 px-4 py-2 font-noto">
        <DataList.Root
          orientation={"horizontal"}
          style={{ gap: ".8rem" }}
          size={{
            initial: "1",
            md: "2",
          }}
        >
          <DataList.Item>
            <DataList.Label minWidth="88px">Nome do Paciente</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{formData.fullName}</Code>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Endereço</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{formData.address}</Code>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Problema de Saúde</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost" color="gray">
                  {formData.healthIssue}
                </Code>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Idade</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{formData.age}</Code>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Gênero</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{formData.gender}</Code>
              </Flex>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <div>
          <div className="mb-2 font-noto font-semibold">Médico Selecionado:</div>
          <div className="flex justify-between gap-y-1 rounded-md bg-[#f0f0f3] px-4 py-2 font-noto">
            <DataList.Root
              orientation={"horizontal"}
              style={{ gap: ".65rem" }}
              size={{
                initial: "1",
                md: "2",
              }}
            >
              <DataList.Item>
                <DataList.Label minWidth="88px">Nome</DataList.Label>
                <DataList.Value>
                  <Code variant="ghost">{selectedDoctor?.doctor_name}</Code>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align="center">
                <DataList.Label minWidth="88px">Especialização</DataList.Label>
                <DataList.Value>
                  <Badge color="jade" variant="soft" radius="full">
                    {selectedDoctor?.specialization}
                  </Badge>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Hospital</DataList.Label>
                <DataList.Value>
                  <Code variant="ghost">{selectedDoctor?.hospital_name}</Code>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Modalidade</DataList.Label>
                <DataList.Value>
                  <Code variant="ghost">{selectedDoctor?.mode}</Code>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Horário Disponível</DataList.Label>
                <DataList.Value>
                  <Code variant="ghost">{selectedDoctor?.selectedSlot?.start_time} - {selectedDoctor?.selectedSlot?.end_time}</Code>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Data Disponível</DataList.Label>
                <DataList.Value>
                  <Code variant="ghost">{formData?.selectedDate}</Code>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingFormReviewData;
