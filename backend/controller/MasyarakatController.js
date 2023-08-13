import Masyarakat from "../models/MasyarakatModel.js";

class MasyarakatController  {
    async index (req,res) {
        const data = await Masyarakat.findAll();
        return res.json(data);
    }

    
}

export default MasyarakatController; 

