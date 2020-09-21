import models from '../models' //pega o index.js automaticamente
import { model } from 'mongoose'


/* as funções de atualizar estoque não vão ser exportadas... vão ser somente locais */
async function aumentarStock(idproduto, quantidade){
    /* não foi especificado qual atributo do produto era para trazer
    eu imagino que stock é igual ao nome do campo na tabela produto que tembem e stock
    */
    let {stock} = await models.Produto.findOne({_id:idproduto})
    let nStock = parseInt(stock)+parseInt(quantidade)
    const reg=await models.Produto.findByIdAndUpdate({_id:idproduto},{stock:nStock})
}


async function diminuirStock(idproduto, quantidade){
    /* não foi especificado qual atributo do produto era para trazer
    eu imagino que stock é igual ao nome do campo na tabela produto que tembem e stock
    */
    let {stock} = await models.Produto.findOne({_id:idproduto})
    let nStock = parseInt(stock)-parseInt(quantidade)
    const reg=await models.Produto.findByIdAndUpdate({_id:idproduto},{stock:nStock})
}


export default{
    add: async(req,res,next)=>{
        try {
            const reg = await models.Venda.create(req.body)
            /* atualizar o estoque */
            let detalhes = req.body.detalhes
            detalhes.map(function(x){
                diminuirStock(x._id, x.quantidade)
            })
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    query:async(req,res,next)=>{
        try {
            const reg =await models.Venda.findOne({_id:req.query._id})
            .populate('usuario', {nome:1})
            .populate('pessoa',{nome:1})
            if(!reg){
                res.status(404).send({
                    message: 'O registro não existe'
                })
            } else {
                res.status(200).json(reg)
            }
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    list:async(req,res,next)=>{
        try {
            let valor = req.query.valor
            //const reg = await models.Venda.find({$or:[{'num_comprovante': new RegExp(valor, 'i')},{'serie_comprovante': new RegExp(valor, 'i')}]},{createdAt:0})
            const reg = await models.Venda.find({$or:[{'num_comprovante': new RegExp(valor, 'i')},{'serie_comprovante': new RegExp(valor, 'i')}]})
            .populate('usuario', {nome:1})
            .populate('pessoa',{nome:1})
            .sort({'createdAt':-1})
            //segundo parâmetro do find com zero não mostra o campo
            //se quizer que apareça só um campo 1
            //parameto i tomar em conta maíusculas e minúsculas
            //RegExp como se fosse um like sql
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },/*
    update:async(req,res,next)=>{
        try {
            const reg = await models.Venda.findByIdAndUpdate({_id:req.body._id}, {nome:req.body.nome,descricao:req.body.descricao})
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    remove:async(req,res,next)=>{
        try {
            const reg = await models.Venda.findByIdAndDelete({_id:req.body._id})
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },*/
    activate:async(req,res,next)=>{
        try {
            const reg = await models.Venda.findByIdAndUpdate({_id:req.body._id},{estado:1})
            /* atualizar o estoque */
            let detalhes = reg.detalhes
            detalhes.map(function(x){
                diminuirStock(x._id, x.quantidade)
            })
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    deactivate:async(req,res,next)=>{
        try {
            const reg = await models.Venda.findByIdAndUpdate({_id:req.body._id},{estado:0})
            /* atualizar o estoque */
            let detalhes = reg.detalhes
            detalhes.map(function(x){
                aumentarStock(x._id, x.quantidade)
            })
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    }
}