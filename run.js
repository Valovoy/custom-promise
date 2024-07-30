class CustomPromise {
	#state = 'pending'
	#result = undefined
	#hendlers = []

	constructor(executor) {
		executor(this.resolve)
	}

	resolve = result => {
		this.#state = 'fulfilled'
		this.#result = result

		this.#hendlers.forEach(func => func(this.#result))
	}

	then(func) {
		if (this.#result) {
			func(this.#result)
		} else {
			this.#hendlers.push(func)
		}

		return this
	}
}
