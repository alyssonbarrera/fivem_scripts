async function loadVehicleModel(modelo){
  RequestModel(modelo)

  let attempts = 0
  const maxAttempts = 6

  const createDelayPromise = (time) => new Promise((resolve, reject) => {
    if (attempts !== maxAttempts) {
      setTimeout(resolve, time)
      return attempts++
    } else {
      return reject({
        message: 'Ocorreu um erro ao carregar o modelo do veículo!'
      })
    }
  })

  while(!HasModelLoaded(modelo)) {
    await createDelayPromise(500)
  }
}