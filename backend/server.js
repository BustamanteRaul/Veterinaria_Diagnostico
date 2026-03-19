const app = require("./app");

const {
  fetchOwners, fetchOwnerById, respondWithOwner, createOwner, updateOwner, deleteOwner
} = require("./middlewares/owner");

const {
  fetchBills, fetchBillById, respondWithBill, fetchBillByVisitId, deleteBill, createBill, updateBill
} = require("./middlewares/billing");

const {
  fetchPets, fetchPetById, fetchPetsByOwnerId, respondWithPet, deletePet, createPet, updatePet
} = require("./middlewares/pets");

const {
  fetchVisits, fetchVisitById, fetchVisitsByPetId, respondWithVisit, deleteVisit, createVisit, updateVisit
} = require("./middlewares/visit");


// Rutas para los owners
app.get('/owners', fetchOwners, respondWithOwner)

app.get('/owners/:id', fetchOwnerById, respondWithOwner)

app.post('/owners', createOwner, respondWithOwner)

app.put('/owners/:id', updateOwner, respondWithOwner)

app.delete('/owners/:id', deleteOwner, respondWithOwner)


// Rutas para los bills
app.get('/bills', fetchBills, respondWithBill)

app.get('/bills/:id', fetchBillById, respondWithBill)
// Obtener la bill de una visita
app.get('/bills/visit/:id', fetchBillByVisitId, respondWithBill)

app.post('/bills', createBill, respondWithBill)

app.put('/bills/:id', updateBill, respondWithBill)

app.delete('/bills/:id', deleteBill, respondWithBill)


// Rutas para los pets
app.get('/pets', fetchPets, respondWithPet)

app.get('/pets/:id', fetchPetById, respondWithPet)
// Ruta para obtener las pets de un owner
app.get('/pets/owner/:id', fetchPetsByOwnerId, respondWithPet)

app.post('/pets', createPet, respondWithPet)

app.put('/pets/:id', updatePet, respondWithPet)

app.delete('/pets/:id', deletePet, respondWithPet)


// Rutas para los visits
app.get('/visits', fetchVisits, respondWithVisit)

app.get('/visits/:id', fetchVisitById, respondWithVisit)
// Ruta para obtener las visits de una pet
app.get('/visits/pet/:id', fetchVisitsByPetId, respondWithVisit)

app.post('/visits', createVisit, respondWithVisit)

app.put('/visits/:id', updateVisit, respondWithVisit)

app.delete('/visits/:id', deleteVisit, respondWithVisit)