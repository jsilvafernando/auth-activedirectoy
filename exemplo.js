// baseado: https://www.npmjs.com/package/activedirectory

var ActiveDirectory = require('activedirectory');
var config = {
    url: 'ldap://dc1.dominio.com.br',
    baseDN: 'dc=dominio,dc=com,dc=br',
    username:'idautldap@dominio.com.br', // um usuário de serviço no AD
    password:'**********'
}

var ad = new ActiveDirectory(config);
var user = 'usuario';
var username = user+'@dominio.com.br';
var password = '********';

ad.userExists(username, function(err, exists) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  console.log(username + ' exists: ' + exists);
});

ad.getGroupMembershipForUser(username, function(err, groups) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if (!groups) console.log('User: ' + username + ' not found.');
  else console.log(JSON.stringify(groups));
});

ad.authenticate(username, password, function (err, auth){
    if(err){
        console.log('Error: ' + JSON.stringify(err));
        return;
    } 
    if (auth){
        console.log('Authenticated!');
        console.log(auth);
    } else{
        console.log('Authentication failed!');
    }
});

var query = 'cn='+user;
 
var ad = new ActiveDirectory(config);
ad.findUsers(query, true, function(err, users) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if ((!users) || (users.length == 0)) console.log('No users found.');
  else {
    console.log('findUsers: '+JSON.stringify(users));
  }
});