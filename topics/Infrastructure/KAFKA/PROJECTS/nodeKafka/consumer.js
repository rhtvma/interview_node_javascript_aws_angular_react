// consumer.js
const { Kafka } = require('kafkajs');

async function runConsumer() {
    try {
        const kafka = new Kafka({
            clientId: 'my-node-consumer',
            brokers: ['localhost:9092'], // Change to your Kafka broker(s)
        });

        const consumer = kafka.consumer({ groupId: 'test-group' });

        console.log('Connecting consumer...');
        await consumer.connect();
        console.log('Consumer connected.');

        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    topic,
                    partition,
                    key: message.key?.toString(),
                    value: message.value?.toString()
                });
            },
        });
    } catch (error) {
        console.error('Consumer error:', error);
        process.exit(1);
    }
}

runConsumer();