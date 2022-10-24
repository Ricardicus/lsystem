export class Stack {
	constructor() {
		this.items = [];
	}

	push(element) {
		return this.items.push(element);
	}

	pop() {
		if (this.items.length > 0) {
			return this.items.pop();
		}
	}

	peek() {
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length == 0;
	}

	// the size of the stack
	size() {
		return this.items.length;
	}

	// empty the stack
	clear() {
		this.items = [];
	}
}

