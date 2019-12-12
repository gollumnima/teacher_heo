const fs = require('fs');
const path = require('path');

// 옛날방식의 비동기를 promise형으로 바꾼 것
const readJSON = (name) => new Promise((resolve, reject) => {
  // dirname은 절대경로 찍는 명령어
  fs.readFile(path.join(__dirname, `../data/${name}.json`), (err, data) => {
    if (err) return reject(err);
    try {
      const result = JSON.parse(data);
      resolve(result);
    } catch (e) {
      reject(e);
    }
    resolve();
  });
});

const writeJSON = (name, data) => new Promise((resolve, reject) => {
  try {
    const json = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, `../data/${name}.json`), json, (err) => {
      // 파일저장이 잘 됐는지 안됐는지 확인하는거니까 에러밖에 안 넣어줘도 됨
      if (err) return reject(err);
      resolve(true); // 생략가능
    });
  } catch (e) {
    reject(e);
  }
  // 첫번째가 경로, 두번째가 데이터, 세번째가 콜백
});

module.exports = {
  readJSON, writeJSON // 똑같은 이름으로 내보내서 키랑 밸류 생략쓰
};