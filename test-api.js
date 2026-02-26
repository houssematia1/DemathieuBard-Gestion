const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 8080,
      path,
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body)}
    }, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => { try { resolve({status: res.statusCode, body: JSON.parse(d)}); } catch(e) { resolve({status: res.statusCode, body: d}); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function get(path, token) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost', port: 8080, path, method: 'GET',
      headers: token ? {'Authorization': 'Bearer ' + token} : {}
    }, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => { try { resolve({status: res.statusCode, body: JSON.parse(d)}); } catch(e) { resolve({status: res.statusCode, body: d}); } });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  // Login as admin
  const login = await post('/api/auth/login', {email: 'admin@btp.fr', motDePasse: 'Admin@123'});
  console.log('Login status:', login.status);
  if (login.status !== 200) { console.log('Login body:', JSON.stringify(login.body)); return; }
  const token = login.body.token || login.body.accessToken;
  console.log('Token OK | role:', login.body.role);

  // Get users
  const users = await get('/api/users?page=0&size=50', token);
  console.log('GET /api/users status:', users.status);
  if (users.body && users.body.content) {
    const all = users.body.content;
    const controleurs = all.filter(u => u.actif && (u.role === 'CONTROLEUR_INTERNE' || u.role === 'CONTROLEUR_EXTERNE'));
    console.log('Total users in DB:', users.body.totalElements);
    console.log('Controleurs dispo:', controleurs.map(u => `  - ${u.prenom} ${u.nom} (${u.role})`).join('\n'));
  } else {
    console.log('Users body:', JSON.stringify(users.body).substring(0, 300));
  }

  // Get plans
  const plans = await get('/api/plans?page=0&size=20', token);
  console.log('\nGET /api/plans status:', plans.status);
  if (plans.body && plans.body.content) {
    const ps = plans.body.content;
    console.log('Plans count:', ps.length);
    ps.forEach(p => console.log(`  - [${p.statut}] ${p.nom} (${p.typePlan}) indice:${p.derniereVersion ? p.derniereVersion.indice : '?'}`));
  } else if (Array.isArray(plans.body)) {
    console.log('Plans (array):', plans.body.length);
    plans.body.forEach(p => console.log(`  - [${p.statut}] ${p.nom}`));
  } else {
    console.log('Plans body:', JSON.stringify(plans.body).substring(0, 300));
  }
}
main().catch(console.error);
