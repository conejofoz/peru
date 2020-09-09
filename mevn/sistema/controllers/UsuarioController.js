import models from '../models' //pega o index.js automaticamente
import { model } from 'mongoose'
import bcrypt from 'bcryptjs' //npm install bcryptjs --save
import token from '../services/token'

export default{
    add: async(req,res,next)=>{
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const reg = await models.Usuario.create(req.body)
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
            const reg = await models.Usuario.findOne({_id:req.query._id})
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
            const reg = await models.Usuario.find({$or:[{'nome': new RegExp(valor, 'i')},{'email': new RegExp(valor, 'i')}]},{createdAt:0})
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

            /* altera a senha somente se for diferente da senha cadastrada */
            let novaSenha = req.body.password
            const usuarioCadastrado = await models.Usuario.findOne({_id:req.body._id})
            if(novaSenha!=usuarioCadastrado.password){
                req.body.password = await bcrypt.hash(req.body.password, 10)
            }

            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id}, {
                rol:req.body.rol, 
                nome:req.body.nome, 
                tipo_documento:req.body.tipo_documento,
                num_documento:req.body.num_documento,
                endereco:req.body.endereco,
                telefone:req.body.telefone,
                email:req.body.email,
                password:req.body.password
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
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id})
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1})
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0})
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message:'Ocorreu um erro'
            })
            next(error)
        }
    },
    login: async (req, res, next)=>{
        try {
            /* verificar se o email existe */
            let user = await models.Usuario.findOne({email:req.body.email, estado:1})
            if(user){
                /* Existe um usuário com este email */
                let match = await bcrypt.compare(req.body.password, user.password)
                if(match){
                    //res.json('Password correto!')
                    let tokenReturn = await token.encode(user._id)
                    res.status(200).json({user, tokenReturn})
                } else {
                    res.status(404).send({message: 'Senha errada!'}) 
                 }
            } else {
               res.status(404).send({message: 'Não existe esse usuário!'}) 
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocorreu um erro'
            })
            next(error)
        }
    }
}