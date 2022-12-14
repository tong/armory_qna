const { spawn } = require('node:child_process');

const repo = process.argv[2];
const issue_number = process.argv[3];
const path = '/repos/'+repo+"/issues/"+issue_number;

let out;
let err;

const gh = spawn('gh', ['api', '-H', 'Accept: application/vnd.github+json', path]);
gh.stdout.on('data', data => {
    out = data.toString();
});
gh.stderr.on('data', data => {
    err = data.toString();
});
gh.on('close', code =>{
    if(code === 0) {
        const json = JSON.parse(out);
        const lines = json.body.split("\n");
        const questions = [];
        lines.forEach(line => {
            line = line.trim();
            if(line.charAt(line.length-1) === "?") {
                questions.push(line);
            }
        });
        questions.forEach(q => {
            process.stdout.write(q+'\n');
        });
    } else {
        process.stderr.write(err);
    }
    process.exit(code);
});

