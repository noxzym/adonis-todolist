import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Task extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare isCompleted: boolean
}
