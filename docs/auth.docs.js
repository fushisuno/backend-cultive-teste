/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - username
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Teste Lopes
 *               username:
 *                 type: string
 *                 example: testinho
 *               email:
 *                 type: string
 *                 example: teste@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - senha
 *             properties:
 *               username:
 *                 type: string
 *                 example: testinho
 *               email:
 *                 type: string
 *                 example: teste@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Faz logout e invalida o token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Gera um novo token com base no refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 *     responses:
 *       200:
 *         description: Novo token gerado com sucesso
 */
