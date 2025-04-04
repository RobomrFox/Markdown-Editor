import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import User from './db.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true
}))

app.disable('etag');


app.use(
    session({
        secret: 'dont tell the secret',
        resave: false, 
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 15, //15 mins
            sameSite: 'Lax',
            secure: false
          }
    })
)


app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            error: "Invalid Details, Username, Email, and Password is needed"
        });
    }


    const existingUser = await User.findOne({
        email: email
    });

    if (existingUser) {
        return res.status(401).json({
            error: "User already Exists!"
        })
    };

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({
        username, 
        email, 
        password: hashedPassword
    });

    const saveUser = await newUser.save();

    req.session.user = {
        id: saveUser._id, 
        username: saveUser.username, 
        email: saveUser.email,
    }

    res.status(201).json({
        msg: "User Registered and Logged in Successfully!"
    })

});



app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(401).json({
            error: "Wrong credentials. Or Server Down"
        })
    }


    const existingUser = await User.findOne({
        email
    })


    if (existingUser) {
        const storedPassword = existingUser.password;

        const passwordCheck = await bcrypt.compare(password, storedPassword);

        if (passwordCheck) {
            req.session.user = {
                id: existingUser._id,
                username: existingUser.username, 
                email: existingUser.email
            }

            return res.json({
                msg: "You are logged In Now."
            })
        }else {
            return res.status(401).json({
                error: "Password Isn't Correct"
            })
        }
        
    } else {
        return res.status(400).json({
            error: "You haven't Registered Yet. Please Register Now!"
        })
    }
});


app.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({
                error: 'Logout failed, please try again.'
            });
        }

        res.clearCookie('connect.sid');
        return res.status(200).json({msg: 'Logged out successfully.'});
    })
})

app.get('/status', async (req, res) => {
    if (req.session.user) {
        return res.json({
            loggedIn: true, 
            user: req.session.user
        })
    } else {
        return res.json({
            loggedIn: false, 
            user: null
        })
    }
})





app.listen('3000', () => {
    console.log('Port 3000 is running!');
});
