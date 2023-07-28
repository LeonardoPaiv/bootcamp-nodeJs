import Express  from "express";

const app = Express()

const port = 3001;

app.listen(port, () => {
    console.log(`App running in port ${port}`)
});

app.use(Express.json())