import axios from 'axios'

const baseUrl = "api/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createEntry = newEntry => {
  const request = axios.post(baseUrl, newEntry)
  return request.then(response => response.data)
}

const removeEntry = entryId => axios.delete(`${baseUrl}/${entryId}`)

const updatePhonebook = (updatedEntry, id) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedEntry)
  return request.then(response => response.data)
}

export default { createEntry, getAll, removeEntry, updatePhonebook }