// const signIn = () => {
//   const { email, password } = req.body;
//   const user = await loginModel.emailAndPassword(email, password);
//   if (!user) {
//     return res.status(401).json({
//       data: {
//         message: 'Usuário ou senha inválidos',
//       },
//     });
//   }
//   const token = jwtProvider.sign({ id: user.id });
//   return res.status(200).json({
//     data: {
//       message: 'Usuário logado com sucesso',
//       token,
//     },
//   });
// };

// const loginController = { signIn };

// export default loginController;
