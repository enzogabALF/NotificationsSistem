import express from 'express'
import * as diariesServi from '../service/diariesServi'
import { toNewDaiaryEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diariesServi.getEntrisWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diariesServi.findById(+req.params.id)
  if (diary != null) {
    res.send(diary)
  } else {
    res.status(404).send('Diary not found')
  }
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDaiaryEntry(req.body)
    const addDiaryEntry = diariesServi.addDiary(newDiaryEntry)
    res.json(addDiaryEntry)
  } catch (e) {
    res.status(400).send('malformed data')
  }
})

router.put('/:id', (req, res) => {
  try {
    const id = +req.params.id
    const updatedEntry = toNewDaiaryEntry(req.body)
    const diaryEntry = diariesServi.updateDiaryEntry(id, updatedEntry)
    if (diaryEntry != null) {
      res.json(diaryEntry)
    } else {
      res.status(404).send('Diary entry not found')
    }
  } catch (e) {
    res.status(400).send('Malformed data or validation error')
  }
})

export default router
