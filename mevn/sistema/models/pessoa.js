import mongoose, {Schema} from 'mongoose'

const pessoaSchema = new Schema({
    //rol: {type:String, maxlength:30, unique:true},
    tipo_pessoa: {type:String, maxlength:20, unique:true},
    nome: {type:String, maxlength:50, required:true},
    tipo_documento: {type:String, maxlength:20},
    num_documento: {type:String, maxlength:20},
    endereco:{type:String, maxlength:70},
    telefone:{type:String, maxlength:20},
    email:{type:String, maxlength:50, unique:true},
    //password:{type:String, maxlength:64, required:true},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default: Date.now }
})

const Pessoa = mongoose.model('pessoa', pessoaSchema)
export default Pessoa
