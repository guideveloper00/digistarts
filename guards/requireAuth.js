function requireAuth(req, res, next) {
    if (!req.user) {
      return res.status(401).send('Você precisa estar logado para acessar esta página');
    }
    if (!req.user.isAdmin) {
      return res.status(403).send('Acesso negado');
    }
    next();
  }

module.exports = requireAuth;
