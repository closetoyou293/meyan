# meyan
API Server Performance

### Cấu trúc thư mục

server
  |-app
  |-models
  |-routes
  |-sockets
start.js

### Cài đặt và chạy

```sh
$ cd meyan
$ npm install
$ npm run start
```

Dành cho các bạn sử dụng Nodemon hoặc Pm2

```sh
$ npm run nodemon
//or
$ npm run pm2
```

### Tùy chỉnh Express
> Chỉnh sửa tại: server/app/express.js

### Tùy chỉnh Config
> Chỉnh sửa tại: server/app/config.js

### Thư mục Models (MongoDB)

Ví dụ tạo 1 file 'test.js' mặc định như sau:
```sh
  const   mongoose = require("mongoose");
  const   Schema = mongoose.Schema;

  module.exports = new Schema({
      ...
  });
```
Và chúng ta có giao thức để gọi với mongoose ví dụ:
```sh
  db.test.find({}).then(data => ...)
```
Bạn có thể tạo nhiều model. Mỗi file js bạn tạo sẽ tương ứng với 1 model trong mongodb
Khi tôi đặt tên file là test.js => tôi sẽ phải gọi kết nối db.test
Tương tự tên file là user.js => db.user

### Thư mục Routes

Ví dụ tạo 1 file 'index.js' mặc định như sau:
```sh
  module.exports = (app) => {
      app.get('/', (req, res) => {
          res.send('Index Route')
      });
  };
```
Và chúng ta truy cập: http://localhost:3000/ sẽ cho ra kết quả 'Index Route'
Khi bạn đặt tên file là index.js thì mọi giao thức đều qua http://localhost:3000/
Còn khi bạn đặt tên file là user.js thì mọi giao thức đều qua http://localhost:3000/user
Giao thức API tại đâu tùy thuốc vào tên file của bạn.

Ví dụ: Tạo 1 file 'user.js'
```sh
  module.exports = (app) => {
      app.get('/', (req, res) => {
          res.send('User Route')
      });
  };
```
Và chúng ta truy cập: http://localhost:3000/user sẽ cho ra kết quả 'User Route'

Bạn có thể tạo nhiều model. Mỗi file js bạn tạo sẽ tương ứng với 1 model trong mongodb

### Thư mục Sockets (socket.io)

Ví dụ tạo 1 file 'index.js' mặc định như sau:
```sh
  module.exports = (io, socket) => {
      io.of('/').on('connect')
      io.of('/').emit(...)
      socket.on(...);
      socket.emit(...);
  }
```
Và bên phía client
```sh
  var socket = io('/')
```

Với tên file mặc định là index.js thì mọi kết nối socket sẽ qua cổng '/' bắt buộc phía client phải là:
```sh
  var socket = io('/')
```
Ví dụ với tên file là user.js thì cổng socket sẽ là:
```sh
var socket = io('/user')
```
