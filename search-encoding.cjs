const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const buffer = fs.readFileSync(filePath);

console.log('=== 搜索字节序列 ===\n');

// 搜索 "鍥剧墖12" 的字节
const search1 = Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87, 0x31, 0x32]); // 鍥剧墖12
let idx1 = buffer.indexOf(search1);
if (idx1 !== -1) {
  console.log(`找到 "鍥剧墖12" 在位置 ${idx1}`);
  const snippet = buffer.slice(idx1, idx1 + 50).toString('utf8');
  console.log(`上下文: ${snippet}\n`);
}

// 搜索 "鍏ュ彛" 的字节
const search2 = Buffer.from([0xe5, 0x85, 0xa5, 0xe5, 0x8f, 0xa3]); // 鍏ュ彛
let idx2 = buffer.indexOf(search2);
if (idx2 !== -1) {
  console.log(`找到 "鍏ュ彛" 在位置 ${idx2}`);
  const snippet = buffer.slice(idx2, idx2 + 50).toString('utf8');
  console.log(`上下文: ${snippet}\n`);
}

// 搜索 "鎬绘捣鎶" 的字节
const search3 = Buffer.from([0xe6, 0x80, 0xbb, 0xe6, 0xb5, 0xb7, 0xe6, 0x8a, 0xa5]); // 鎬绘捣鎶
let idx3 = buffer.indexOf(search3);
if (idx3 !== -1) {
  console.log(`找到 "鎬绘捣鎶" 在位置 ${idx3}`);
  const snippet = buffer.slice(idx3, idx3 + 50).toString('utf8');
  console.log(`上下文: ${snippet}\n`);
}

// 搜索 "宣传海报" 的字节
const search4 = Buffer.from([0xe5, 0xae, 0xa3, 0xe4, 0xbc, 0xa0, 0xe6, 0xb5, 0xb7, 0xe6, 0x8a, 0xa5]); // 宣传海报
let idx4 = buffer.indexOf(search4);
if (idx4 !== -1) {
  console.log(`找到 "宣传海报" 在位置 ${idx4}`);
  const snippet = buffer.slice(idx4, idx4 + 100).toString('utf8');
  console.log(`上下文: ${snippet}\n`);
}
