import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

class AuthService {
    getAuthStorage(callback){
         AsyncStorage.multiGet(['auth', 'user'], (err, val) => {
            if(err){
                callback(err);
            }
            if(!val){
                return callback();
            }
            //construct an object for val (array)
            let authObject = {};
            _.forEach(val, (element) => {
                authObject[element[0]] = element[1];
            });
            if(!authObject['auth']){
                return callback();
            }
            var authInfo = {
                header: {
                    Authorization: 'Basic ' + authObject['auth']
                },
                user: JSON.parse(authObject['user'])
            };
            return callback(null , authInfo);
        });
    }

    login(credentials, callback){
        let b = new buffer.Buffer(credentials.username + ':' + credentials.password);
        let encoded = b.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'Basic ' + encoded
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300){
                return response.json();
            }
            
            throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
            }
            
        }).then((result) => {
            AsyncStorage.multiSet([
                ['auth', encoded],
                ['user', JSON.stringify(result)]
            ], err => {
                if(err){
                    throw err;
                }
            
                return callback({success: true});
            });
            
        }).catch(err => {
            return callback(err);
        });
    }
}

export default new AuthService();