import { Buffer } from 'buffer';

export default function UserConfig(){
    const username = "bob";
    const password = "1234";
    // Create token by username:password
    const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    localStorage.setItem('atoken', access_token);
}