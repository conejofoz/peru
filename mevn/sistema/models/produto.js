import mongoose, {Schema} from 'mongoose'
const produtoShema = new Schema({
    categoria:{type:Schema.ObjectId, ref:'categoria'},
    codigo:{type:String, maxlength:64},
    nome:{type:String, maxlength:50, unique:true, required:true},
    descricao:{type:String, maxlength:255},
    preco_venda:{type:Number, required:true},
    stock:{type:Number, required:true},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
})

const Produto = mongoose.model('produto', produtoShema)

export default Produto