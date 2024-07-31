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
			const handler = result => {
				try {
					if (this.#state === 'fulfilled') {
						const result = onFulfilled
							? onFulfilled(this.#result)
							: this.#result
						resolve(result)
					} else {
						const result = onRejected ? onRejected(this.#result) : this.#result
						resolve(result)
					}
				} catch (error) {
					reject(error)
				}
			}

			if (this.#state === 'pending') {
				this.#handlers.push(handler)
			} else {
				handler(this.#result)
			}
		})
	}
}
