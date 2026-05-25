const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复双重前缀和乱码问题 ===\n');

let fixed = 0;

// 1. 修复双重前缀
const doublePrefix = '/daijiaxuan2026/daijiaxuan2026/';
const count1 = (content.match(new RegExp(doublePrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

if (count1 > 0) {
  content = content.replace(new RegExp(doublePrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '/daijiaxuan2026/');
  console.log(`✓ 修复 ${count1} 个双重前缀: /daijiaxuan2026/daijiaxuan2026/ -> /daijiaxuan2026/`);
  fixed += count1;
}

// 2. 修复乱码的入口.png
const garbledPath = '/daijiaxuan2026/mori/鍏酰浼犲';
const correctPath = '/daijiaxuan2026/mori/入口 ';
const count2 = (content.match(new RegExp(garbledPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

if (count2 > 0) {
  content = content.replace(new RegExp(garbledPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correctPath);
  console.log(`✓ 修复 ${count2} 个乱码路径: 鍏酰浼犲 -> 入口`);
  fixed += count2;
}

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixed} 个问题 ===`);
} else {
  console.log('没有找到需要修复的问题');
}
