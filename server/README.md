MiMonitor Server 
 
## Setting up the database 
 
### Installing Percona server for MongoDB 
 
```bash 
wget https://repo.percona.com/apt/percona-release_0.1-4.$(lsb_release -sc)_all.deb
 
sudo dpkg -i percona-release_0.1-4.$(lsb_release -sc)_all.deb 
 
sudo apt-get update 
 
sudo apt-get install percona-server-mongodb-32 
``` 
 
Latest instructions can be found on the [Percona Documentation](https://www.percona.com/doc/percona-server-for-mongodb/3.2/install/apt.html#apt) page. 
 
### Enabling MongoRocks 
 
Edit the Percona MongoDB configuration file. On Ubuntu 16.04 this is `sudo vi /etc/mongod.conf` 
 
```yaml 
storage: 
  dbPath: /var/lib/mongodb 
  journal: 
    enabled: true 
  engine: rocksdb 
 
setParameter: 
  internalQueryExecYieldPeriodMS: 1000 
  internalQueryExecYieldIterations: 100000 
``` 
 
if the __mongod__ service is already running prior to updating the storage engine. You need to stop mongo, remove the contents of `/var/lib/mongodb` before starting the server or it will fail as RocksDB is not compatible with other storage engines. 
 
### Setup security PEM for Mongo TLS Connections 
 
Generate the certificate used by MongoDB. Self signed certificates can not be verified so when connecting you need to use the `--sslAllowInvalidCertificates` flag. 
 
```bash 
$ cd /etc/ssl 
$ sudo openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out mongodb-cert.crt -keyout mongodb-cert.key 
$ cat mongodb-cert.key mongodb-cert.crt > mongodb.pem 
``` 
 
Update MongoDB configuration file. 
 
```yaml 
net: 
  port: 27017 
  bindIp: 127.0.0.1 
  ssl: 
    mode: requireSSL 
    PEMKeyFile: /etc/ssl/mongodb.pem 
    disabledProtocols: TLS1_0,TLS1_1 
``` 
 
## Setting up the application 
### Install nodeJS (Not needed for Homestead 7) 
 
``` 
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - 
$ sudo apt-get install -y nodejs 
$ sudo apt-get install -y build-essential 
``` 
 
### Install mongo shell: 
If needed to troubleshoot connection issues from app server to MongoDB server, you can install mongo shell on the client without installing the full installation. 
 
``` 
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 
$ echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list 
$ sudo apt-get update 
$ sudo apt-get install -y mongodb-org-shell 
``` 
 
### Deployment using PM2:  
#### Installation 
 
Node servers are managed using PM2. It must be installed on every app server. 
``` 
$ npm install -g pm2 
``` 
 
#### Deploy to servers 
 
MiMonitor can be deployed from the local repo provided PM2 is install installed locally using the following commands. If server configuration such as IP or address changes, then this file needs to be updated accordingly. 
 
``` 
$ pm2 deploy ecosystem.json production setup 
$ pm2 deploy ecosystem.json production 
