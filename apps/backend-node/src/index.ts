import express, { Request, Response } from "express"

const app = express()

app.use(express.json())

app.get("/download", (req: Request, res: Response) => {
    res.send("hi from downlaod")
})

app.listen(3001)