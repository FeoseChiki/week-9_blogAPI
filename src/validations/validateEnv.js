require('dotenv').congig();

const requiredEnvs = [
    'PORT',
'MongoDB_URI',
'JWT_SECRET'
];

function validateEnv() {
const missingVars = requiredEnvs.filter(
    (key) => !process.env[key] || process.env[key].trim() === ''
);

if (missingVars.length > 0) {
    console.error ('Missing required environment variables:');
    missingVars.forEach((v) => console.error (`- ${v}`));
    process.exit(1);
}

console.log('All required environment variables are set.');

}
module.exports = validateEnv;