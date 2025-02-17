var express = require('express');

var router = express.Router();

var Conversas = require('../controllers/conversas')
var Mensagens = require('../controllers/mensagens');
const mensagens = require('../models/mensagens');
const passport = require('passport')


/*
var passport = require('passport')


function checkPermissao(acess){
  return function(req, res, next) {
  if(acess == 0 || req.user.nAcess>=acess){
    console.log("Tem permissão")
    next()
  }
  else{
  console.log("Não tem permissão")
  res.status(401).jsonp("Não tem permissão")
  }
  }
}*/

//GET

router.get('/conversas', passport.authenticate('jwt', {session: false}), function(req,res){
  Conversas.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})

router.get('/conversas/participante/:id', passport.authenticate('jwt', {session: false}), function(req, res){
  Conversas.findByParticipante(req.params.id)
          .then(async dados =>{
            
            for(i in dados){
              var msg = {}
              msg = await Mensagens.findByConversa(dados[i]._id)
              console.log(msg)
              dados[i].mensagens = msg
            }
        
            console.log(dados)
            res.jsonp(dados)
          })
          .catch(erro => res.status(500).jsonp(erro))
})

router.get('/conversas/participante/:id/simples', passport.authenticate('jwt', {session: false}), function(req, res){
  Conversas.findByParticipanteSimple(req.params.id)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})

//                                                  PUT

router.put('/conversas/:id', passport.authenticate('jwt', {session: false}), function(req, res){
  Conversas.putConversaInativa(req.params.id)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})



//                                                  POST

router.post('/conversas', passport.authenticate('jwt', {session: false}), function(req, res){
  Conversas.iniciarConversa(req.body)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})

router.post('/conversas/:conversa/:participante', passport.authenticate('jwt', {session: false}), function(req, res){
  Conversas.addParticipante(req.params.conversa, req.params.participante)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})


//                                                    DELETE

router.delete('/conversas/:conversa/:participante', passport.authenticate('jwt', {session: false}), function(req, res){
  Conversas.removeParticipante(req.params.conversa, req.params.participante)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})


/////////////////////// Mensagens /////////////////////////////


router.get('/mensagens', passport.authenticate('jwt', {session: false}), function(req, res){
  Mensagens.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/mensagens/:conversa',passport.authenticate('jwt', {session: false}), function(req, res){
  Mensagens.findByConversa(req.params.conversa)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})

router.post('/mensagens',passport.authenticate('jwt', {session: false}), function(req, res){
  var msg = req.body
  console.log(msg)
  msg.dataEnvio = new Date()
  Mensagens.addMensagem(msg)
            .then( () => res.jsonp({Result:"Message inserted"}))
            .catch(erro => res.status(500).jsonp(erro))
})



module.exports = router;
