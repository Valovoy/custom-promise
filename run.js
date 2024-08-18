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
			const handler = () => {
				try {
					if (this.#state === 'fulfilled') {
						const result = onFulfilled
							? onFulfilled(this.#result)
							: this.#result
						resolve(result)
					} else {
						if (onRejected) {
							const result = onRejected(this.#result)
							resolve(result)
						} else {
							reject(this.#result)
						}
					}
				} catch (error) {
					reject(error)
				}
			}

			if (this.#state === 'pending') {
				this.#handlers.push(handler)
			} else {
				handler()
			}
		})
	}

	catch(onRejected) {
		return this.then(null, onRejected)
	}

	finally(handler) {
		return this.then(
			result => {
				handler()
				return result
			},
			error => {
				handler()
				throw error
			}
		)
	}
}
