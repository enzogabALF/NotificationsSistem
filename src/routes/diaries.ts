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
  }
  res.status(404).send('Diary not found')
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

export default router
