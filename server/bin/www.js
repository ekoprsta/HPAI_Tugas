const app = require('./../app')
const Port = process.env.PORT || 3003

app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
})