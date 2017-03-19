import buffer from 'buffer';

class AuthService {
    login(credentials, callback){
        let b = new buffer.Buffer(credentials.username + ':' + credentials.password);
        let encoded = b.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'Basic ' + encoded
            }
        }).then((response) => {
            console.log(response.status)
            if(response.status >= 200 && response.status < 300){
                return response.json();
            }
            
            throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
            }
            
        }).then((result) => {
            return callback({success: true});
        }).catch(err => {
            return callback(err);
        }).finally(() => {
            return callback({loading: false});
        })
    }
}

export default new AuthService();