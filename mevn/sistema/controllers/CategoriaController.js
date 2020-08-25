import models from '../models' //pega o index.js automaticamente
import { model } from 'mongoose'

export default{
    add: async(req,res,next)=>{
        try {
            const reg = await models.Categoria.create(req.body)
            req.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    query:async(req,res,next)=>{
        try {
            const reg = models.Categoria.findOne({_id:req.query._id})
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
            const reg = await models.Categoria.find({})
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
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body}, {nome:req.body.nome,descricao:req.body.descricao})
            req.status(200).json(reg)
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
            req.status(200).json(reg)
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
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    }
}