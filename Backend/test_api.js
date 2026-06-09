const fs = require('fs');
const http = require('http');

const boundary = '----NodeTestBoundary123';
const pdfBuffer = fs.readFileSync('./test_resume.pdf');
const selfDesc = 'I am a Full Stack Developer with 2 years of MERN stack experience in React, Node.js and MongoDB.';
const jobDesc = 'We need a Full Stack Developer skilled in React.js, Node.js, Express and MongoDB for building scalable APIs.';

const CRLF = '\r\n';

const parts = [];

// PDF file part
parts.push(Buffer.from('--' + boundary + CRLF));
parts.push(Buffer.from('Content-Disposition: form-data; name="resume"; filename="test_resume.pdf"' + CRLF));
parts.push(Buffer.from('Content-Type: application/pdf' + CRLF + CRLF));
parts.push(pdfBuffer);
parts.push(Buffer.from(CRLF));

// selfDescription
parts.push(Buffer.from('--' + boundary + CRLF));
parts.push(Buffer.from('Content-Disposition: form-data; name="selfDescription"' + CRLF + CRLF));
parts.push(Buffer.from(selfDesc + CRLF));

// jobDescription
parts.push(Buffer.from('--' + boundary + CRLF));
parts.push(Buffer.from('Content-Disposition: form-data; name="jobDescription"' + CRLF + CRLF));
parts.push(Buffer.from(jobDesc + CRLF));

// closing boundary
parts.push(Buffer.from('--' + boundary + '--' + CRLF));

const body = Buffer.concat(parts);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/interview',
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': body.length
    }
};

console.log('Sending POST to http://localhost:3000/api/interview ...');
console.log('PDF size:', pdfBuffer.length, 'bytes');
console.log('Body size:', body.length, 'bytes');
console.log('');

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('HTTP STATUS:', res.statusCode);
        try {
            const parsed = JSON.parse(data);
            if (res.statusCode === 201) {
                console.log('\n✅ SUCCESS! Interview Report Generated!');
                console.log('Message:', parsed.message);
                console.log('Report ID:', parsed.interviewReport._id);
                console.log('matchScore:', parsed.interviewReport.matchScore);
                console.log('Technical Questions:', parsed.interviewReport.technicalQuestions.length);
                console.log('Behavioral Questions:', parsed.interviewReport.behavioralQuestion.length);
                console.log('Skill Gaps:', parsed.interviewReport.skillGaps.length);
                console.log('Prep Plan Days:', parsed.interviewReport.preparationPlan.length);
                console.log('');
                console.log('--- SAMPLE TECHNICAL QUESTION ---');
                const tq = parsed.interviewReport.technicalQuestions[0];
                if (tq) {
                    console.log('Q:', tq.question);
                    console.log('Intention:', tq.intention);
                }
                console.log('');
                console.log('--- SKILL GAPS ---');
                parsed.interviewReport.skillGaps.forEach(g => {
                    console.log(' -', g.skill, '(' + g.severity + ')');
                });
            } else {
                console.log('\n❌ Error Response:');
                console.log(JSON.stringify(parsed, null, 2));
            }
        } catch (e) {
            console.log('Raw response:', data);
        }
    });
});

req.on('error', (e) => console.error('Request error:', e.message));
req.write(body);
req.end();
