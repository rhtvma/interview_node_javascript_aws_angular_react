class Flower {
    constructor() {
    }

    getFlowerDetail() {
        return `The name of the flower is ${this.name} || its color is ${this.color}`;
    }

    setFlowerDetails(name, color) {
        this.name = name
        this.color = color
    }
}

const flower1 = new Flower()
flower1.setFlowerDetails("Rose", "red")
console.log(flower1.getFlowerDetail())