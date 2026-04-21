/**
 * @swagger
 * tags:
 *   name: Hortas
 *   description: Rotas de gerenciamento de hortas
 */

/**
 * @swagger
 * /api/hortas/:
 *   get:
 *     summary: Retorna a lista de todas as hortas (admin vê todas, gestor vê hortas que gerencia, outros apenas as suas)
 *     tags: [Hortas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de hortas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hortas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 64f0c3a5e6b29d9f1a7c4a91
 *                       nome:
 *                         type: string
 *                         example: Horta Comunitária Central
 *                       endereco:
 *                         type: string
 *                         example: Rua das Flores, 123
 *                       tipoHorta:
 *                         type: string
 *                         example: comunitaria
 *                       gestorId:
 *                         type: string
 *                         example: 64f0c3a5e6b29d9f1a7c4a92
 *                       familiaId:
 *                         type: string
 *                         example: 64f0c3a5e6b29d9f1a7c4a93
 *       403:
 *         description: Acesso negado. Usuário não tem permissão.
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/hortas/{id}:
 *   get:
 *     summary: Retorna uma horta específica pelo ID
 *     tags: [Hortas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da horta
 *     responses:
 *       200:
 *         description: Horta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 horta:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a91
 *                     nome:
 *                       type: string
 *                       example: Horta Comunitária Central
 *                     endereco:
 *                       type: string
 *                       example: Rua das Flores, 123
 *                     tipoHorta:
 *                       type: string
 *                       example: comunitaria
 *                     gestorId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a92
 *                     familiaId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a93
 *       404:
 *         description: Horta não encontrada
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/hortas/:
 *   post:
 *     summary: Cria uma nova horta
 *     tags: [Hortas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Horta Comunitária Central
 *               endereco:
 *                 type: string
 *                 example: Rua das Flores, 123
 *               tipoHorta:
 *                 type: string
 *                 example: comunitaria
 *               gestorId:
 *                 type: string
 *                 example: 64f0c3a5e6b29d9f1a7c4a92
 *               familiaId:
 *                 type: string
 *                 example: 64f0c3a5e6b29d9f1a7c4a93
 *     responses:
 *       201:
 *         description: Horta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 horta:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a91
 *                     nome:
 *                       type: string
 *                       example: Horta Comunitária Central
 *                     endereco:
 *                       type: string
 *                       example: Rua das Flores, 123
 *                     tipoHorta:
 *                       type: string
 *                       example: comunitaria
 *                     gestorId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a92
 *                     familiaId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a93
 *       400:
 *         description: Erro ao criar horta
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/hortas/{id}:
 *   put:
 *     summary: Atualiza uma horta existente
 *     tags: [Hortas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da horta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Horta Atualizada
 *               endereco:
 *                 type: string
 *                 example: Rua das Flores, 456
 *               tipoHorta:
 *                 type: string
 *                 example: comunitaria
 *               gestorId:
 *                 type: string
 *                 example: 64f0c3a5e6b29d9f1a7c4a92
 *               familiaId:
 *                 type: string
 *                 example: 64f0c3a5e6b29d9f1a7c4a93
 *     responses:
 *       200:
 *         description: Horta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 horta:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a91
 *                     nome:
 *                       type: string
 *                       example: Horta Atualizada
 *                     endereco:
 *                       type: string
 *                       example: Rua das Flores, 456
 *                     tipoHorta:
 *                       type: string
 *                       example: comunitaria
 *                     gestorId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a92
 *                     familiaId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a93
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Horta não encontrada
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/hortas/{id}:
 *   delete:
 *     summary: Remove uma horta
 *     tags: [Hortas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da horta
 *     responses:
 *       200:
 *         description: Horta removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Horta removida
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Horta não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
