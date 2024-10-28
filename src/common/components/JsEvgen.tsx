import React from 'react';
import {resolve} from "node:dns";

const JsEvgen = () => {


    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('some data');
        }, 2000)
    });
    promise
        .then((data) => {
            console.log('then1', data)
            return 10;
        })
        .then((data) => {
            console.log('then2', data)
            return 20;
        })
        .then((data) => {
            console.log('then3', data)
            return a;
        })
        .catch((err) => {
            console.log('catch1', err);
            return 10;
        })
        .then((data) => {
            console.log('then4', data)
            return 40;
        })
        .finally(() => {
            console.log('finally')
            return 50;
        })
        .then((data) => {
            console.log('then5', data)
            return 60;
        })
        .catch((err) => {
            console.log('catch2', err);
        })


    return (
        <div>
            Hi

        </div>
    );
};

export default JsEvgen;