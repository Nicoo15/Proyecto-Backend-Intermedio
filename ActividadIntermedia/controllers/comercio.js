//controllers
//const { matchedData } = require("express-validator");
const { comerModel } = require("../models");

const getItems = async (req, res) => {
    try{
        const user = req.user //Obtengo trazabilidad del usuario, puedo ver qué solicita, su rol, etc.
        var data
        //(process.env.ENGINE_DB === "nosql") ? data = await tracksModel.find() : data = await tracksModel.findAll()
        data = await comerModel.find({}); // findAllData(): custom static function
        res.send({data, user})
    }catch(err){
        console.log(err) //Opcional
        //handleHttpError(res, 'ERROR_GET_ITEMS', 404)
        //handleHttpError(res, 'ERROR_GET_ITEMS') //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
    }
}
const getItem = async (req, res) => {
    try {
      const cif = req.params.cif;
      const data = await comerModel.findOne({ cif: cif });
  
      res.send(data);
    } catch (err) {}
  };
  
  const createItem = async (req, res) => {
    try {
      const body = matchedData(req); //El dato filtrado por el modelo (probar con body=req)
  
      const data = await comerModel.create(body);
      res.send(data);
    } catch (err) {
      console.log(err);
      //handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
  };

  module.exports = { getItems, getItem, createItem };