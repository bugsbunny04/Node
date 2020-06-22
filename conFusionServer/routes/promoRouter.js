const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

const Promotions = require('../models/promotions.js');

const promoRouter = express.Router();

promoRouter.use(bodyparser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Promo Created',promo);
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(promo);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 404;
    res.end('PUT operation not supported on /promos');
})
.delete((req,res,next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp)
    },(err) => next(err))
    .then((err) => next(err));
});

promoRouter.route('/:promoId')
    .get(function (req, res, next) {
        Promotions.findById(req.params.promoId)
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','appication/json');
            res.json(promo)
        },(err)=>next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promos/'+ req.params.promoId);
      })

    .put(function (req, res, next) {
        Promotions.findByIdAndUpdate(req.params.promoId,{
            $set : req.body
        },{new : true})
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(promo);
        },(err) => next(err))
        .catch((err)=>next(err));
    })

    .delete(function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp)
        },(err) => next(err))
        .catch((err) => next(err));
    });

module.exports = promoRouter;