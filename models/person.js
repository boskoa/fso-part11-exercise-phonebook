const mongoose = require('mongoose')

const url = 'mongodb+srv://Bosko:PrvamongobazA@cluster0.3rbf4.mongodb.net/phonebook?retryWrites=true&w=majority'

console.log('Connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)