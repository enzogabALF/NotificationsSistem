import express from 'express'
import diaryRouter from './routes/diaries'
const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someine pinged here!!')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/api/notifications', (req, res) => {
  const subscription = req.body
  console.log('Subscription received:', subscription)
  res.status(201).json({ message: 'Subscription received' })
})
