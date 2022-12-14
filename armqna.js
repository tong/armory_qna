#!/usr/bin/env node

const fs = require('node:fs');
const readline = require('node:readline/promises');
const tf = require("@tensorflow/tfjs-node");
const qna = require('@tensorflow-models/qna');

let question;
let knowledgePath = "armory.wiki";
let prompt = "> ";
let searchAllFiles = false;
//let maxAnswersToShow = 5;

let i = 2;
while(i < process.argv.length) {
    let argv = process.argv[i];
    switch (argv) {
    case "--interactive":
    case "-i":
        interactive = true;
        break;
    case "--knowledge":
    case "-k":
        knowledgePath= process.argv[++i];
        break;
    case "--question":
    case "-q":
        question = process.argv[++i];
        break;
    case "--all":
        searchAllFiles = true;
    }
    i++;
}

if(!fs.existsSync(knowledgePath)) {
    console.error("Knowledge path not found");
    process.exit(1);
}

const knowledge = [];
function loadKnowledgeDirectory(path,recur) {
    const entries = fs.readdirSync(path);
    entries.forEach(e => {
        if(e.charAt(0) !== '.') {
            const p = path+'/'+e;
            const stat = fs.statSync(p);
            if(stat.isDirectory()) {
                if(recur) {
                    loadKnowledgeDirectory(p, recur);
                }
            } else {
                knowledge.push({
                    path: p, 
                    content: fs.readFileSync(p).toString()
                }); 
            }
        }
    });
}
loadKnowledgeDirectory(knowledgePath, true);

qna.load().then(model => {
    function getAnswer(q,found,i) {
        let k = knowledge[i];
        console.log('searching for: "'+q+'" in '+k.path);
        return model.findAnswers(q, k.content).then(result =>{
            i++;
            if(result.length>0) {
                found.push({file: k.path, answers: result});
                console.log(k.path);
                result.forEach(a => {
                    console.log(a);
                });
                if(searchAllFiles && i < knowledge.length) {
                    return getAnswer(q,found,i);
                } else {
                    return found;
                } 
            } else {
                return getAnswer(q,found,i);
            }
        });
    }
    if(question) {
        getAnswer(question,[],0).then(result => {
            console.log('Completed');
        });
    } else {
        const rl = readline.createInterface(process.stdin, process.stdout);
        function getQuestion() {
            return rl.question(prompt);
        }
        getQuestion().then(q => {
            getAnswer(q,[],0).then(r=>{
                getQuestion();
            });
        });
    }
});

