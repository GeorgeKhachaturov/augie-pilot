const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');

mongoose.connect('mongodb://127.0.0.1:27017/AugiePilot')
    .then(() => {
        console.log('DATABASE RUNNING!')
    })
    .catch((e) => {
        console.log('Error', e);
    })

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'augiepilotkh7111-secret!!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, //cookie expires in one week
    }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.session.user_id;

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(methodOverride('_method'));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.engine('ejs', ejsMate) // enables layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dashboard', requireLogin, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.session.user_id });
        res.render('dashboard', { tasks });
    } catch (e) {
        console.log(e);
        res.send('Error fetching tasks!');
    }
})

app.post('/dashboard', async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTask = new Task({
            title: title,
            description: description,
            user: req.session.user_id
        });

        await newTask.save();
        res.redirect('/dashboard');
    } catch (e) {
        res.redirect('/signup');
    }
})

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/signup', (req, res) => {
    res.render('authentication/signup');
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            req.flash('error', 'All fields are required!');
            return res.redirect('/signup');
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            req.flash('error', 'Username or Email already exists!');
            return res.redirect('/signup');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        req.flash('success', 'User Created!');

        req.session.user_id = newUser._id;
        res.redirect('/dashboard');

    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

app.get('/login', (req, res) => {
    res.render('authentication/login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send('Both Username and Password are required!');
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.send('Invalid User!');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.send('Invalid Username or Password!');
    }

    req.session.user_id = user._id;
    res.redirect('/dashboard')

})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.delete('/dashboard/:id', requireLogin, async (req, res) => {
    try {
        await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.session.user_id
        });
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.send('Delete failed');
    }
});

app.get('/faq', (req, res) => {
    res.render('faq');
})

app.get('/privacy-policy', (req, res) => {
    res.render('privacy_policy');
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000!');
});