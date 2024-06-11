import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
    /**
     * Display a list of resource
     */
    async index({}: HttpContext) {
        return Task.all()
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request }: HttpContext) {
        const payload = request.only(['title', 'is_completed'])
        const data = {
            title: payload.title,
            is_completed: payload.is_completed,
        }
        await Task.create(data)
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request }: HttpContext) {
        const todo = await Task.findOrFail(params.id)
        const payload = request.only(['title', 'is_completed'])
        const data = {
            title: payload.title,
            is_completed: payload.is_completed,
        }
        todo.merge(data)
        await todo.save()
    }

    /**
     * Delete record
     */
    async destroy({ params }: HttpContext) {
        const todo = await Task.findOrFail(params.id)
        await todo.delete()
    }
}
