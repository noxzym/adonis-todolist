/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import TodosController from '#controllers/todos_controller'
import router from '@adonisjs/core/services/router'

router.resource('/api/todos', TodosController).apiOnly()
router.on('/').renderInertia('home')
