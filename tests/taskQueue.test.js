const TaskQueue = require('../core/TaskQueue');

const queue = new TaskQueue();
const results = [];

queue.add(async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  results.push('First');
});

queue.add(async () => {
  results.push('Second');
});

queue.process().then(() => {
  console.log(results);
  console.log('Queue size:', queue.size());
  console.log('Is processing:', queue.isProcessing());
});