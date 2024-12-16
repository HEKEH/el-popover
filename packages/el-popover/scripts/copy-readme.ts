import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.join(__dirname, '../../../');
const readmeFiles = ['./README.md', './README.zh-cn.md'];
const projectName = 'HEKEH/el-popover';

readmeFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const targetPath = path.join(__dirname, '..', file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /\.?\((README(?:\.[\w-]+)?\.md)\)/g,
    `(https://www.github.com/${projectName}/blob/master/$1)`,
  );
  fs.writeFileSync(targetPath, content);
});
