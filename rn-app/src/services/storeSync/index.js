import homeSync from './homeSync'
import userSync from './userSync'

let sync = {
    ...homeSync,
    ...userSync,
}


export default sync