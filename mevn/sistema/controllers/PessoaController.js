import models from '../models' //pega o index.js automaticamente
import { model } from 'mongoose'

export default{
    add: async(req,res,next)=>{
        try {
            const reg = await models.Pessoa.create(req.body)
            res.status(200).json(reg) //retorna um objeto ao cadastrar
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    query:async(req,res,next)=>{
        try {
            const reg = await models.Pessoa.findOne({_id:req.query._id})
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
            const reg = await models.Pessoa.find({$or:[{'nome': new RegExp(valor, 'i')},{'email': new RegExp(valor, 'i')}]},{createdAt:0})
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
    listClientes:async(req,res,next)=>{
        try {
            let valor = req.query.valor
            const reg = await models.Pessoa.find({$or:[{'nome': new RegExp(valor, 'i')},{'email': new RegExp(valor, 'i')}], 'tipo_pessoa': 'Cliente'},{createdAt:0})
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
    listFornecedores:async(req,res,next)=>{
        try {
            let valor = req.query.valor
            const reg = await models.Pessoa.find({$or:[{'nome': new RegExp(valor, 'i')},{'email': new RegExp(valor, 'i')}], 'tipo_pessoa': 'Fornecedor'},{createdAt:0})
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
            const reg = await models.Pessoa.findByIdAndUpdate({_id:req.body._id}, {
                tipo_pessoa:req.body.tipo_pessoa, 
                nome:req.body.nome, 
                tipo_documento:req.body.tipo_documento,
                num_documento:req.body.num_documento,
                endereco:req.body.endereco,
                telefone:req.body.telefone,
                email:req.body.email
            })
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
            const reg = await models.Pessoa.findByIdAndDelete({_id:req.body._id})
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
            const reg = await models.Pessoa.findByIdAndUpdate({_id:req.body._id},{estado:1})
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
            const reg = await models.Pessoa.findByIdAndUpdate({_id:req.body._id},{estado:0})
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
}