const { KafkaClient, Producer } = require("kafka-node");
// require("dotenv").config();
console.log(process.env.ENVIRONMENT, "********************************");
const client = new KafkaClient({
    kafkaHost:
    process.env.ENVIRONMENT === 'local'
            ? process.env.INTERNAL_KAFKA_ADDR
            : process.env.EXTERNAL_KAFKA_ADDR,
});
const producer = new Producer(client);
producer.on("error", function(err) {
    console.log("Producer error", err);
  });

producer.on('ready', () => {
    setInterval(() => {
        const payloads = [
            {
                topic: process.env.TOPIC,
                messages: [`${process.env.TOPIC}_message_${Date.now()}`],
            },
        ];
        producer.send(payloads, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log("succeeded...............");
        });
    }, 5000);
});
