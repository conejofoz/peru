import mongoose,{Schema} from 'mongoose'
const vendaShema = new Schema({
    usuario:{type: Schema.ObjectId, ref: 'usuario', required:true},
    pessoa:{type: Schema.ObjectId, ref: 'pessoa', required:true},
    tipo_comprovante:{type:String, maxlength:20, required:true},
    serie_comprovante:{type:String, maxlength:7},
    num_comprovante:{type:String, maxlength:10, required:true},
    imposto:{type:Number, required:true},
    total:{type:Number, required:true},
    detalhes:[{
        _id:{
            type:String,
            required:true
        },
        produto:{
            type:String,
            required:true
        },
        quantidade:{
            type:Number,
            required:true
        },
        preco:{
            type:Number,
            required:true
        },
        desconto:{
            type:Number,
            required:true
        }
    }],
    estado:{type:Number, default:1},
    createdAt:{type:Date, default: Date.now}
})

const Venda = mongoose.model('venda', vendaShema)
export default Venda