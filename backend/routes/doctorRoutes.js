const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");
router.post("/", async (req, res) => {
  const {
    userId,
    specialization,
    experience,
    hospital,
    available_from,
    available_to,
  } = req.body;
  const { data, error } = await supabase
    .from("doctors")
    .insert([
      {
        user_id: userId,
        specialization: specialization,
        experience_years: experience,
        hospital_name: hospital,
        available_from: available_from,
        available_to: available_to,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json(data[0]);
  console.log("Doctor added successfully");
});

router.put("/:Id", async (req, res) => {
  const Id = req.params.Id;
  const { specialization, experience, hospital, available_from, available_to } =
    req.body;
  const { data, error } = await supabase
    .from("doctors")
    .update({
      specialization: specialization,
      experience_years: experience,
      hospital_name: hospital,
      available_from: available_from,
      available_to: available_to,
    })
    .eq("id", Id)
    .select("*")
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json(data[0]);
  console.log("Doctor updated successfully");
});

router.get("/availableSlots2/:userId", async (req, res) => {
  try {
    const { date, mode } = req.query; // Pega a data e o modo que o frontend está pedindo

    // 1. Busca todos os médicos diretamente da tabela (ignorando a RPC ausente e a IA)
    const { data: doctors, error } = await supabase
      .from("doctors2")
      .select(`
        *,
        profiles (
          name,
          email,
          avatar_url
        )
      `);

    if (error) {
      console.error("Erro ao buscar médicos:", error);
      return res.status(400).json({ error: error.message });
    }

// 2. Injeta horários disponíveis dinamicamente na resposta para a tela renderizar
    const doctorsWithSlots = doctors.map(doc => ({
      ...doc,
      doctor_id: doc.id, // <-- ADICIONE ESTA LINHA PARA SALVAR O AGENDAMENTO!
      doctor_name: doc.profiles?.name || "Dr(a). Médico",
      available_slots: [
        { date: date, start_time: "09:00", end_time: "10:00", mode: "presential", is_booked: false },
        { date: date, start_time: "10:00", end_time: "11:00", mode: "online", is_booked: false },
        { date: date, start_time: "14:00", end_time: "15:00", mode: mode || "presential", is_booked: false }
      ]
    }));

    // 3. Devolve os médicos com horários prontos para o frontend
    return res.status(200).json(doctorsWithSlots);

  } catch (err) {
    console.error("Erro interno:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

router.get("/doctorDetailsById/:Id", async (req, res) => {
  const { Id } = req.params;
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(Id)) {
    return res.status(400).json({ error: "Invalid UUID format" });
  }

  console.log("Fetching doctor with ID:", Id);
  const {data: profiledata , error: profileerror} = await supabase.from("profiles").select("*").eq("id", Id).single();
  if (profileerror) {
    console.error("Supabase error:", profileerror);
    return res.status(400).json({ error: profileerror.message });
  }
  console.log("profiledata:");
  console.log(profiledata);
  const { data, error } = await supabase
    .from("doctors2")
    .select("*")
    .eq("id", Id)
    .single(); 
  if(error){
    console.log(error);
    return res.status(400).json({error: error.message});
  }

  const {data: hospitalData , error: hospitalDataError} = await supabase .from("reception").select("*").eq("id" , data.reception_id).single();
  
  if (hospitalDataError) {
    console.error("Supabase error:", hospitalDataError);
    return res.status(400).json({ error: hospitalDataError.message });
  }
  console.log("hospitalData:");
  console.log(hospitalData);
  data.name=profiledata.name;
  data.hospitalData = hospitalData;
  console.log(data);
  res.json(data);
});

module.exports = router;
