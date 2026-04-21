/**
 * @swagger
 * tags:
 *   name: Famílias
 *   description: Rotas de gerenciamento de famílias
 */

/**
 * @swagger
 * /api/familias/:
 *   get:
 *     summary: Retorna a lista de todas as famílias visíveis para o usuário
 *     tags: [Famílias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Quantidade de registros por página
 *     responses:
 *       200:
 *         description: Lista de famílias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 familias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 64f0c3a5e6b29d9f1a7c4a91
 *                       nome:
 *                         type: string
 *                         example: Família Silva
 *                       representante:
 *                         type: string
 *                         example: João Silva
 *                       gestorId:
 *                         type: string
 *                         example: 64f0c3a5e6b29d9f1a7c4a92
 *                       membros:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: 64f0c3a5e6b29d9f1a7c4a93
 *                             nome:
 *                               type: string
 *                               example: Maria Silva
 *                             email:
 *                               type: string
 *                               example: maria@email.com
 *                             role:
 *                               type: string
 *                               example: cultivador
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/familias/{id}:
 *   get:
 *     summary: Retorna uma família específica pelo ID
 *     tags: [Famílias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da família
 *     responses:
 *       200:
 *         description: Família encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 familia:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a91
 *                     nome:
 *                       type: string
 *                       example: Família Silva
 *                     representante:
 *                       type: string
 *                       example: João Silva
 *                     gestorId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a92
 *                     membros:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 64f0c3a5e6b29d9f1a7c4a93
 *                           nome:
 *                             type: string
 *                             example: Maria Silva
 *                           email:
 *                             type: string
 *                             example: maria@email.com
 *                           role:
 *                             type: string
 *                             example: cultivador
 *       404:
 *         description: Família não encontrada
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/familias/:
 *   post:
 *     summary: Cria uma nova família
 *     tags: [Famílias]
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
 *                 example: Família Silva
 *               representante:
 *                 type: string
 *                 example: João Silva
 *               gestorId:
 *                 type: string
 *                 example: 64f0c3a5e6b29d9f1a7c4a92
 *               qtdMembros:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Família criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 familia:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a91
 *                     nome:
 *                       type: string
 *                       example: Família Silva
 *                     representante:
 *                       type: string
 *                       example: João Silva
 *                     gestorId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a92
 *                     qtdMembros:
 *                       type: integer
 *                       example: 4
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Acesso negado ou campos obrigatórios faltando
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/familias/{id}:
 *   put:
 *     summary: Atualiza uma família existente
 *     tags: [Famílias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da família
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Família Silva Atualizada
 *               representante:
 *                 type: string
 *                 example: João Silva
 *               gestorId:
 *                 type: string
 *                 example: 64f0c3a5e6b29d9f1a7c4a92
 *               qtdMembros:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Família atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 familia:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a91
 *                     nome:
 *                       type: string
 *                       example: Família Silva Atualizada
 *                     representante:
 *                       type: string
 *                       example: João Silva
 *                     gestorId:
 *                       type: string
 *                       example: 64f0c3a5e6b29d9f1a7c4a92
 *                     qtdMembros:
 *                       type: integer
 *                       example: 5
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Família não encontrada
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /api/familias/{id}:
 *   delete:
 *     summary: Remove uma família
 *     tags: [Famílias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da família
 *     responses:
 *       200:
 *         description: Família removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Família removida
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Família não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
