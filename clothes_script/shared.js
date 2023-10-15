class AppError {
  constructor(message) {
      this.message = message
  }
}

async function loadClothingModel(modelo){
  RequestModel(modelo)

  let attempts = 0
  const maxAttempts = 6

  const createDelayPromise = (time) => new Promise((resolve, reject) => {
    if (attempts !== maxAttempts) {
      setTimeout(resolve, time)
      return attempts++
    } else {
      return reject({
        message: 'Ocorreu um erro ao carregar o modelo da roupa!'
      })
    }
  })

  while(!HasModelLoaded(modelo)) {
    await createDelayPromise(500)
  }
}