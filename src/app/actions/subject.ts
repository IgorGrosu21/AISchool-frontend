'use server'

import { errorHandler, sendTask } from "@/requests"
import { IDetailedTopic, ITask } from "@/interfaces"

export async function completeTask(topic: IDetailedTopic, task: ITask) {
  if (!topic.completedTasks.includes(task.slug)) {
    const res = await sendTask(topic, task)
    if (res) {
      const [dataRaw, status] = res
      const data = await errorHandler(dataRaw, status)
      return data
    }
  }
}