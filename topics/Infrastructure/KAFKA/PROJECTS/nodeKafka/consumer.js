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

/**
    {"level":"INFO","timestamp":"2026-06-19T16:17:59.914Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"test-group"}
    {"level":"INFO","timestamp":"2026-06-19T16:18:20.066Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"test-group","memberId":"my-node-consumer-b33cb137-843b-4683-8256-aac7f27f09ba","leaderId":"my-node-consumer-b33cb137-843b-4683-8256-aac7f27f09ba","isLeader":true,"memberAssignment":{"test-topic":[0]},"groupProtocol":"RoundRobinAssigner","duration":20151}
    {
    topic: 'test-topic',
    partition: 0,
    key: 'key1',
    value: 'Hello from Node.js Kafka Producer!'
    }
 */