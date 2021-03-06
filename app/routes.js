module.exports = function (app, passport){
    console.log("This is from routes:",passport)
    console.log("From routes js")
    app.get('/',(req,res)=>{
        res.render('index.ejs');
    });

    app.get('/login',(req,res)=>{
        res.render('login.ejs',{message: req.flash('loginMessage')});
    });
    app.post('/login', passport.authenticate('local-login',{
        successRedirect:'/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))
    app.get('/signup', (req,res)=>{
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
    app.post('/signup',passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/profile', isLoggedIn, (req,res)=>{
        res.render('profile.ejs',{
            user: req.user
        })
    });
    app.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}