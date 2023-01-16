const express = require("express");
const NoteModel = require("../module/notes.model");
const noteRouter = express.Router();

noteRouter.use(express.json());

noteRouter.get("/", async (req, res) => {
  const { q } = req.query;
  // console.log(q)
  if (q) {
    const data = await NoteModel.find();
    let filterData = data.filter((i) => {
      if (i.title) {
        return i.title.toLowerCase().includes(q.toLowerCase());
      }
    });
    if (filterData.length>0) {
      res.send(filterData);
    } else {
      res.send("data not found");
    }
  } else {
    const data = await NoteModel.find();
    res.send(data);
  }
});

noteRouter.get("/:id",async(req,res)=>{
    const ID=req.params.id;
    console.log(ID);
    const data=await NoteModel.findById(ID)
    console.log(data)
    if(data){
        res.send(data)
    }else{
        res.send("Please enter a valid Details")
    }
})

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newNote = new NoteModel(payload);
    await newNote.save();
    res.send("created the notes");
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ "msg": err });
  }
});

noteRouter.patch("/update/:id", async(req, res) => {
  const payload = req.body;
  const Id=req.params.id;
  const note=await NoteModel.find({"_id":Id})
  const userId=note.userId
  console.log(userId)
  const userId_req=req.body.userId
  console.log(userId_req)
  try{
    if(userId!==userId_req){
      res.send({"msg":"you are not autherised"})
    }else{
      await NoteModel.findByIdAndUpdate({"_id":Id},payload)
  res.send(`updated the notes for id:${Id}`);
    }
  
  }catch(err){
    console.log('err :>> ', err);
    res.send(err)
  }
});


noteRouter.delete("/delete/:id", async(req, res) => {
  const Id=req.params.id;
try{
  const data=await NoteModel.findById(Id);
  if(data){
    await NoteModel.findByIdAndDelete(Id)
    res.send(`Data deleted successfully for id:${Id}`)
  }else{
    res.send("data is not found");
  }
}catch(err){
  console.log('err :>> ', err);
  res.send({"error" : err})
}
});

module.exports = noteRouter;
