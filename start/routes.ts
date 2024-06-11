const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'

router.resource('/todos', TodosController).apiOnly()
router.on('/').renderInertia('home')
