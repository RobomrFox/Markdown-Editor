import mongoose from 'mongoose';


async function run() {
    await mongoose.connect('mongodb://localhost:27017/MarkdownEditor');
}

run();

const userSchema = new mongoose.Schema({
    username: String, 
    password: String, 
    email: String
})


const User = mongoose.model('User', userSchema);

export default User;