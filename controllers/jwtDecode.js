const jwt = require('jsonwebtoken');

const jwtDecode = (value) => {
    return jwt.decode(value);
}
export default jwtDecode;