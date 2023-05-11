Este backend foi criado com a micro-framework ExpressJs e banco de dados MySQL e suas rotas são:

/auth/signup - POST
criação de usuário

/auth/signin - POST
login de usuário

/auth/signout - POST
logoff de usuário

/user/status - GET
status atual do usuário

/user/update - PATCH
update dos dados do usuário (implementado para que apenas o próprio usuário porra atualizar, mas também é possivel implementar para dar permissão ao ADMIN)

/user/delete - DELETE
delete dos dados do usuário (implementado para que apenas o ADMIN possa deletar, mas também é possivel implementar para dar permissão ao usuário)
