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
    const payload = request.only(['title', 'isCompleted'])

    await Task.create({
      title: payload.title,
      isCompleted: payload.isCompleted,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    const payload = request.only(['title', 'isCompleted'])

    task.title = payload.title
    task.isCompleted = payload.isCompleted
    await task.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }
}
