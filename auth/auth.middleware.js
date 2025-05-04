function ensureAuth(req, res, next) {
  req.session.returnTo = req.originalUrl;
  console.log('User authenticated:', req.isAuthenticated());
  console.log('Session:', req.session);  

  if (!req.isAuthenticated()) {
    console.log('Redirecting to login');
    return res.redirect('/auth/login');
  }

  if (req.originalUrl.startsWith('/admin')) {
    if (req.user.user_type !== 'admin') {
      console.log('User is not admin, redirecting');
      return res.redirect('/');
    }
  }

  next();
}

module.exports = ensureAuth;
