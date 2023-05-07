import { Buffer } from 'buffer';

export default function UserConfig(username: string, password: string){
    // Create token by username:password
    const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    localStorage.setItem('atoken', access_token);
}