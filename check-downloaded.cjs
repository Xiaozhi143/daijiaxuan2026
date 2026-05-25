const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh-github.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 检查从 GitHub 下载的文件 ===\n');

// 检查是否包含乱码字符
const garbledChars = ['鍏', '鍥', '鎬', '娴', '紶', '瀹', '鍥'];
let hasGarbled = false;

garbledChars.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`✗ 发现乱码字符 "${char}": ${count} 次`);
    hasGarbled = true;
  }
});

if (!hasGarbled) {
  console.log('✓ 没有发现乱码字符');
}

// 检查正常的中文
const normalChars = ['图片', '入口', '总海报', '宣传海报'];
normalChars.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`✓ 发现正常中文 "${char}": ${count} 次`);
  }
});
