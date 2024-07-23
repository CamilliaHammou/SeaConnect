import Assembly from "../models/assembly.js";

const createAssembly =  async (req, res) => {
  const { title, description, date, type, quorumRequired } = req.body;

  if (!title || !description || !date || !type || !quorumRequired) {
    return res.status(400).json({ message: "fields are missing" });
  }

  try {
    const assembly = await Assembly.createAssembly({
      title,
      description,
      date,
      type: type.toUpperCase(),
      quorumRequired,
      status: 'PLANNED',
      minutes: ''
    });

    res.status(201).json({ message: "Assembly created successfully", success: true, data: assembly });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getAllAssemblies =  async (req, res) => {

  const user = req.user

  try {
    const assemblies = await Assembly.getAllAssemblies(user)
    res.status(200).json({ message: "Assemblies retrieved successfully", success: true, data: assemblies });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Assemblies", success: false, error: error.message });
  }
}

const updateAssembly = async (req, res) => {
  const assemblyId= req.params.id;

  const data = {};

  if (req.body.title) data.title = req.body.title;
  if (req.body.description) data.description = req.body.description;
  if (req.body.date) data.date = req.body.date;
  if (req.body.type) data.type = req.body.type.toUpperCase();
  if (req.body.quorumRequired) data.quorumRequired = req.body.quorumRequired;
  if (req.body.status) data.status = req.body.status.toUpperCase();
  if (req.body.minutes) data.minutes = req.body.minutes;

  try {
    const assembly = await Assembly.updateAssembly(assemblyId, data);
    res.status(200).json({ message: "Assembly updated successfully", success: true, data: assembly });
  } catch (error) {
    res.status(500).json({ message: "Error updating Assembly", success: false, error: error.message });
  }
}

const recordVote = async (req, res) => {
  const assemblyId= req.params.id;
  const userEmail = req.user.email
  const { voteType } = req.body;

  if (!voteType) return res.status(400).json({ message: "Vote Type is required", success: false });

  try {
    const assembly = await Assembly.recordVote(assemblyId, userEmail, voteType);
    res.status(200).json({ message: "Vote Casted Successfully", success: true, data: assembly });
  } catch (error) {
    res.status(500).json({ message: "Error casting vote", success: false, error: error.message });
  }
}

const voteResult = async (req, res) => {
  const assemblyId= req.params.id;

  try {
    const result = await Assembly.voteResult(assemblyId);
    res.status(200).json({ message: "Vote Result", success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: "Error getting vote result", success: false, error: error.message });
  }

}


export { createAssembly, getAllAssemblies, updateAssembly, recordVote, voteResult };
