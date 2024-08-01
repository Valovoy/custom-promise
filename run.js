class CustomPromise {
	#state = 'pending'
	#result = undefined
	#handlers = []

	constructor(executor) {
		this.resolve = this.resolve.bind(this)
		this.reject = this.reject.bind(this)

		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

	#onHandler(state, result) {
		this.#state = state
		this.#result = result

		this.#handlers.forEach(func => func(this.#result))
		this.#handlers = []
	}

	resolve(result) {
		this.#onHandler('fulfilled', result)
	}

	reject(error) {
		this.#onHandler('rejected', error)
	}

	then(onFulfilled, onRejected) {
		return new CustomPromise((resolve, reject) => {
<<<<<<< HEAD
			const handler = () => {
=======
			const handler = result => {
>>>>>>> 8368982c89107910259d04a13e5e9193baee4be2
				try {
					if (this.#state === 'fulfilled') {
						const result = onFulfilled
							? onFulfilled(this.#result)
							: this.#result
						resolve(result)
					} else {
<<<<<<< HEAD
						if (onRejected) {
							const result = onRejected(this.#result)
							resolve(result)
						} else {
							reject(this.#result)
						}
=======
						const result = onRejected ? onRejected(this.#result) : this.#result
						resolve(result)
>>>>>>> 8368982c89107910259d04a13e5e9193baee4be2
					}
				} catch (error) {
					reject(error)
				}
			}

			if (this.#state === 'pending') {
				this.#handlers.push(handler)
			} else {
<<<<<<< HEAD
				handler()
=======
				handler(this.#result)
>>>>>>> 8368982c89107910259d04a13e5e9193baee4be2
			}
		})
	}
}
