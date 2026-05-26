const fs = require('fs');

const content = fs.readFileSync('c:/git/daijiaxuan2026/assets/index-DdDxdCM7.js', 'utf8');

console.log('=== 全面检查 GitHub 仓库文件 ===\n');

// 1. 检查乱码字符
console.log('1. 检查乱码字符:');
const garbledChars = ['鍥', '鎬', '娴', '鍏', '紶', '瀹'];
let hasGarbled = false;
garbledChars.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`  ✗ ${char}: ${count} 次`);
    hasGarbled = true;
  }
});
if (!hasGarbled) {
  console.log('  ✓ 没有乱码字符');
}

// 2. 检查路径前缀
console.log('\n2. 检查路径前缀:');
const folders = ['car', 'kid', 'mf', 'eater', 'mori', 'xiang'];
let allCorrect = true;

folders.forEach(folder => {
  const withPrefix = (content.match(new RegExp(`"/daijiaxuan2026/${folder}/`, 'g')) || []).length;
  const withoutPrefix = (content.match(new RegExp(`"/${folder}/`, 'g')) || []).length;
  
  if (withoutPrefix > 0) {
    console.log(`  ✗ ${folder}/: ${withoutPrefix} 个缺少前缀`);
    allCorrect = false;
  } else if (withPrefix > 0) {
    console.log(`  ✓ ${folder}/: ${withPrefix} 个路径全部正确`);
  }
});

// 3. 检查 photo
const photoWith = (content.match(/"\/daijiaxuan2026\/photo\./g) || []).length;
const photoWithout = (content.match(/"\/photo\./g) || []).length;
console.log(`\n3. photo.png:`);
console.log(`  有前缀: ${photoWith} 个`);
console.log(`  无前缀: ${photoWithout} 个 ${photoWithout > 0 ? '✗' : '✓'}`);

// 4. 检查文件大小
console.log('\n4. 检查文件:');
const files = fs.readdirSync('c:/git/daijiaxuan2026/assets');
files.forEach(f => {
  const size = fs.statSync(`c:/git/daijiaxuan2026/assets/${f}`);
  const sizeMB = (size.size / 1024 / 1024).toFixed(2);
  console.log(`  ${f}: ${sizeMB} MB`);
});

// 5. 检查是否有查看完整内容
console.log('\n5. 检查"查看完整内容":');
const hasExpand = content.includes('查看完整内容');
console.log(`  ${hasExpand ? '✗ 存在' : '✓ 已删除'}`);

// 总结
console.log('\n=== 检查结果总结 ===');
if (!hasGarbled && allCorrect && photoWithout === 0 && !hasExpand) {
  console.log('✓ 所有检查通过！可以上传！');
} else {
  console.log('✗ 发现问题，需要修复');
}
