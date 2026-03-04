const { Pool } = require('pg');

// Test different common passwords
const passwords = ['postgres', 'admin', '123456', 'password', ''];

async function testConnection(password) {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'shubhamportfolio',
        password: password,
        port: 5432,
    });

    try {
        const client = await pool.connect();
        console.log(`✅ SUCCESS! Password is: "${password}"`);
        console.log('Connected to database: shubhamportfolio');
        client.release();
        await pool.end();
        return true;
    } catch (error) {
        console.log(`❌ Failed with password: "${password}"`);
        await pool.end();
        return false;
    }
}

async function findPassword() {
    console.log('Testing PostgreSQL connection...\n');
    
    for (const pwd of passwords) {
        const success = await testConnection(pwd);
        if (success) {
            console.log('\n🎉 Connection successful!');
            console.log(`\nUpdate server.js with this password: "${pwd}"`);
            return;
        }
    }
    
    console.log('\n❌ None of the common passwords worked.');
    console.log('Please enter your PostgreSQL password manually in server.js');
}

findPassword();
