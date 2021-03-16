import { Platform } from 'react-native';

let baseURL = '';

{Platform.OS === 'android' 
? baseURL = 'https://tinhyeumaunang.herokuapp.com/api/'
: baseURL = 'https://tinhyeumaunang.herokuapp.com/api/'
}

export default baseURL;