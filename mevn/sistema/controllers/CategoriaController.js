import models from '../models' //pega o index.js automaticamente
import { model } from 'mongoose'

export default{
    add: async(req,res,next)=>{
        try {
            const reg = await models.Categoria.create(req.body)
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
            const reg =await models.Categoria.findOne({_id:req.query._id})
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
            const reg = await models.Categoria.find({$or:[{'nome': new RegExp(valor, 'i')},{'descricao': new RegExp(valor, 'i')}]},{createdAt:0})
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
    },
    update:async(req,res,next)=>{
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {nome:req.body.nome,descricao:req.body.descricao})
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
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id})
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    activate:async(req,res,next)=>{
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:1})
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
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:0})
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    }
}