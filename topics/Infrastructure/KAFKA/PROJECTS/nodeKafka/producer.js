// producer.js
const { Kafka } = require('kafkajs');

async function runProducer() {
    try {
        // Create Kafka client instance
        const kafka = new Kafka({
            clientId: 'my-node-producer',
            brokers: ['localhost:9092'], // Change to your Kafka broker(s)
        });

        const producer = kafka.producer();

        console.log('Connecting producer...');
        await producer.connect();
        console.log('Producer connected.');

        // Send a sample message
        const result = await producer.send({
            topic: 'test-topic',
            messages: [
                { key: 'key1', value: 'Hello from Node.js Kafka Producer!' },
            ],
        });

        console.log('Message sent successfully:', result);

        await producer.disconnect();
        console.log('Producer disconnected.');
    } catch (error) {
        console.error('Producer error:', error);
        process.exit(1);
    }
}

runProducer();

/**
  Message sent successfully: [
    {
        topicName: 'test-topic',
        partition: 0,
        errorCode: 0,
        baseOffset: '18',
        logAppendTime: '-1',
        logStartOffset: '0'
    }
  ]
 */