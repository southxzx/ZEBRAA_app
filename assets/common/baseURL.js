import { Platform } from 'react-native';

let baseURL = '';

// {Platform.OS === 'android' 
// ? baseURL = 'https://tinhyeumaunang.herokuapp.com/api/'
// : baseURL = 'https://tinhyeumaunang.herokuapp.com/api/'
// }

{Platform.OS === 'android' 
? baseURL = 'http://192.168.10.145:5000/api/'
: baseURL = 'http://192.168.10.145:5000/api/'
}

export default baseURL;